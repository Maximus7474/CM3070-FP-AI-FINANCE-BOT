import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  async function send() {
    const res = await fetch("http://127.0.0.1:8721/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setReply(data.reply);
  }

  return (
    <div style={{ padding: 20 }}>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={send}>Ask</button>
      <p>{reply}</p>
    </div>
  );
}

export default App;