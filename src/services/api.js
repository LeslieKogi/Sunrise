const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5555/api';

// Helper function to get auth headers with JWT token
const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

export const api = {
  // ========== PUBLIC ROUTES (no auth needed) ==========
  
  // Get all available flavours (for customers)
  getFlavours: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/flavours`);
      if (!response.ok) {
        throw new Error('Failed to fetch flavours');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching flavours:', error);
      throw error;
    }
  },

  // Create an order
  createOrder: async (orderData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order');
      }
      
      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Get order by order number
  getOrderByNumber: async (orderNumber) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderNumber}`);
      if (!response.ok) {
        throw new Error('Order not found');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  // ========== ADMIN ROUTES (require JWT token) ==========

  // ADMIN: Get all orders
  getAllOrders: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        headers: getAuthHeaders(),  // ← Now includes JWT token
      });
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching all orders:', error);
      throw error;
    }
  },

  // ADMIN: Update order status
  updateOrderStatus: async (orderId, updateData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),  // ← Now includes JWT token
        body: JSON.stringify(updateData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update order');
      }
      
      return data;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  },

  // ADMIN: Get all flavours (including unavailable ones)
  getAllFlavours: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/flavours/all`, {
        headers: getAuthHeaders(),  // ← Now includes JWT token
      });
      if (!response.ok) {
        const fallbackResponse = await fetch(`${API_BASE_URL}/flavours`);
        return await fallbackResponse.json();
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching all flavours:', error);
      throw error;
    }
  },

  // ADMIN: Create flavour
  createFlavour: async (flavourData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/flavours`, {
        method: 'POST',
        headers: getAuthHeaders(),  // ← Now includes JWT token
        body: JSON.stringify(flavourData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create flavour');
      }
      
      return data;
    } catch (error) {
      console.error('Error creating flavour:', error);
      throw error;
    }
  },

  // ADMIN: Update flavour
  updateFlavour: async (flavourId, flavourData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/flavours/${flavourId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),  // ← Now includes JWT token
        body: JSON.stringify(flavourData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update flavour');
      }
      
      return data;
    } catch (error) {
      console.error('Error updating flavour:', error);
      throw error;
    }
  },

// ADMIN: Delete flavour
deleteFlavour: async (flavourId) => {
  const response = await fetch(`${API_BASE_URL}/flavours/${flavourId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  const data = await response.json(); // ✅ parse ONCE

  if (!response.ok) {
    throw new Error(data.error || 'Failed to delete flavour');
  }

  return data;
},

  // ADMIN: Get dashboard stats
  getStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stats`, {
        headers: getAuthHeaders(),  // ← Now includes JWT token
      });
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  },
};