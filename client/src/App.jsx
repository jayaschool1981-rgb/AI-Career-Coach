import { useState } from "react";
import { generateInterview } from "./api";

function App() {
  const [result, setResult] = useState("");
  const token = localStorage.getItem("token");

  const handleGenerate = async () => {
    try {
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
      alert("Error generating interview");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AI Career Coach 🚀</h1>

      <button style={styles.button} onClick={handleGenerate}>
        Generate Interview
      </button>

      {result && (
        <div style={styles.resultBox}>
          <pre style={styles.resultText}>{result}</pre>
        </div>
      )}
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
  title: {
    fontSize: "3rem",
    marginBottom: "20px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#6366f1",
    color: "white",
    transition: "0.3s",
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
  resultText: {
    whiteSpace: "pre-wrap",
    fontSize: "14px",
  },
};

export default App;