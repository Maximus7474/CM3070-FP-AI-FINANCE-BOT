from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import traceback

import requests

from llm.main import (
    generate_explanation,
    get_active,
    handle_chat_interaction,
    initialize_ollama,
    list_models,
    set_active,
)
from llm.learn import generate_flashcards, generate_guide
from llm.providers import get_provider, list_providers
from rl_pipeline.main import train_model, load_trained_model, generate_recommendations
from config import TICKERS

app = FastAPI()

print('FastAPI app created')

# Decent config for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "tauri://localhost",        # macOS/Linux production
        "http://tauri.localhost",   # Windows production (WebView2)
        "https://tauri.localhost",  # some WebView2 configs use https
        "http://localhost:1420",    # dev server
    ],
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    # Optional per-request overrides (fall back to the active provider/model).
    provider: str | None = None
    model: str | None = None

class ChatResponse(BaseModel):
    reply: str

class SetModelRequest(BaseModel):
    provider: str = "ollama"
    model: str

class TrainRequest(BaseModel):
    tickers: list[str] | None = None
    train_start: str | None = None
    train_end: str | None = None
    model_name: str | None = None

class TrainResponse(BaseModel):
    status: str
    message: str
    model_name: str
    valid_tickers: list[str]

class LearnGuideRequest(BaseModel):
    topic: str
    # Optional per-request overrides (fall back to the active provider/model).
    provider: str | None = None
    model: str | None = None

class LearnFlashcardsRequest(BaseModel):
    topic: str
    count: int = 10
    provider: str | None = None
    model: str | None = None

class EvaluateRequest(BaseModel):
    model_name: str = "ppo_trading_model"
    tickers: list[str] | None = None
    eval_start: str | None = None
    eval_end: str | None = None
    budget: float | None = None
    output_filename: str = "recommendations.json"

class EvaluateResponse(BaseModel):
    status: str
    json_path: str
    data: dict

# ToDo: integrate into a new page for handlign recommendations
def generate_recommendation() -> str:
    data = generate_explanation("recommendations.json")

    if len(data.allocations) == 0:
        return "Failed to generate explanation list"

    # for e in data.allocations:
    #     print(f"{e.ticker}: {e.action} ({e.justification})")

    formatted_reply = "\n\n".join(
        f"**{e.ticker}** ({e.action}): {e.justification}"
        for e in data.allocations
    )

    return formatted_reply

@app.get("/health")
def health():
    return {"status": "ok"}

# model management

@app.get("/llm/providers")
def get_llm_providers():
    """Providers the app knows about, plus which one is active."""
    return {"active": get_active(), "providers": list_providers()}

@app.get("/llm/models")
def get_llm_models(provider: str = "ollama"):
    """Models downloaded/available for a given provider."""
    try:
        models = list_models(provider)
    except ValueError as e:  # stub provider / not wired up
        raise HTTPException(status_code=400, detail=str(e))
    except NotImplementedError as e:  # defensive: stubs
        raise HTTPException(status_code=400, detail=str(e))
    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=503,
            detail=f"Cannot reach the '{provider}' backend: {e}",
        )

    active = get_active()
    ollama_running = get_provider("ollama").is_available()
    return {
        "provider": provider,
        "current_model": active["model"] if active["provider"] == provider else None,
        "ollama_running": ollama_running,
        "models": models,
    }

@app.post("/llm/model")
def set_llm_model(req: SetModelRequest):
    """Switch the active LLM provider/model at runtime."""
    try:
        active = set_active(req.provider, req.model)
    except KeyError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except ValueError as e:  # provider not wired up yet
        raise HTTPException(status_code=400, detail=str(e))
    except LookupError as e:  # model not downloaded
        raise HTTPException(status_code=404, detail=str(e))
    except (requests.exceptions.ConnectionError, RuntimeError) as e:
        raise HTTPException(status_code=503, detail=f"LLM backend unreachable: {e}")
    return {"status": "success", "active": active}

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    try:
        reply = handle_chat_interaction(
            req.message, model=req.model, provider_id=req.provider
        )
    except ValueError as e:  # provider/model not usable
        raise HTTPException(status_code=400, detail=str(e))
    except (requests.exceptions.ConnectionError, RuntimeError) as e:
        raise HTTPException(status_code=503, detail=f"LLM backend unreachable: {e}")
    return ChatResponse(reply=reply)

# guides (RAG-grounded) + flashcards

@app.post("/learn/guide")
def learn_guide(req: LearnGuideRequest):
    """Generate a step-by-step guide for a topic, grounded in Wikipedia."""
    try:
        guide = generate_guide(
            req.topic, model=req.model, provider_id=req.provider
        )
    except ValueError as e:  # bad input / unparseable LLM output
        raise HTTPException(status_code=400, detail=str(e))
    except (requests.exceptions.RequestException, RuntimeError) as e:
        raise HTTPException(status_code=503, detail=f"LLM backend unreachable: {e}")
    return guide

@app.post("/learn/flashcards")
def learn_flashcards(req: LearnFlashcardsRequest):
    """Generate question/answer flashcards for a topic."""
    try:
        cards = generate_flashcards(
            req.topic, count=req.count, model=req.model, provider_id=req.provider
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except (requests.exceptions.RequestException, RuntimeError) as e:
        raise HTTPException(status_code=503, detail=f"LLM backend unreachable: {e}")
    return {"topic": req.topic, "cards": cards}

@app.post("/train", response_model=TrainResponse)
def api_train_model(req: TrainRequest):
    """Triggers the training pipeline."""
    try:
        kwargs = {k: v for k, v in req.model_dump().items() if v is not None}

        _, valid_tickers = train_model(**kwargs)

        return TrainResponse(
            status="success",
            message="Model successfully trained and saved.",
            model_name=req.model_name,
            valid_tickers=valid_tickers
        )
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Training failed: {str(e)}")

@app.post("/evaluate", response_model=EvaluateResponse)
def api_evaluate_model(req: EvaluateRequest):
    """Loads a trained model, evaluates it, and generates recommendations.json."""

    if not req.model_name:
        raise HTTPException(status_code=500, detail="No RL agent model was provided")

    try:
        model = load_trained_model(req.model_name)
        if model is None:
            raise HTTPException(status_code=404, detail=f"Model '{req.model_name}' not found.")

        kwargs = {k: v for k, v in req.model_dump().items() if v is not None}

        valid_tickers = kwargs.pop("tickers", TICKERS)

        kwargs.pop("model_name", None)

        json_path, data = generate_recommendations(
            model=model,
            valid_tickers=valid_tickers,
            **kwargs
        )

        return EvaluateResponse(
            status="success",
            json_path=str(json_path),
            data=data,
        )
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Evaluation failed: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    initialize_ollama()
    uvicorn.run(app, host="127.0.0.1", port=8721)
