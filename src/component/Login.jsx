import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("api_token", data.token);
        setMessage("تم تسجيل الدخول بنجاح");
        navigate("/parts");  // التنقل لصفحة قائمة قطع الغيار
      } else {
        setMessage(data.error || "بيانات الدخول غير صحيحة");
      }
    } catch {
      setMessage("حدث خطأ أثناء الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src="/images/sclogo.png" alt="Logo" className="logo-image" />
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <span className="icon"><FaUser /></span>
            <input
              type="text"
              placeholder="الاسم"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <span className="icon"><MdEmail /></span>
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <span className="icon"><FaLock /></span>
            <input
              type="password"
              placeholder="كلمة السر"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>

          {message && (
            <p style={{ color: "red", marginTop: "1rem", textAlign: "center" }}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
