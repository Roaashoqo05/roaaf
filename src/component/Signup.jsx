import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  // المتغيرات لحفظ إدخالات المستخدم
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name: fullName,
        email,
        password
        // ملاحظة: الـ phone غير مطلوب حسب Laravel حاليًا، فممكن نضيفه لاحقًا
      });

      // استلام التوكن من Laravel
      const token = response.data.token;

      // حفظ التوكن في localStorage
      localStorage.setItem('token', token);

      // بعد التسجيل بنجاح، توجّهي للموقع الرئيسي
      navigate('/car-parts');
    } catch (error) {
      console.error("خطأ أثناء التسجيل:", error);
      alert("حدث خطأ أثناء إنشاء الحساب. تأكد من البيانات.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src="/images/sclogo.png" className="logo-image" alt="Logo" />
        </div>

        <form className="login-form" onSubmit={handleSignup}>
          <div className="input-group">
            <span className="icon">👤</span>
            <input
              type="text"
              placeholder="الاسم الكامل"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <span className="icon">📧</span>
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <span className="icon">📱</span>
            <input
              type="number"
              placeholder="رقم الهاتف (اختياري)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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

          <button type="submit" className="login-button">
            إنشاء حساب
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;