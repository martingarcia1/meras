import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===== PRODUCTOS =====
export const productsApi = {
  // Obtener todos los productos
  getAll: () => api.get('/products'),
  
  // Obtener un producto por ID
  getById: (id) => api.get(`/products/${id}`),
  
  // Obtener todas las categorías
  getCategories: () => api.get('/products/categories'),
  
  // Crear un producto (admin)
  create: (data) => api.post('/products', data),
  
  // Crear una variante
  createVariant: (data) => api.post('/products/variants', data),
};

// ===== CATEGORÍAS =====
export const categoriesApi = {
  getAll: () => api.get('/products/categories'),
  create: (data) => api.post('/products/categories', data),
};

export default api;

