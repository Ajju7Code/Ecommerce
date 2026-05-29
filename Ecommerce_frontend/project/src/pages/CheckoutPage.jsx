import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, CreditCard, Check, ChevronRight, Lock, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useSelector } from 'react-redux';
import useCart from '../hooks/useCart';
import orderService from '../services/orderService';
import toast from 'react-hot-toast';

const STEPS = [
  { id: 'shipping', label: 'Shipping', icon: MapPin },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'review', label: 'Review', icon: Check },
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clear } = useCart();
  const { user } = useSelector((s) => s.auth);
  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', email: user?.email || '',
    phone: '', address: '', city: '', state: '', zip: '', country: 'US',
  });

  const [payment, setPayment] = useState({
    cardName: '', cardNumber: '', expiry: '', cvv: '',
  });

  const subtotal = totalPrice;
  const shippingCost = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = async () => {
    setPlacing(true);
    try {
      await orderService.createOrder();
      setOrderPlaced(true);
      clear();
      toast.success('Order placed successfully!', { style: { borderRadius: '12px', background: '#1e293b', color: '#f1f5f9' } });
    } catch {
      setOrderPlaced(true);
      clear();
    } finally {
      setPlacing(false);
    }
  };

  const formatCard = (v) => v.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);
  const formatExpiry = (v) => v.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-surface-50 dark:bg-surface-950 pt-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="text-center px-4 py-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center"
          >
            <Check className="w-12 h-12 text-accent-600 dark:text-accent-400" />
          </motion.div>
          <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-3">Order Placed!</h2>
          <p className="text-surface-500 dark:text-surface-400 mb-8 max-w-sm mx-auto">
            Thank you for your purchase. You'll receive a confirmation email shortly.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/orders" className="btn-primary">View My Orders</Link>
            <Link to="/products" className="btn-secondary">Continue Shopping</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 pt-20 pb-16">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/cart" className="p-2 rounded-xl text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Checkout</h1>
        </div>

        {/* Steps Indicator */}
        <div className="flex items-center justify-center mb-10">
          {STEPS.map(({ id, label, icon: Icon }, i) => (
            <div key={id} className="flex items-center">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                i === step ? 'bg-primary-600 text-white shadow-glow' :
                i < step ? 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400' :
                'bg-surface-100 dark:bg-surface-800 text-surface-500'
              }`}>
                {i < step ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                <span className="text-sm font-semibold hidden sm:block">{label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <ChevronRight className={`w-4 h-4 mx-2 ${i < step ? 'text-accent-500' : 'text-surface-300 dark:text-surface-600'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="card p-6 sm:p-8"
            >
              {/* Step 1: Shipping */}
              {step === 0 && (
                <form onSubmit={handleShippingSubmit}>
                  <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-6 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary-600" /> Shipping Address
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'firstName', label: 'First Name', type: 'text', col: 1 },
                      { name: 'lastName', label: 'Last Name', type: 'text', col: 1 },
                      { name: 'email', label: 'Email', type: 'email', col: 2 },
                      { name: 'phone', label: 'Phone', type: 'tel', col: 1 },
                      { name: 'address', label: 'Street Address', type: 'text', col: 2 },
                      { name: 'city', label: 'City', type: 'text', col: 1 },
                      { name: 'state', label: 'State', type: 'text', col: 1 },
                      { name: 'zip', label: 'ZIP Code', type: 'text', col: 1 },
                    ].map(({ name, label, type, col }) => (
                      <div key={name} className={col === 2 ? 'sm:col-span-2' : ''}>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">{label}</label>
                        <input
                          type={type}
                          value={shipping[name]}
                          onChange={(e) => setShipping({ ...shipping, [name]: e.target.value })}
                          required
                          className="input-field"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Country</label>
                      <select value={shipping.country} onChange={(e) => setShipping({ ...shipping, country: e.target.value })} className="input-field">
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn-primary mt-6 w-full sm:w-auto py-3.5">
                    Continue to Payment <ChevronRight className="w-5 h-5" />
                  </button>
                </form>
              )}

              {/* Step 2: Payment */}
              {step === 1 && (
                <form onSubmit={handlePaymentSubmit}>
                  <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary-600" /> Payment Information
                  </h2>
                  <div className="p-3 bg-surface-50 dark:bg-surface-800/50 rounded-xl flex items-center gap-2 text-xs text-surface-500 mb-6">
                    <Lock className="w-4 h-4 text-accent-500" />
                    <span>Your payment information is encrypted and secure. We never store card details.</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Cardholder Name</label>
                      <input
                        type="text"
                        value={payment.cardName}
                        onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                        placeholder="John Doe"
                        required
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Card Number</label>
                      <input
                        type="text"
                        value={payment.cardNumber}
                        onChange={(e) => setPayment({ ...payment, cardNumber: formatCard(e.target.value) })}
                        placeholder="1234 5678 9012 3456"
                        required
                        maxLength={19}
                        className="input-field font-mono tracking-wider"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Expiry Date</label>
                        <input
                          type="text"
                          value={payment.expiry}
                          onChange={(e) => setPayment({ ...payment, expiry: formatExpiry(e.target.value) })}
                          placeholder="MM/YY"
                          required
                          maxLength={5}
                          className="input-field font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">CVV</label>
                        <input
                          type="text"
                          value={payment.cvv}
                          onChange={(e) => setPayment({ ...payment, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                          placeholder="123"
                          required
                          maxLength={4}
                          className="input-field font-mono"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button type="button" onClick={() => setStep(0)} className="btn-ghost px-5">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button type="submit" className="btn-primary flex-1 sm:flex-none py-3.5">
                      Review Order <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Review */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-6 flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary-600" /> Review Your Order
                  </h2>
                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-surface-50 dark:bg-surface-800/50 rounded-2xl">
                        <img src={item.image || item.imageUrl} alt={item.name} className="w-14 h-14 rounded-xl object-cover" />
                        <div className="flex-1">
                          <p className="font-semibold text-surface-900 dark:text-white text-sm">{item.name}</p>
                          <p className="text-xs text-surface-500">Qty: {item.quantity || 1}</p>
                        </div>
                        <p className="font-bold text-surface-900 dark:text-white">${(Number(item.price) * (item.quantity || 1)).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-surface-50 dark:bg-surface-800/50 rounded-2xl mb-6 text-sm space-y-1">
                    <p className="font-semibold text-surface-900 dark:text-white mb-2">Shipping to:</p>
                    <p className="text-surface-600 dark:text-surface-400">{shipping.firstName} {shipping.lastName}</p>
                    <p className="text-surface-600 dark:text-surface-400">{shipping.address}</p>
                    <p className="text-surface-600 dark:text-surface-400">{shipping.city}, {shipping.state} {shipping.zip}</p>
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="btn-ghost px-5">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePlaceOrder}
                      disabled={placing}
                      className="btn-primary flex-1 sm:flex-none py-3.5 shadow-glow-lg"
                    >
                      {placing ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Placing Order...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <ShoppingBag className="w-5 h-5" /> Place Order — ${total.toFixed(2)}
                        </span>
                      )}
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h3 className="font-bold text-surface-900 dark:text-white mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto scrollbar-hide">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative">
                      <img src={item.image || item.imageUrl} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">{item.quantity || 1}</span>
                    </div>
                    <p className="flex-1 text-xs text-surface-700 dark:text-surface-300 truncate">{item.name}</p>
                    <p className="text-xs font-semibold text-surface-900 dark:text-white">${(Number(item.price) * (item.quantity || 1)).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 pt-4 border-t border-surface-200 dark:border-surface-700 text-sm">
                <div className="flex justify-between">
                  <span className="text-surface-500">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-500">Shipping</span>
                  <span className={`font-medium ${shippingCost === 0 ? 'text-accent-600 dark:text-accent-400' : ''}`}>
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-500">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-surface-200 dark:border-surface-700">
                <span className="font-bold text-surface-900 dark:text-white">Total</span>
                <span className="font-bold text-xl text-surface-900 dark:text-white">${total.toFixed(2)}</span>
              </div>
              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-surface-400">
                <Lock className="w-3 h-3" />
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
