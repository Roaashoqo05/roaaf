import React from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, onRemoveFromCart }) => {
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      const invoiceData = {
        customer: {
          name: 'العميل الكريم',
          phone: '000000000',
        },
        items: cartItems.map(item => ({
          part_id: item.id,
          quantity: item.quantity,
        })),
        tax: 0,
        discount: 0,
      };

      const response = await fetch('http://127.0.0.1:8000/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(invoiceData),
      });

      const data = await response.json();

      if (data.success) {
        alert('تم إنشاء الفاتورة بنجاح!');
        navigate('/car-parts'); // إعادة توجيه لصفحة عرض المنتجات
      } else {
        alert('فشل في إنشاء الفاتورة: ' + (data.message || ''));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('حدث خطأ أثناء إنشاء الفاتورة');
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">🛒 سلة المشتريات</h1>

      <button className="back-btn" onClick={() => navigate(-1)}>➔</button>

      {cartItems.length === 0 ? (
        <p className="empty-message">السلة فارغة.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>الكمية: {item.quantity}</p>
                  <p>السعر: {item.price} شيكل</p>
                  <button className="trash-icon" onClick={() => onRemoveFromCart(item.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>السعر الكلي: {totalPrice} شيكل</h2>
            <button className="checkout-btn" onClick={handleCheckout}>إتمام الشراء</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
