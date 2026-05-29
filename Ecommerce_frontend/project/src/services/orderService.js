import api from './api';

const orderService = {
  async createOrder() {
    const res = await api.post('/user/order');
    return res.data;
  },

  async getOrders() {
    const res = await api.get('/user/orders');
    return res.data;
  },
};

export default orderService;
