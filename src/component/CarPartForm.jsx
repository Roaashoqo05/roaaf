import React, { useState } from 'react';
import axios from 'axios';

function CarPartForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    car_model: '',
    year: '',
    stock: '',
  });

  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  // التعامل مع تغييرات الحقول النصية
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // عند اختيار الصور
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // معاينة الصور قبل رفعها
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  // إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let uploaded = [];

      // رفع الصور
      if (images.length > 0) {
        const data = new FormData();
        images.forEach(image => data.append('images[]', image));

        const res = await axios.post('http://localhost:8000/api/car-parts/upload-images', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        uploaded = res.data.image_urls;
        setUploadedUrls(uploaded); // لحفظ روابط الصور للعرض لاحقًا
      }

      // تجهيز بيانات القطعة
      const carPartData = {
        ...formData,
        price: parseFloat(formData.price),
        year: parseInt(formData.year),
        stock: parseInt(formData.stock),
        image_urls: uploaded,
      };

      // إرسال بيانات القطعة
      await axios.post('http://localhost:8000/api/car-parts', carPartData);

      alert('✅ تم إضافة قطعة السيارة بنجاح!');

      // إعادة تعيين النموذج
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        brand: '',
        car_model: '',
        year: '',
        stock: '',
      });
      setImages([]);
      setPreviewUrls([]);

    } catch (error) {
      console.error('❌ خطأ أثناء الإرسال:', error);
      alert('حدث خطأ أثناء إضافة القطعة');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>إضافة قطعة سيارة</h2>

      <input name="name" placeholder="اسم القطعة" value={formData.name} onChange={handleChange} required />
      <input name="description" placeholder="الوصف" value={formData.description} onChange={handleChange} />
      <input name="price" type="number" placeholder="السعر" value={formData.price} onChange={handleChange} required />
      <input name="category" placeholder="الفئة" value={formData.category} onChange={handleChange} />
      <input name="brand" placeholder="الماركة" value={formData.brand} onChange={handleChange} />
      <input name="car_model" placeholder="موديل السيارة" value={formData.car_model} onChange={handleChange} />
      <input name="year" type="number" placeholder="سنة الصنع" value={formData.year} onChange={handleChange} />
      <input name="stock" type="number" placeholder="الكمية المتوفرة" value={formData.stock} onChange={handleChange} />

      <input type="file" multiple accept="image/*" onChange={handleFileChange} />

      {/* عرض معاينة الصور قبل الرفع */}
      {previewUrls.length > 0 && (
        <div style={{ margin: '10px 0' }}>
          <p>📷 معاينة الصور قبل الرفع:</p>
          {previewUrls.map((url, i) => (
            <img key={i} src={url} alt={`preview-${i}`} width="100" style={{ margin: '5px' }} />
          ))}
        </div>
      )}

      <button type="submit">➕ إضافة القطعة</button>

      {/* عرض الصور بعد رفع القطعة بنجاح */}
      {uploadedUrls.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <p>✅ الصور التي تم رفعها:</p>
          {uploadedUrls.map((url, index) => (
            <img key={index} src={url} alt={`uploaded-${index}`} width="100" style={{ margin: '5px' }} />
          ))}
        </div>
      )}
    </form>
  );
}

export default CarPartForm;
