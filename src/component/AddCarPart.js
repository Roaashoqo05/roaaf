import React, { useState } from 'react';

function AddCarPart() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    brand: '',
    car_model: '',
    year: '',
    stock: '',
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('brand', formData.brand);
    data.append('car_model', formData.car_model);
    data.append('year', formData.year);
    data.append('stock', formData.stock);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await fetch('http://localhost:8000/api/car-parts', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        alert('تم إضافة القطعة بنجاح!');
        setFormData({
          name: '',
          price: '',
          description: '',
          category: '',
          brand: '',
          car_model: '',
          year: '',
          stock: '',
          image: null,
        });
      } else {
        alert('خطأ: ' + (result.message || JSON.stringify(result)));
      }
    } catch (error) {
      alert('حدث خطأ في الإتصال بالخادم.');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ maxWidth: '400px', margin: 'auto' }}>
      <input
        type="text"
        name="name"
        placeholder="اسم القطعة"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        step="0.01"
        name="price"
        placeholder="السعر"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="الوصف"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="category"
        placeholder="الفئة"
        value={formData.category}
        onChange={handleChange}
      />
      <input
        type="text"
        name="brand"
        placeholder="الماركة"
        value={formData.brand}
        onChange={handleChange}
      />
      <input
        type="text"
        name="car_model"
        placeholder="موديل السيارة"
        value={formData.car_model}
        onChange={handleChange}
      />
      <input
        type="number"
        name="year"
        placeholder="سنة الصنع"
        value={formData.year}
        onChange={handleChange}
      />
      <input
        type="number"
        name="stock"
        placeholder="المخزون"
        value={formData.stock}
        onChange={handleChange}
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
      />
      <button type="submit">إضافة القطعة</button>
    </form>
  );
}

export default AddCarPart;
