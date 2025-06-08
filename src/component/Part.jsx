
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Part.css';


const Part = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, totalPrice, customerName } = location.state || {
    cartItems: [],
    totalPrice: 0,
    customerName: '',
  };

  if (!location.state || !cartItems.length) {
    return (
      <div className="invoice-container">
        <h2>لا توجد بيانات لعرض الفاتورة.</h2>
        <button className="back-btn" onClick={() => navigate('/')}>
          العودة للصفحة الرئيسية
        </button>
      </div>
    );
  }

  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <img src="/images/sclogo.png" alt="شعار الشركة" className="company-logo" />
      </div>
       <button className="back-btn" onClick={() => navigate('/')}>
        ➔
      </button>
      <h1>🧾 فاتورة الشراء</h1>
      <p><strong>العميل:</strong> {customerName}</p>
      

      <table className="invoice-table">
        <thead>
          <tr>
            <th>المنتج</th>
            <th>السعر</th>
            <th>الكمية</th>
            <th>الإجمالي</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price} شيكل</td>
              <td>{item.quantity}</td>
              <td>{item.price * item.quantity} شيكل</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="total">المجموع الكلي: {totalPrice} شيكل</h2>

      <button onClick={() => window.print()} className="print-btn">
        طباعة الفاتورة 🖨️
      </button>

      <br />

     
    </div>
  );
};

export default Part;