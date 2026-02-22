import { useState } from "react";
import { registerUser } from "../api";

function Register({ switchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await registerUser({ name, email, password });

      setSuccess("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        switchToLogin();
      }, 1500);

    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account 🚀</h2>

        <form onSubmit={handleRegister} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
            }}
            disabled={loading}
          >
            {loading ? "Creating..." : "Register"}
          </button>

          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}
        </form>

        <p style={{ marginTop: "20px" }}>
          Already have an account?{" "}
          <span style={styles.link} onClick={switchToLogin}>
            Login
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
    boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
  },
  title: {
    marginBottom: "25px",
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
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    color: "#f87171",
    fontSize: "14px",
    marginTop: "5px",
  },
  success: {
    color: "#34d399",
    fontSize: "14px",
    marginTop: "5px",
  },
  link: {
    color: "#6366f1",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Register;