import { useState } from "react";
import { loginUser } from "../api";

function Login({ onLogin, switchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });

      localStorage.setItem("token", res.data.token);
      onLogin();
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2>Login 🔐</h2>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button style={styles.button} type="submit">
            Login
          </button>
        </form>

        {/* 👇 THIS IS THE IMPORTANT PART */}
        <p style={{ marginTop: "20px" }}>
          Don’t have an account?{" "}
          <span
            style={styles.link}
            onClick={switchToRegister}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
  },
  card: {
    background: "#111827",
    padding: "40px",
    borderRadius: "16px",
    width: "350px",
    color: "white",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #374151",
    background: "#1f2937",
    color: "white",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#6366f1",
    color: "white",
    cursor: "pointer",
  },
  link: {
    color: "#6366f1",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Login;