const API_BASE_URL = 'http://127.0.0.1:5555/api';

export const api = {
  // Get all flavours
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
};