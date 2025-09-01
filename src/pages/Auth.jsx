// src/pages/Auth.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const resetFields = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // basic placeholder behavior — replace with real auth later
    if (isLogin) {
      console.log("Login:", { email, password });
    } else {
      console.log("Sign up:", { name, email, password });
    }
    resetFields();
    // navigate to home (or show success message)
    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-top">
          <div className="auth-brand">
            <span className="logo-dot">M</span>
            <span className="logo-dot alt">M</span>
            <span className="brand-name">Munchies</span>
          </div>
          <h2 className="auth-title">{isLogin ? "Welcome back" : "Create your account"}</h2>
          <p className="auth-sub">
            {isLogin
              ? "Sign in to order your favourite food"
              : "Create an account to get started"}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              className="auth-input"
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={!isLogin}
            />
          )}

          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-btn">
            {isLogin ? "Login" : "Sign up"}
          </button>
        </form>

        <div className="auth-help">
          <span>{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
          <button
            type="button"
            className="auth-toggle"
            onClick={() => {
              setIsLogin(!isLogin);
              resetFields();
            }}
          >
            {isLogin ? "Create account" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
