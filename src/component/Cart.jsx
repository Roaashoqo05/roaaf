import React from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, onRemoveFromCart }) => {
  const navigate = useNavigate();

  const updateQuantity = (id, delta) => {
    const updated = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    // هذا التعديل يتطلب تمرير دالة setCartItems من App أو إدارة عبر context
    console.warn('تعديل الكمية غير مفعل إلا إذا تم تمرير setCartItems');
  };
const totalPrice = cartItems.reduce(
  (acc, item) => acc + (Number(item.price) * item.quantity),
  0
);


  return (
    <div className="cart-container">
      <h1 className="cart-title">🛒 سلة المشتريات</h1>

      <button className="back-btn" onClick={() => navigate(-1)}>➔</button>

      {cartItems.length === 0 ? (
        <p className="empty-message">السلة فارغة.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
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
            <button
              className="checkout-btn"
              onClick={() => {
                navigate('/Part', {
                  state: {
                    cartItems,
                    totalPrice,
                    customerName: 'العميل الكريم',
                  },
                });
              }}
            >
              إتمام الشراء
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;