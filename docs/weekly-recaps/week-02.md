## AI Architecture
**Reinforcement Learning (Primary)**
* **Why**: Models portfolio management as a Markov Decision Process under market uncertainty
    State: [price, volume, RSI, portfolio weights]
    Actions: Rebalance to target weights across N assets
    Reward: Sharpe ratio (return/volatility) - transaction costs
* Deep Q-Network + LSTM captures temporal market patterns

**Local LLM (Llama 3.1)**
* Converts RL recommendations to natural language via prompt engineering:
    `"Given portfolio state {state}, RL recommends {action}. Explanation: {rationale}. Confidence: {q_value}"`
* Web interface via Streamlit/Gradio for non-technical users
* Retrieval Augmented Generation (RAG) to obtain better data for analysis feedback

## Research
* **Liability**
  * Clear disclaimers need to be made, this is a tool working on statistical analysis and can make mistakes
    relating to SEC/FINRA regulations
  * Focus on non-binding suggestions

## User Analysis
* **Survey**
  * Determine user requirements
  * Obtain feedback on feature suggestions