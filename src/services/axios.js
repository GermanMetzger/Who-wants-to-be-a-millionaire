import axios from 'axios';

const API_BASE_URL = 'https://opentdb.com';


export const base = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }

});

const axiosInstance = async (endpoint, params = {}) => {
  try {
    const response = await base.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error('Error en fetchWithAxios:', error);
    throw error;
  }
};

export default axiosInstance;