const API_BASE_URL = 'http://127.0.0.1:5555/api';

export const api = {
  // ========== PUBLIC ROUTES ==========
  
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

  // ========== ADMIN ROUTES ==========

  // ADMIN: Get all orders
  getAllOrders: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`);
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
        headers: {
          'Content-Type': 'application/json',
        },
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
      // Try to get ALL flavours from /flavours/all endpoint
      const response = await fetch(`${API_BASE_URL}/flavours/all`);
      if (!response.ok) {
        // Fallback to regular flavours endpoint if /all doesn't exist
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
        headers: {
          'Content-Type': 'application/json',
        },
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
        headers: {
          'Content-Type': 'application/json',
        },
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
    try {
      const response = await fetch(`${API_BASE_URL}/flavours/${flavourId}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete flavour');
      }
      
      return data;
    } catch (error) {
      console.error('Error deleting flavour:', error);
      throw error;
    }
  },

  // ADMIN: Get dashboard stats
  getStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stats`);
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