import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser, logout } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const login = (credentials) => dispatch(loginUser(credentials));
  const register = (userData) => dispatch(registerUser(userData));
  const signOut = () => dispatch(logout());

  const isAdmin = user?.role === 'ADMIN' || user?.roles?.includes('ADMIN');

  return { user, token, isAuthenticated, loading, error, login, register, signOut, isAdmin };
};

export default useAuth;
