import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CarPartsList() {
  const [carParts, setCarParts] = useState([]);
  const [error, setError] = useState(null);

  const defaultImage = 'http://localhost:8000/storage/images/default.jpg';

  useEffect(() => {
    axios.get('http://localhost:8000/api/car-parts')
      .then(response => {
        setCarParts(response.data);
      })
      .catch(error => {
        setError('حدث خطأ في جلب البيانات');
        console.error(error);
      });
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>قطع السيارات</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {carParts.map(part => (
          <li
            key={part._id || part.id}
            style={{
              marginBottom: '20px',
              borderBottom: '1px solid #ccc',
              paddingBottom: '10px'
            }}
          >
            <h3>{part.name}</h3>

            {/* عرض الصورة مع fallback في حالة الخطأ */}
            <img
              src={part.image_url || defaultImage}
              alt={part.name}
              style={{
                maxWidth: '200px',
                height: 'auto',
                display: 'block',
                marginBottom: '10px'
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultImage;
              }}
            />

            <p>السعر: {part.price} شيكل</p>
            {part.description && <p>الوصف: {part.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarPartsList;

