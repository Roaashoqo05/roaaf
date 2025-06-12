import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import { fetchData, searchProducts } from './api';

const HomePage = ({ onAddToCart, searchTerm }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      try {
        setLoading(true);

        let data;
        if (searchTerm.trim() !== '') {
          data = await searchProducts(searchTerm);
        } else {
          data = await fetchData('car-parts');
        }

        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('خطأ أثناء تحميل المنتجات:', error);
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const addToCart = (product) => {
    const productWithId = {
      ...product,
      id: product.id || product._id,
    };
    onAddToCart(productWithId);
  };

  if (loading) return <p>جاري تحميل المنتجات...</p>;

  return (
    <div className="main-container">
      <div className="banner">
        <img src="/images/image websit.jpg" alt="Banner" />
      </div>

      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product._id || product.id}>
              <img src={product.image} alt={product.name} className="product-img" />
              <div className="product-info">
                <p className="product-name">{product.name}</p>
                <div className="price-cart">
                  <span
                    className="cart-icon"
                    onClick={() => addToCart(product)}
                    title="أضف إلى السلة"
                    style={{ cursor: 'pointer' }}
                  >
                    🛒
                  </span>
                  <span className="price">{product.price} شيكل</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">لا توجد نتائج مطابقة</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
