import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// COMMON STYLES
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",   // 🔥 change here
  paddingTop: "100px",        // 🔥 add this
  minHeight: "100vh",
  background: "linear-gradient(to right, #d8cecc, #fbfafa)"
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  width: "320px"
};

const inputStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px"
};

const buttonStyle = {
  padding: "12px",
  background: "#e53935",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold"
};

const errorStyle = {
  color: "red",
  fontSize: "14px",
  textAlign: "center"
};

const linkStyle = {
  textAlign: "center",
  marginTop: "10px",
  fontSize: "14px"
};


// ================= LOGIN =================
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

    const success = await login(email, password);

    if (success) {
      navigate("/");
    } else {
      setError("Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div style={containerStyle}>

      <form style={formStyle} onSubmit={handleSubmit}>

        <h2 style={{ textAlign: "center" }}>Login</h2>

        {error && <p style={errorStyle}>{error}</p>}

        <input
          style={inputStyle}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={buttonStyle} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={linkStyle}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>

      </form>

    </div>
  );
};


// ================= REGISTER =================
const Register = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Fill all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const success = await register(
      form.name,
      form.email,
      form.password
    );

    if (success) {
      alert("Registered successfully");
      navigate("/login");
    } else {
      setError("Registration failed");
    }

    setLoading(false);
  };

  return (
    <div style={containerStyle}>

      <form style={formStyle} onSubmit={handleSubmit}>

        <h2 style={{ textAlign: "center" }}>Register</h2>

        {error && <p style={errorStyle}>{error}</p>}

        <input
          style={inputStyle}
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          style={inputStyle}
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          style={inputStyle}
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <input
          style={inputStyle}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <button style={buttonStyle} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p style={linkStyle}>
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </form>

    </div>
  );
};

export { Login, Register };