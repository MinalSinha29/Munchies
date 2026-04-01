// src/pages/Auth.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin && !form.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!isLogin && !form.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

    try {
      const { data } = await axios.post(endpoint, form);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Update header instantly
      window.dispatchEvent(new Event("userLogin"));

      alert(isLogin ? "✅ Logged in successfully!" : "✅ Account created!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460, #533483)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          padding: "40px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          width: "360px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h2 style={{ color: "#ffb703" }}>
          {isLogin ? "Welcome Back 👋" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <InputField
                placeholder="Full Name"
                value={form.name}
                error={errors.name}
                onChange={(v) => setForm({ ...form, name: v })}
              />

              <InputField
                placeholder="Address"
                value={form.address}
                error={errors.address}
                onChange={(v) => setForm({ ...form, address: v })}
              />
            </>
          )}

          <InputField
            placeholder="Email"
            type="email"
            value={form.email}
            error={errors.email}
            onChange={(v) => setForm({ ...form, email: v })}
          />

          <InputField
            placeholder="Password"
            type="password"
            value={form.password}
            error={errors.password}
            onChange={(v) => setForm({ ...form, password: v })}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              background: "linear-gradient(90deg, #ffb703, #ff8500)",
              border: "none",
              padding: "12px",
              color: "#000",
              borderRadius: "10px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p style={{ marginTop: "15px" }}>
          {isLogin ? "Don't have an account?" : "Already registered?"}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setForm({ name: "", email: "", password: "", address: "" });
              setErrors({});
            }}
            style={{ color: "#ffb703", marginLeft: "6px", cursor: "pointer" }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

function InputField({ placeholder, value, onChange, type = "text", error }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: "8px",
          border: "1px solid rgba(255,255,255,0.3)",
          background: "rgba(255,255,255,0.15)",
          color: "#fff",
          outline: "none",
        }}
      />
      {error && <p style={{ color: "#ff6b6b", fontSize: "12px" }}>{error}</p>}
    </div>
  );
}
