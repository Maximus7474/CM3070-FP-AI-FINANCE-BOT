import { Routes, Route, Link, useLocation } from "react-router-dom";
import Chat from "./pages/chat";
import Evaluation from "./pages/eval";
import Settings from "./pages/settings";

function App() {
  const location = useLocation();

  const getNavStyle = (path: string) => ({
    padding: "10px 15px",
    textDecoration: "none",
    color: location.pathname === path ? "#0070f3" : "#666",
    fontWeight: location.pathname === path ? "bold" : "normal",
    borderBottom: location.pathname === path ? "2px solid #0070f3" : "none",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", maxWidth: "800px", margin: "0 auto", boxSizing: "border-box" }}>
      {/* Navigation Bar */}
      <nav style={{ display: "flex", gap: 15, padding: "15px 20px", borderBottom: "1px solid #ddd" }}>
        <Link to="/" style={getNavStyle("/")}>Chat</Link>
        <Link to="/evaluation" style={getNavStyle("/evaluation")}>Evaluation</Link>
        <Link to="/settings" style={getNavStyle("/settings")}>Settings</Link>
      </nav>

      {/* Page Content */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/evaluation" element={<Evaluation />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
