import React, { useState } from 'react';
import axios from 'axios';

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
  });

  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewUrls(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let uploadedUrls = [];

      // رفع الصور أولاً
      if (images.length > 0) {
        const imageForm = new FormData();
        images.forEach(img => imageForm.append('images[]', img));

        const imgRes = await axios.post('http://localhost:8000/api/car-parts/upload-images', imageForm, {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...getAuthHeaders(),
          },
        });

        uploadedUrls = imgRes.data.image_urls;
      }

      // إرسال بيانات القطعة
      const carPartData = {
        ...formData,
        price: parseFloat(formData.price),
        year: parseInt(formData.year),
        stock: parseInt(formData.stock),
        image_urls: uploadedUrls,
      };

      await axios.post('http://localhost:8000/api/car-parts', carPartData, {
        headers: getAuthHeaders(),
      });

      alert('✅ تم إضافة القطعة بنجاح');
      setFormData({
        name: '',
        price: '',
        description: '',
        category: '',
        brand: '',
        car_model: '',
        year: '',
        stock: '',
      });
      setImages([]);
      setPreviewUrls([]);

    } catch (err) {
      console.error(err);
      alert('❌ حدث خطأ أثناء الإرسال');
    }
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem("api_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>إضافة قطعة سيارة</h2>

      <input name="name" placeholder="اسم القطعة" value={formData.name} onChange={handleChange} required />
      <input name="price" type="number" placeholder="السعر" value={formData.price} onChange={handleChange} required />
      <input name="description" placeholder="الوصف" value={formData.description} onChange={handleChange} />
      <input name="category" placeholder="الفئة" value={formData.category} onChange={handleChange} />
      <input name="brand" placeholder="الماركة" value={formData.brand} onChange={handleChange} />
      <input name="car_model" placeholder="موديل السيارة" value={formData.car_model} onChange={handleChange} />
      <input name="year" type="number" placeholder="سنة الصنع" value={formData.year} onChange={handleChange} />
      <input name="stock" type="number" placeholder="الكمية" value={formData.stock} onChange={handleChange} />

      <input type="file" multiple accept="image/*" onChange={handleFileChange} />
      {previewUrls.map((url, idx) => (
        <img key={idx} src={url} alt={`preview-${idx}`} width="100" style={{ margin: '5px' }} />
      ))}

      <button type="submit">➕ إضافة القطعة</button>
    </form>
  );
}

export default AddCarPart;
