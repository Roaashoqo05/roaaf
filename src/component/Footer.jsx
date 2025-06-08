import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>العنوان : فلسطين-نابلس</p>
        <p>📞 للتواصل: 0595860319 | ✉️ skookaboode@gmail.com</p>
        <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()} متجر قطع السيارات</p>
        <div className="footer-links">
          <a href="/">الرئيسية</a>
          <a href="/cart">السلة</a>
          <a href="/signup">تسجيل</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
