import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, XCircle, Truck, ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OrderCardSkeleton } from '../components/Skeleton';
import orderService from '../services/orderService';

const STATUS_CONFIG = {
  PENDING: { label: 'Pending', icon: Clock, className: 'badge-warning', color: 'text-gold-600 dark:text-gold-400' },
  PROCESSING: { label: 'Processing', icon: Package, className: 'badge-info', color: 'text-primary-600 dark:text-primary-400' },
  SHIPPED: { label: 'Shipped', icon: Truck, className: 'badge-info', color: 'text-primary-600 dark:text-primary-400' },
  DELIVERED: { label: 'Delivered', icon: CheckCircle, className: 'badge-success', color: 'text-accent-600 dark:text-accent-400' },
  CANCELLED: { label: 'Cancelled', icon: XCircle, className: 'badge-error', color: 'text-red-600 dark:text-red-400' },
};

const STEPS = ['Order Placed', 'Processing', 'Shipped', 'Delivered'];

const getStepIndex = (status) => {
  const map = { PENDING: 0, PROCESSING: 1, SHIPPED: 2, DELIVERED: 3 };
  return map[status] ?? -1;
};

const MOCK_ORDERS = [
  {
    id: 'ORD-2025-001',
    status: 'DELIVERED',
    createdAt: '2025-05-10T10:00:00Z',
    total: 599.97,
    items: [
      { id: 1, name: 'Premium Wireless Headphones', price: 299.99, quantity: 1, image: 'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=100' },
      { id: 2, name: 'Carbon Fiber Wallet', price: 89.99, quantity: 2, image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=100' },
    ],
  },
  {
    id: 'ORD-2025-002',
    status: 'SHIPPED',
    createdAt: '2025-05-18T14:00:00Z',
    total: 249.99,
    items: [
      { id: 3, name: 'Designer Sunglasses', price: 249.99, quantity: 1, image: 'https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg?auto=compress&cs=tinysrgb&w=100' },
    ],
  },
  {
    id: 'ORD-2025-003',
    status: 'PROCESSING',
    createdAt: '2025-05-25T09:30:00Z',
    total: 369.98,
    items: [
      { id: 4, name: 'Minimalist Sneakers', price: 189.99, quantity: 1, image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=100' },
      { id: 5, name: 'Silk Blend Shirt', price: 129.99, quantity: 1, image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=100' },
    ],
  },
];

const OrderCard = ({ order, index }) => {
  const [expanded, setExpanded] = useState(false);
  const statusCfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING;
  const StatusIcon = statusCfg.icon;
  const stepIndex = getStepIndex(order.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card overflow-hidden"
    >
      {/* Order Header */}
      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <p className="text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-widest mb-1">Order</p>
            <h3 className="text-lg font-bold text-surface-900 dark:text-white">{order.id}</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className={statusCfg.className}>
              <StatusIcon className="w-3 h-3 mr-1 inline" />
              {statusCfg.label}
            </span>
            <span className="text-xl font-bold text-surface-900 dark:text-white">
              ${Number(order.total).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-surface-500 dark:text-surface-400">
          <span>Placed {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          <span>{order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Progress Steps (for non-cancelled) */}
      {order.status !== 'CANCELLED' && (
        <div className="px-5 sm:px-6 pb-5">
          <div className="relative flex items-center justify-between">
            <div className="absolute left-0 right-0 top-3 h-0.5 bg-surface-200 dark:bg-surface-700" />
            <div
              className="absolute left-0 top-3 h-0.5 bg-primary-600 dark:bg-primary-500 transition-all duration-500"
              style={{ width: `${(Math.max(0, stepIndex) / (STEPS.length - 1)) * 100}%` }}
            />
            {STEPS.map((step, i) => (
              <div key={step} className="relative flex flex-col items-center gap-1.5">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  i <= stepIndex
                    ? 'bg-primary-600 border-primary-600 text-white'
                    : 'bg-white dark:bg-surface-800 border-surface-300 dark:border-surface-600'
                }`}>
                  {i < stepIndex && <span className="text-xs">✓</span>}
                  {i === stepIndex && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${i <= stepIndex ? 'text-primary-600 dark:text-primary-400' : 'text-surface-400'}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expand Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 sm:px-6 py-3 flex items-center justify-between text-sm font-medium text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors border-t border-surface-200 dark:border-surface-700"
      >
        <span>{expanded ? 'Hide items' : 'View items'}</span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {/* Order Items */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-surface-200 dark:border-surface-700 p-5 sm:p-6 space-y-3 bg-surface-50 dark:bg-surface-800/40"
        >
          {order.items?.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface-200 dark:bg-surface-700 flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-surface-900 dark:text-white truncate">{item.name}</p>
                <p className="text-xs text-surface-500 dark:text-surface-400">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-bold text-surface-900 dark:text-white flex-shrink-0">
                ${(Number(item.price) * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    orderService.getOrders()
      .then(setOrders)
      .catch(() => setOrders(MOCK_ORDERS))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'ALL' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 pt-20 pb-16">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <Package className="w-7 h-7 text-primary-600" />
            <h1 className="text-3xl font-bold text-surface-900 dark:text-white">My Orders</h1>
          </div>
          <p className="text-surface-500 dark:text-surface-400 ml-10">
            Track and manage your purchases
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6">
          {['ALL', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all flex-shrink-0 ${
                filter === status
                  ? 'bg-primary-600 text-white shadow-glow'
                  : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 border border-surface-200 dark:border-surface-700'
              }`}
            >
              {status === 'ALL' ? 'All Orders' : STATUS_CONFIG[status]?.label || status}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => <OrderCardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-surface-200 dark:bg-surface-800 flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-surface-400" />
            </div>
            <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">No orders yet</h3>
            <p className="text-surface-500 dark:text-surface-400 mb-6">Start shopping to see your orders here.</p>
            <Link to="/products" className="btn-primary">Browse Products</Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filtered.map((order, i) => (
              <OrderCard key={order.id} order={order} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
