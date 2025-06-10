import React, { useEffect, useState } from 'react';
import { getAllCarParts } from './api';

function CarPartsList() {
  const [carParts, setCarParts] = useState([]);
  const [error, setError] = useState(null);

  const defaultImage = 'http://localhost:8000/storage/images/default.jpg';

  useEffect(() => {
    const fetchCarParts = async () => {
      try {
        const data = await getAllCarParts();
        console.log('قطع الغيار:', data);
        setCarParts(data);
      } catch (error) {
        console.error('خطأ في جلب البيانات:', error);
        setError('حدث خطأ في جلب البيانات');
      }
    };

    fetchCarParts();
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
