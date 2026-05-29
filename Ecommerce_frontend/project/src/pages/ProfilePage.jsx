import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Camera, Save, Lock, Bell, Shield, Package } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

const ProfilePage = () => {
  const { user } = useSelector((s) => s.auth);
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    bio: '',
  });
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    newArrivals: false,
    promotions: true,
    newsletter: false,
  });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    toast.success('Profile updated successfully!', { style: { borderRadius: '12px', background: '#1e293b', color: '#f1f5f9' } });
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const initials = (user?.username || user?.email || 'U').charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 pt-20 pb-16">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-surface-900 dark:text-white">My Profile</h1>
          <p className="text-surface-500 dark:text-surface-400 mt-1">Manage your account settings and preferences</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-4"
          >
            {/* Avatar Card */}
            <div className="card p-6 text-center">
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-700 flex items-center justify-center text-white text-3xl font-bold shadow-glow">
                  {initials}
                </div>
                <button className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-primary-600 hover:bg-primary-700 rounded-xl flex items-center justify-center text-white shadow-md transition-colors">
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              <h3 className="font-bold text-surface-900 dark:text-white">{user?.username || 'User'}</h3>
              <p className="text-sm text-surface-500 dark:text-surface-400 truncate">{user?.email}</p>
              {user?.role && (
                <span className="mt-2 inline-flex badge-info capitalize">{user.role.toLowerCase()}</span>
              )}
            </div>

            {/* Quick Links */}
            <div className="card p-3">
              <Link to="/orders" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors text-sm font-medium">
                <Package className="w-4 h-4 text-primary-600" />
                My Orders
              </Link>
              <Link to="/cart" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors text-sm font-medium">
                <Shield className="w-4 h-4 text-primary-600" />
                Shopping Cart
              </Link>
            </div>

            {/* Tab Nav */}
            <div className="card p-3">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === id
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-3"
          >
            {activeTab === 'profile' && (
              <div className="card p-6 sm:p-8">
                <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-6">Personal Information</h2>
                <form onSubmit={handleSave} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Username</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                        <input name="username" value={form.username} onChange={handleChange} type="text" className="input-field pl-10" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                        <input name="email" value={form.email} onChange={handleChange} type="email" className="input-field pl-10" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                        <input name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="+1 (555) 000-0000" className="input-field pl-10" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-surface-700 dark:text-surface-300">City</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                        <input name="city" value={form.city} onChange={handleChange} type="text" placeholder="New York" className="input-field pl-10" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-surface-400" />
                      <input name="address" value={form.address} onChange={handleChange} type="text" placeholder="123 Main St, Suite 100" className="input-field pl-10" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Bio</label>
                    <textarea
                      name="bio"
                      value={form.bio}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Tell us about yourself..."
                      className="input-field resize-none"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" disabled={saving} className="btn-primary">
                      {saving ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Saving...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Save className="w-4 h-4" />
                          Save Changes
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="card p-6 sm:p-8">
                <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-6">Security Settings</h2>
                <form className="space-y-5">
                  {[
                    { label: 'Current Password', placeholder: 'Enter current password' },
                    { label: 'New Password', placeholder: 'Enter new password' },
                    { label: 'Confirm New Password', placeholder: 'Repeat new password' },
                  ].map(({ label, placeholder }) => (
                    <div key={label} className="space-y-1.5">
                      <label className="text-sm font-medium text-surface-700 dark:text-surface-300">{label}</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                        <input type="password" placeholder={placeholder} className="input-field pl-10" />
                      </div>
                    </div>
                  ))}
                  <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                    <h4 className="text-sm font-semibold text-primary-700 dark:text-primary-300 mb-2">Password Requirements</h4>
                    <ul className="space-y-1 text-xs text-primary-600 dark:text-primary-400">
                      {['At least 8 characters', 'One uppercase letter', 'One number', 'One special character'].map(req => (
                        <li key={req} className="flex items-center gap-1.5"><span>•</span>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-end">
                    <button type="button" onClick={() => toast.success('Password updated!')} className="btn-primary">
                      <Lock className="w-4 h-4" /> Update Password
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="card p-6 sm:p-8">
                <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { key: 'orderUpdates', label: 'Order Updates', desc: 'Get notified about your order status changes' },
                    { key: 'newArrivals', label: 'New Arrivals', desc: 'Be the first to know about new products' },
                    { key: 'promotions', label: 'Promotions & Deals', desc: 'Receive exclusive offers and discounts' },
                    { key: 'newsletter', label: 'Newsletter', desc: 'Weekly curated content and style guides' },
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-surface-50 dark:bg-surface-800/50">
                      <div>
                        <p className="font-semibold text-surface-900 dark:text-white text-sm">{label}</p>
                        <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">{desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications(n => ({ ...n, [key]: !n[key] }))}
                        className={`relative w-11 h-6 rounded-full transition-all flex-shrink-0 ${notifications[key] ? 'bg-primary-600' : 'bg-surface-300 dark:bg-surface-600'}`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifications[key] ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-6">
                  <button onClick={() => toast.success('Preferences saved!')} className="btn-primary">
                    <Save className="w-4 h-4" /> Save Preferences
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
