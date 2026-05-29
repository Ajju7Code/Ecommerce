import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Sparkles, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../store/slices/authSlice';
import toast from 'react-hot-toast';

const passwordStrength = (pass) => {
  const checks = {
    length: pass.length >= 8,
    uppercase: /[A-Z]/.test(pass),
    lowercase: /[a-z]/.test(pass),
    number: /[0-9]/.test(pass),
    special: /[^A-Za-z0-9]/.test(pass),
  };
  const score = Object.values(checks).filter(Boolean).length;
  return { checks, score, label: ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'][score], color: ['', 'bg-red-500', 'bg-gold-500', 'bg-gold-400', 'bg-accent-500', 'bg-accent-500'][score] };
};

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((s) => s.auth);

  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' });
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const strength = passwordStrength(form.password);

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => { return () => { dispatch(clearError()); }; }, [dispatch]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!agreed) {
      toast.error('Please agree to the terms');
      return;
    }
    const result = await dispatch(registerUser({ username: form.username, password: form.password }));
    if (registerUser.fulfilled.match(result)) {
      toast.success('Account created successfully! Please login.', { style: { borderRadius: '12px', background: '#1e293b', color: '#f1f5f9' } });
      navigate('/login');
    }
  };

  const CHECKS_LABELS = [
    { key: 'length', label: '8+ characters' },
    { key: 'uppercase', label: 'Uppercase letter' },
    { key: 'number', label: 'Number' },
    { key: 'special', label: 'Special character' },
  ];

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-surface-950">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-700/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-blue-700/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Right panel */}
      <div className="hidden lg:flex lg:flex-1 relative order-last">
        <img
          src="https://images.pexels.com/photos/3965548/pexels-photo-3965548.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Register visual"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-surface-950 to-surface-950/40" />
        <div className="relative z-10 flex flex-col justify-center px-16">
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Join the<br /><span className="gradient-text">LUXA</span><br />community
          </h2>
          <p className="text-surface-400 text-lg mb-10 max-w-xs">
            Create your account and unlock a premium shopping experience.
          </p>
          <div className="space-y-4">
            {['Free sign up, no credit card needed', 'Exclusive member discounts', 'Order tracking & history', 'Priority customer support'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span className="text-surface-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 relative z-10 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="flex lg:hidden items-center gap-2 mb-8 justify-center">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">LUX<span className="text-primary-500">A</span></span>
          </Link>

          <div className="glass dark:bg-surface-800/60 rounded-3xl p-8 shadow-premium border border-surface-700/50">
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-white mb-1">Create Account</h1>
              <p className="text-surface-400 text-sm">Already have one?{' '}
                <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">Sign in</Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-900/30 border border-red-700/50 rounded-xl text-red-300 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {[
                { label: 'Username', name: 'username', type: 'text', icon: User, placeholder: 'johndoe' },
              ].map(({ label, name, type, icon: Icon, placeholder }) => (
                <div key={name} className="space-y-1.5">
                  <label className="text-sm font-medium text-surface-300">{label}</label>
                  <div className="relative">
                    <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                    <input
                      type={type}
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      required
                      className="w-full pl-11 pr-4 py-3 bg-surface-800/50 border border-surface-600/50 rounded-xl text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              ))}

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-surface-300">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    required
                    className="w-full pl-11 pr-12 py-3 bg-surface-800/50 border border-surface-600/50 rounded-xl text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-surface-500 hover:text-surface-300 transition-colors">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Strength meter */}
                {form.password && (
                  <div className="mt-2 space-y-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength.score ? strength.color : 'bg-surface-700'}`} />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {CHECKS_LABELS.map(({ key, label }) => (
                        <div key={key} className="flex items-center gap-1.5">
                          {strength.checks[key]
                            ? <CheckCircle2 className="w-3 h-3 text-accent-400" />
                            : <XCircle className="w-3 h-3 text-surface-600" />
                          }
                          <span className={`text-xs ${strength.checks[key] ? 'text-accent-400' : 'text-surface-500'}`}>{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-surface-300">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat your password"
                    required
                    className={`w-full pl-11 pr-4 py-3 bg-surface-800/50 border rounded-xl text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                      form.confirmPassword && form.password !== form.confirmPassword
                        ? 'border-red-600/60 ring-1 ring-red-600/40'
                        : 'border-surface-600/50'
                    }`}
                  />
                </div>
                {form.confirmPassword && form.password !== form.confirmPassword && (
                  <p className="text-xs text-red-400">Passwords do not match</p>
                )}
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative mt-0.5">
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="sr-only" />
                  <div
                    onClick={() => setAgreed(!agreed)}
                    className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${agreed ? 'bg-primary-600 border-primary-600' : 'border-surface-600 hover:border-primary-500'}`}
                  >
                    {agreed && <span className="text-white text-xs">✓</span>}
                  </div>
                </div>
                <span className="text-sm text-surface-400">
                  I agree to the{' '}
                  <a href="#" className="text-primary-400 hover:text-primary-300">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-primary-400 hover:text-primary-300">Privacy Policy</a>
                </span>
              </label>

              <motion.button
                type="submit"
                disabled={loading || !agreed}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary py-3.5 text-base shadow-glow hover:shadow-glow-lg disabled:opacity-60 disabled:cursor-not-allowed mt-1"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Create Account <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
