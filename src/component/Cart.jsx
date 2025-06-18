import React, { useState } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, onRemoveFromCart }) => {
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  // دالة تنسيق التاريخ فقط
  const formatDate = (date = new Date()) => {
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // دالة تنسيق الوقت فقط
  const formatTime = (date = new Date()) => {
    return date.toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

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
        const fullInvoiceRes = await fetch(`http://127.0.0.1:8000/api/invoices/${data.invoice_id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        const fullInvoiceData = await fullInvoiceRes.json();
        setInvoice(fullInvoiceData.invoice);
      } else {
        console.error('فشل في إنشاء الفاتورة:', data.message || '');
      }
    } catch (error) {
      console.error('حدث خطأ أثناء إنشاء الفاتورة:', error);
    }
  };

  return (
    <div className="cart-container">
      {invoice ? (
        <>
          <h1 className="cart-title">📄 الفاتورة</h1>

          <div className="invoice-info">
            <p><strong>اسم العميل:</strong> {invoice.customer.name}</p>
            {/* عرض التاريخ والوقت بشكل منفصل */}
            <p><strong>تاريخ اليوم:</strong> {formatDate()}</p>
            <p><strong>الوقت:</strong> {formatTime()}</p>
            <p><strong>المجموع الكلي:</strong> {invoice.total} شيكل</p>
          </div>

          <table className="invoice-table">
            <thead>
              <tr>
                <th>اسم المنتج</th>
                <th>السعر للوحدة</th>
                <th>الكمية</th>
                <th>الإجمالي</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.part_name}</td>
                  <td>{item.unit_price} شيكل</td>
                  <td>{item.quantity}</td>
                  <td>{item.total} شيكل</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="checkout-btn" onClick={() => window.print()}>
            🖨️ طباعة الفاتورة
          </button>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Cart;
