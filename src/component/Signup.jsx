import React from "react";
import "./Login.css"; // إعادة استخدام نفس ملف CSS لتوحيد التصميم
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // هنا ممكن تضيف منطق التسجيل
    navigate('/'); // يرجع المستخدم للصفحة الرئيسية بعد التسجيل
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Logo */}
        <div className="logo">
          <img src="/images/sclogo.png" className="logo-image" alt="Logo" />
        </div>

        {/* Signup Form */}
        <form className="login-form" onSubmit={handleSignup}>
          {/* Full Name */}
          <div className="input-group">
            <span className="icon">👤</span>
            <input type="text" placeholder="الاسم الكامل" required />
          </div>

          {/* Email */}
          <div className="input-group">
            <span className="icon">📧</span>
            <input type="email" placeholder="البريد الإلكتروني" required />
          </div>

          {/* Phone */}
          <div className="input-group">
            <span className="icon">📱</span>
            <input type="number" placeholder="رقم الهاتف" required />
          </div>

          {/* Password */}
          <div className="input-group">
            <span className="icon">🔒</span>
            <input type="password" placeholder="كلمة المرور" required />
          </div>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <span>هل لديك حساب؟ </span>
            <span
              style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => navigate('/login')}
            >
              تسجيل الدخول
            </span>
          </div>

          {/* Button */}
          <button type="submit" className="login-button">
            إنشاء حساب
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;