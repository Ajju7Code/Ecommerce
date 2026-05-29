import api from './api';

const productService = {
  async getProducts(params = {}) {
    const res = await api.get('/user/products', { params });
    return res.data;
  },

  async createProduct(productData) {
    const res = await api.post('/admin/products', productData);
    return res.data;
  },
};

export default productService;
