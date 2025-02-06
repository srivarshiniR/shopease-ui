import axios from 'axios';
import { setAuthToken, clearAuthToken } from '../utils/auth';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User Login
export const loginUserApi = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

// User Signup
export const signupUserApi = async (userData) => {
  try {
    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Signup failed';
  }
};

// Logout
export const logoutUserApi = () => {
  clearAuthToken();
  localStorage.removeItem('user');
};

// Get All Products
export const getAllProducts = async () => {
  try {
    const response = await api.get('/products/');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error fetching products';
  }
};

// Add to Cart
export const addToCart = async (productId, userToken) => {
  try {
    const response = await api.post(
      '/cart/add',
      { productId },
      { headers: { Authorization: `Bearer ${userToken}` } }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error adding product to cart';
  }
};

// Place Order
export const placeOrder = async (userToken, cartItems) => {
  try {
    console.log('Sending request with token:', userToken);

    if (!cartItems || !Array.isArray(cartItems)) {
      throw new Error('Invalid cartItems data');
    }

    const products = cartItems.map(item => ({
      productId: item._id,
      quantity: item.quantity,
      price: item.sellingPrice,
    }));

    const totalPrice = cartItems.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);

    console.log('Products:', products);
    console.log('Total Price:', totalPrice);

    const response = await api.post(
      '/orders/place',
      { products, totalPrice },
      { headers: { Authorization: `Bearer ${userToken}` } }
    );

    return response.data;
  } catch (error) {
    console.error('Error placing order:', error.message);
    throw error.response?.data?.message || 'Error placing order';
  }
};

export const getOrderHistory = async (userToken) => {
  try {
    const response = await api.get('/orders/history', {
      headers: { Authorization: `Bearer ${userToken}` },
    });

    console.log("API Response (Order History):", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching order history:", error.response?.data || error.message);
    throw error.response?.data?.message || 'Error fetching order history';
  }
};



// Get All Orders (For Admin)
export const getAllOrders = async (userToken) => {
  try {
    const response = await api.get('/orders/all', {
      headers: { Authorization: `Bearer ${userToken}` },
    });

    console.log("API Response (All Orders):", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching all orders:", error.response?.data || error.message);
    throw error.response?.data?.message || 'Error fetching all orders';
  }
};


