


import React from "react";
import "./Product2.css"; // تأكد من ربط ملف CSS

const Product2 = () => {
  return (
    <div className="product-card">
      <div className="product-title">الفرامل (Differential)</div>

      {/* صورة المنتج */}
      <div>
      <img src="/images/Brakes.jpg" alt="الفرامل" className="product-image" />

      </div>

      <div className="price">
        <span className="bold">40</span> شيكل
      </div>

      <div className="description-title">الوصف</div>
      <div className="description-text">
        فعال للغاية ويستخدم لجميع انواع السيارات
      </div>

      <hr className="divider" />

      <div className="info-title">معلومات اضافية</div>
      <table className="info-table">
        <tbody>
          <tr>
            <td>عدد القطع المتوفرة</td>
            <td > <input type="number"/> </td>
          </tr>
          <tr>
            <td>الشركة المصنعة</td>
            <td>—</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Product2;

