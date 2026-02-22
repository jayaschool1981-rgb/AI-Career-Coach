import { useState } from "react";
import { generateInterview } from "./api";
import Login from "./pages/Login";

function App() {
  const [result, setResult] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const handleGenerate = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await generateInterview(
        {
          role: "Data Analyst",
          skills: ["SQL", "Power BI"],
          level: "beginner",
        },
        token
      );

      setResult(res.data.result);
    } catch (err) {
      alert("Unauthorized. Please login again.");
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div style={styles.container}>
      <h1>AI Career Coach 🚀</h1>
      <button style={styles.button} onClick={handleGenerate}>
        Generate Interview
      </button>

      {result && (
        <div style={styles.resultBox}>
          <pre>{result}</pre>
        </div>
      )}

      <button
        style={{ marginTop: "20px" }}
        onClick={() => {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }}
      >
        Logout
      </button>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #1e293b, #0f172a)",
    color: "white",
    padding: "20px",
    textAlign: "center",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#6366f1",
    color: "white",
  },
  resultBox: {
    marginTop: "30px",
    width: "80%",
    maxWidth: "800px",
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "left",
  },
};

export default App;