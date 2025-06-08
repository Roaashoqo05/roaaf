import React from "react";
import { useParams } from "react-router-dom";
import './Product1.css';
import Products from './Data'; // ✅ تصدير افتراضي صحيح

const Product1 = () => {
  const { id } = useParams();

  // ✅ تأكد أنك تستخدم Products بالحرف الكبير
  const product = Products.find((p) => p.id.toString() === id);

  console.log("Product ID from URL:", id);
  console.log("Product found:", product);

  if (!product) return <p>المنتج غير موجود</p>;

  return (
    <div className="product-card">
  <div className="product-title">{product.name}</div>

  <img src={product.image} alt={product.name} className="product-image" />

  <div className="price">
    <span className="bold">{product.price}</span> شيكل
  </div>

  <div className="description-title">الوصف</div>
  <div className="description-text">{product.description}</div>

  <hr className="divider" />

  <div className="info-title">معلومات اضافية</div>
  <table className="info-table">
    <tbody>
      <tr>
        <td>عدد القطع المتوفرة</td>
        <td>{product.stock}</td>
      </tr>
      <tr>
        <td>الشركة المصنعة</td>
        <td>{product.manufacturer}</td>
      </tr>
    </tbody>
  </table>
</div>

  );
};

export default Product1;
