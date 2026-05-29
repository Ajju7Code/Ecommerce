import api from './api';

const cartService = {
  async getCart() {
    const res = await api.get('/user/cart');
    return res.data;
  },

  async addToCart(productId) {
    const res = await api.post(`/user/cart/add/${productId}`);
    return res.data;
  },
};

export default cartService;
