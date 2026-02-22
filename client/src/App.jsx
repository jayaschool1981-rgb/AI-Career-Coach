import { useState, useEffect, useRef } from "react";
import { generateInterview } from "./api";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [role, setRole] = useState("Data Analyst");
  const [level, setLevel] = useState("beginner");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [authMode, setAuthMode] = useState("login");

  const resultRef = useRef(null);

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result]);

  const getSkills = () => {
    switch (role) {
      case "Data Analyst":
        return ["SQL", "Power BI"];
      case "Software Engineer":
        return ["DSA", "OOP"];
      case "Product Manager":
        return ["Strategy", "Leadership"];
      default:
        return [];
    }
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await generateInterview(
        {
          role,
          skills: getSkills(),
          level,
        },
        token
      );

      setResult(res.data.result);
    } catch (err) {
      alert("Session expired. Please login again.");
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setResult("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert("Copied to clipboard!");
  };

  // AUTH FLOW
  if (!isLoggedIn) {
    return authMode === "login" ? (
      <Login
        onLogin={() => setIsLoggedIn(true)}
        switchToRegister={() => setAuthMode("register")}
      />
    ) : (
      <Register switchToLogin={() => setAuthMode("login")} />
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>AI Career Coach 🚀</h1>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Controls */}
        <div style={styles.controls}>
          <select
            style={styles.select}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>Data Analyst</option>
            <option>Software Engineer</option>
            <option>Product Manager</option>
          </select>

          <select
            style={styles.select}
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <button
            style={{
              ...styles.generateBtn,
              opacity: loading ? 0.7 : 1,
            }}
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Interview"}
          </button>
        </div>

        {/* Result */}
        {result && (
          <div ref={resultRef} style={styles.resultCard}>
            <div style={styles.resultHeader}>
              <h3>Generated Questions</h3>
              <button style={styles.copyBtn} onClick={copyToClipboard}>
                Copy
              </button>
            </div>

            <pre style={styles.resultText}>{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    padding: "40px",
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    color: "white",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
  },
  title: {
    fontSize: "2.8rem",
    fontWeight: "bold",
  },
  logoutBtn: {
    background: "transparent",
    color: "#94a3b8",
    border: "none",
    cursor: "pointer",
  },
  controls: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    marginBottom: "30px",
  },
  select: {
    padding: "10px 15px",
    borderRadius: "8px",
    border: "none",
    fontSize: "14px",
  },
  generateBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "#6366f1",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  resultCard: {
    background: "#111827",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
  },
  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  copyBtn: {
    background: "#1f2937",
    border: "none",
    color: "white",
    padding: "5px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  resultText: {
    whiteSpace: "pre-wrap",
    fontSize: "14px",
    lineHeight: "1.6",
  },
};

export default App;