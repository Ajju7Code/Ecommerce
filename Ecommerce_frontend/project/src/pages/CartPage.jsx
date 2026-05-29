import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Tag, ShoppingBag } from 'lucide-react';
import useCart from '../hooks/useCart';
import { useSelector } from 'react-redux';

const CartPage = () => {
  const { items, totalPrice, removeItem, updateItem } = useCart();
  const { isAuthenticated } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  const subtotal = totalPrice;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    } else {
      navigate('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-surface-950 pt-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 px-4"
        >
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center"
          >
            <ShoppingCart className="w-12 h-12 text-surface-400" />
          </motion.div>
          <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-surface-500 dark:text-surface-400 mb-8 max-w-sm">
            Looks like you haven't added anything yet. Let's find something amazing!
          </p>
          <Link to="/products" className="btn-primary text-base py-3.5 px-8 inline-flex">
            <ShoppingBag className="w-5 h-5" />
            Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 pt-20 pb-16">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <ShoppingCart className="w-7 h-7 text-primary-600" />
            <h1 className="text-3xl font-bold text-surface-900 dark:text-white">Shopping Cart</h1>
            <span className="badge-info ml-1">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="card p-5 flex gap-4"
                >
                  {/* Image */}
                  <Link to={`/products/${item.id}`} className="flex-shrink-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-surface-100 dark:bg-surface-700">
                      <img
                        src={item.imageUrl || item.image || 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=200'}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        {item.category && (
                          <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-widest">{item.category}</span>
                        )}
                        <h3 className="font-semibold text-surface-900 dark:text-white mt-0.5 line-clamp-2 text-sm sm:text-base">
                          {item.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex-shrink-0 p-1.5 rounded-lg text-surface-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity */}
                      <div className="flex items-center bg-surface-100 dark:bg-surface-700 rounded-xl overflow-hidden">
                        <button
                          onClick={() => updateItem(item.id, (item.quantity || 1) - 1)}
                          className="w-8 h-8 flex items-center justify-center text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-surface-900 dark:text-white">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => updateItem(item.id, (item.quantity || 1) + 1)}
                          className="w-8 h-8 flex items-center justify-center text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-bold text-surface-900 dark:text-white">
                          ${(Number(item.price) * (item.quantity || 1)).toFixed(2)}
                        </p>
                        {(item.quantity || 1) > 1 && (
                          <p className="text-xs text-surface-400">${Number(item.price).toFixed(2)} each</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="card p-6 sticky top-24">
              <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-6">Order Summary</h2>

              {/* Coupon */}
              <div className="flex gap-2 mb-6">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                  <input type="text" placeholder="Coupon code" className="input-field pl-9 text-sm py-2.5" />
                </div>
                <button className="px-4 py-2.5 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-xl text-sm font-medium hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors">
                  Apply
                </button>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-surface-200 dark:border-surface-700">
                <div className="flex justify-between text-sm">
                  <span className="text-surface-500 dark:text-surface-400">Subtotal ({items.length} items)</span>
                  <span className="font-medium text-surface-900 dark:text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-surface-500 dark:text-surface-400">Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-accent-600 dark:text-accent-400' : 'text-surface-900 dark:text-white'}`}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-surface-500 dark:text-surface-400">Tax (8%)</span>
                  <span className="font-medium text-surface-900 dark:text-white">${tax.toFixed(2)}</span>
                </div>
                {shipping === 0 && (
                  <div className="p-2.5 bg-accent-50 dark:bg-accent-900/20 rounded-xl">
                    <p className="text-xs text-accent-700 dark:text-accent-300 font-medium">You qualify for free shipping!</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-surface-900 dark:text-white text-lg">Total</span>
                <span className="font-bold text-2xl text-surface-900 dark:text-white">${total.toFixed(2)}</span>
              </div>

              <button onClick={handleCheckout} className="btn-primary w-full text-base py-4 shadow-glow hover:shadow-glow-lg">
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </button>

              <Link to="/products" className="btn-ghost w-full mt-3 text-sm py-3 text-center">
                Continue Shopping
              </Link>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-surface-400">
                <span>🔒</span>
                <span>Secure checkout powered by SSL encryption</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
