import React from "react";
import "./Login.css";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // هنا ممكن تضيف تحقق بيانات الدخول
    navigate('/'); // يرجع المستخدم للصفحة الرئيسية بعد تسجيل الدخول
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Logo */}
        <div className="logo">
          <img src="/images/sclogo.png" className="logo-image" alt="Logo" />
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleLogin}>
          {/* Username */}
          <div className="input-group">
            <span className="icon">👤</span>
            <input type="text" placeholder="اسم المستخدم" required />
          </div>

          {/* Phone */}
          <div className="input-group">
            <span className="icon">📱</span>
            <input type="number" placeholder="رقم الهاتف" required />
          </div>

          {/* Password */}
          <div className="input-group">
            <span className="icon">🔒</span>
            <input type="password" placeholder="كلمة السر" required />
          </div>

          {/* Button */}
          <button type="submit" className="login-button">
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;