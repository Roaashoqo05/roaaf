import React, { useEffect, useState } from 'react';
import './HomePage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ onAddToCart, searchTerm = '' }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultImage = 'http://localhost:8000/storage/images/default.jpg';

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          setError(null);

          const token = localStorage.getItem('token');

          const url =
            searchTerm.trim() !== ''
              ? `http://localhost:8000/api/car-parts/search?term=${searchTerm}`
              : 'http://localhost:8000/api/car-parts';

          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setProducts(response.data);
        } catch (error) {
          console.error('خطأ أثناء تحميل المنتجات:', error);
          setError('حدث خطأ أثناء تحميل المنتجات');
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
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
  if (error) return <p>{error}</p>;

  return (
    <div className="main-container">
      <h1 className="prodact">قطع السيارات</h1>

      <div className="banner">
        <img src="/images/image websit.jpg" alt="Banner" />
      </div>

      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product._id || product.id}>
              <div className="product-img-wrapper">
                {product.image_urls && product.image_urls.length > 0 ? (
                  product.image_urls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`صورة ${product.name} ${index + 1}`}
                      className="product-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultImage;
                      }}
                    />
                  ))
                ) : (
                  <img
                    src={product.image || defaultImage}
                    alt={product.name}
                    className="product-img"
                  />
                )}
              </div>
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
                {product.description && <p className="product-description">{product.description}</p>}
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
