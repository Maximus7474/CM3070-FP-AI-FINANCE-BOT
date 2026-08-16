from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import traceback

from llm.main import generate_explanation, initialize_ollama, handle_chat_interaction, review_quiz_answers
from rl_pipeline.main import train_model, load_trained_model, generate_recommendations
from quiz.main import generate_quiz, strip_correct_answers
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

class ChatResponse(BaseModel):
    reply: str

class TrainRequest(BaseModel):
    tickers: Optional[List[str]] = None
    train_start: Optional[str] = None
    train_end: Optional[str] = None
    model_name: str = None

class TrainResponse(BaseModel):
    status: str
    message: str
    model_name: str
    valid_tickers: List[str]

class EvaluateRequest(BaseModel):
    model_name: str = "ppo_trading_model"
    tickers: Optional[list[str]] = None
    eval_start: Optional[str] = None
    eval_end: Optional[str] = None
    budget: Optional[float] = None
    output_filename: str = "recommendations.json"

class EvaluateResponse(BaseModel):
    status: str
    json_path: str
    data: dict

class QuizAnswer(BaseModel):
    question_id: str
    answer: str = ""

class QuizReviewRequest(BaseModel):
    answers: list[QuizAnswer]

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

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    reply = handle_chat_interaction(req.message)
    return ChatResponse(reply=reply)

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

@app.get("/quiz/generate")
def api_generate_quiz():
    """Builds a data-grounded quiz from the latest recommendations.json."""
    try:
        questions = generate_quiz()
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))

    return {"status": "success", "questions": strip_correct_answers(questions)}


@app.post("/quiz/review")
def api_review_quiz(req: QuizReviewRequest):
    """Reviews the user's quiz answers against the RL agent's output via the LLM."""
    try:
        questions = generate_quiz()
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))

    try:
        review = review_quiz_answers(questions, [a.model_dump() for a in req.answers])
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Quiz review failed: {str(e)}")

    return {"status": "success", "review": review}


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
