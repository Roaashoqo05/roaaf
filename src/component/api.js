import axios from 'axios';

// عنوان السيرفر - تأكدي إنه صحيح عند النشر (localhost فقط للتجربة المحلية)
const BASE_URL = 'http://localhost:8000/api';

// 🔹 جلب كل قطع الغيار
export async function getAllCarParts() {
  const response = await axios.get(`${BASE_URL}/car-parts`);
  return response.data;
}

// 🔍 البحث عن المنتجات حسب الكلمة
export async function searchProducts(query) {
  const response = await axios.get(`${BASE_URL}/car-parts/search`, {
    params: { query }, // يُرسل كـ /car-parts/search?query=فلتر
  });
  return response.data;
}

// 📦 دالة عامة يمكن إعادة استخدامها لأي endpoint (احتياطية)
export async function fetchData(endpoint) {
  const response = await axios.get(`${BASE_URL}/${endpoint}`);
  return response.data;
}
