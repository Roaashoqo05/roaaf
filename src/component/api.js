import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

function getAuthHeaders() {
  const token = localStorage.getItem("api_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getAllCarParts() {
  const response = await axios.get(`${BASE_URL}/car-parts`);
  return response.data;
}


export async function searchProducts(query) {
  const response = await axios.get(`${BASE_URL}/car-parts/search`, {
    params: { query },
    headers: getAuthHeaders(),
  });
  return response.data;
}

export async function fetchData(endpoint) {
  const response = await axios.get(`${BASE_URL}/${endpoint}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
}
