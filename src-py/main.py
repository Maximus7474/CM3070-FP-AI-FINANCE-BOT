from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import traceback

from llm.main import generate_explanation, initialize_ollama
from rl_pipeline.main import train_model, load_trained_model, generate_recommendations
from config import TICKERS

print('Loaded librairies, tickers:', TICKERS)

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

class ChatResponse(BaseModel):
    reply: str

class TrainRequest(BaseModel):
    tickers: Optional[List[str]] = None
    train_start: Optional[str] = None
    train_end: Optional[str] = None
    model_name: str = "ppo_trading_model"

class TrainResponse(BaseModel):
    status: str
    message: str
    model_name: str
    valid_tickers: List[str]

class EvaluateRequest(BaseModel):
    model_name: str = "ppo_trading_model"
    tickers: Optional[List[str]] = None
    eval_start: Optional[str] = None
    eval_end: Optional[str] = None
    budget: Optional[float] = None
    output_filename: str = "recommendations.json"

class EvaluateResponse(BaseModel):
    status: str
    json_path: str

def generate_reply(message: str) -> str:
    print(f"Received message: {message} - generating recommendation text")
    explanation_list = generate_explanation("recommendations.json")

    if len(explanation_list) == 0:
        return "Failed to generate explanation list"

    for e in explanation_list:
        print(f"{e['ticker']}: {e['action']} ({e['justification']})")

    formatted_reply = "\n\n".join(
        f"**{e['ticker']}** ({e['action']}): {e['justification']}"
        for e in explanation_list
    )

    return formatted_reply

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    print('Received chat request', req.message)
    reply = generate_reply(req.message)
    return ChatResponse(reply=reply)

@app.post("/train", response_model=TrainResponse)
def api_train_model(req: TrainRequest):
    """Triggers the training pipeline."""
    print('Received train request', req.model_dump())
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
    print('Received evaluate request', req.model_name)
    try:
        model = load_trained_model(req.model_name)
        if model is None:
            raise HTTPException(status_code=404, detail=f"Model '{req.model_name}' not found.")

        kwargs = {k: v for k, v in req.model_dump().items() if v is not None}

        valid_tickers = kwargs.pop("tickers", TICKERS)

        kwargs.pop("model_name", None)

        json_path = generate_recommendations(
            model=model,
            valid_tickers=valid_tickers,
            **kwargs
        )

        return EvaluateResponse(
            status="success",
            json_path=str(json_path)
        )
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Evaluation failed: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    initialize_ollama()
    uvicorn.run(app, host="127.0.0.1", port=8721)
