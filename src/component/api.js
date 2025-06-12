import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export async function getAllCarParts() {
  const response = await axios.get(`${BASE_URL}/car-parts`);
  return response.data;
}

export async function searchProducts(query) {
  const response = await axios.get(`${BASE_URL}/car-parts/search`, {
    params: { query },
  });
  return response.data;
}

export async function fetchData(endpoint) {
  const response = await axios.get(`${BASE_URL}/${endpoint}`);
  return response.data;
}
