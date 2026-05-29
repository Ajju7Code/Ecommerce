import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import { addToCartAsync, fetchCart } from '../store/slices/cartSlice';
import toast from 'react-hot-toast';

export const useCart = () => {
  const dispatch = useDispatch();
  const { items, totalPrice, totalQuantity, loading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const addItem = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`, {
      icon: '🛒',
      style: { borderRadius: '12px', background: '#1e293b', color: '#f1f5f9' },
    });
    if (isAuthenticated) {
      dispatch(addToCartAsync(product.id));
    }
  };

  const removeItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const updateItem = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const clear = () => {
    dispatch(clearCart());
  };

  const loadCart = () => {
    if (isAuthenticated) dispatch(fetchCart());
  };

  return { items, totalPrice, totalQuantity, loading, addItem, removeItem, updateItem, clear, loadCart };
};

export default useCart;
