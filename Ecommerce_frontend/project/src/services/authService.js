import api from './api';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

const authService = {
  async register({ username, password, role = 'USER' }) {
    const res = await api.post('/auth/register', { username, password, role });
    return res.data;
  },

  async login({ username, password }) {
    const res = await api.post('/auth/login', { username, password });
    const { token, user } = res.data;
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    return { token, user };
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser() {
    try {
      const user = localStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};

export default authService;
