import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Star, Zap, Shield, Truck, RotateCcw, ChevronRight, Quote } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/Skeleton';
import productService from '../services/productService';

const CATEGORIES = [
  { name: 'Electronics', icon: '⚡', color: 'from-blue-500 to-blue-700', image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Fashion', icon: '👗', color: 'from-rose-500 to-pink-700', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Home & Living', icon: '🏡', color: 'from-amber-500 to-orange-600', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Sports', icon: '🏃', color: 'from-emerald-500 to-green-700', image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

const TESTIMONIALS = [
  { name: 'Sarah Johnson', role: 'Verified Buyer', text: 'Absolutely love the quality of products. The checkout experience is seamless and delivery was super fast!', rating: 5, avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100' },
  { name: 'Marcus Chen', role: 'Premium Member', text: 'LUXA has completely changed how I shop online. The curation is impeccable and the UI is gorgeous.', rating: 5, avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100' },
  { name: 'Emma Williams', role: 'Verified Buyer', text: 'World-class customer service and products that exceed expectations every single time. Highly recommended!', rating: 5, avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100' },
];

const FEATURES = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50. Fast and reliable delivery.' },
  { icon: Shield, title: 'Secure Payment', desc: '256-bit SSL encryption. Your data is safe.' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '30-day no-questions-asked return policy.' },
  { icon: Zap, title: 'Express Delivery', desc: 'Next-day delivery available on select items.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getProducts({ limit: 8 })
      .then(setProducts)
      .catch(() => {
        setProducts(MOCK_PRODUCTS);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="dark:bg-surface-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-surface-950">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-600/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-900/30 rounded-full blur-3xl" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="container-max px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-900/50 border border-primary-700/50 text-primary-300 text-sm font-medium mb-6 backdrop-blur-sm"
              >
                <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                Premium Collection 2025
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 text-balance">
                Shop the
                <span className="block gradient-text">Future of</span>
                Luxury
              </h1>

              <p className="text-surface-400 text-lg leading-relaxed mb-8 max-w-lg">
                Discover curated collections that blend premium craftsmanship with modern design. Every item, a statement of excellence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/products" className="btn-primary text-base py-4 px-8 shadow-glow-lg">
                  Shop Now <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/products?sale=true" className="btn-ghost text-base py-4 px-8 border border-surface-700 text-surface-300 hover:border-primary-600">
                  View Sales
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {[['50K+', 'Happy Customers'], ['10K+', 'Products'], ['4.9★', 'Average Rating']].map(([stat, label]) => (
                  <div key={label}>
                    <p className="text-2xl font-bold text-white">{stat}</p>
                    <p className="text-surface-500 text-sm">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <div className="aspect-square max-w-lg mx-auto">
                  <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-premium">
                    <img
                      src="https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Premium Products"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-transparent" />
                  </div>

                  {/* Floating Card */}
                  <motion.div
                    animate={{ y: [-8, 8, -8] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -bottom-6 -left-6 glass-card p-4 rounded-2xl shadow-premium"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-accent-500" />
                      </div>
                      <div>
                        <p className="text-xs text-surface-500 dark:text-surface-400">Just ordered</p>
                        <p className="text-sm font-semibold text-surface-900 dark:text-white">Premium Jacket</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [8, -8, 8] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute -top-6 -right-6 glass-card p-4 rounded-2xl shadow-premium"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3 h-3 text-gold-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs font-semibold text-surface-900 dark:text-white">4.9/5 Rating</p>
                    <p className="text-xs text-surface-500">50K+ reviews</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-12 bg-surface-50 dark:bg-surface-900 border-y border-surface-200 dark:border-surface-800">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} variants={itemVariants} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-surface-900 dark:text-white text-sm">{title}</h4>
                  <p className="text-surface-500 dark:text-surface-400 text-xs mt-0.5">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding bg-white dark:bg-surface-950">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-widest">Browse</span>
            <h2 className="text-4xl font-bold text-surface-900 dark:text-white mt-2">Shop by Category</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            {CATEGORIES.map((cat) => (
              <motion.div key={cat.name} variants={itemVariants}>
                <Link
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="group relative block aspect-[3/4] rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
                >
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-60 group-hover:opacity-70 transition-opacity`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-6 pb-8">
                    <span className="text-3xl mb-2">{cat.icon}</span>
                    <h3 className="text-white font-bold text-lg text-center">{cat.name}</h3>
                    <div className="flex items-center gap-1 mt-2 text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Shop now <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-surface-50 dark:bg-surface-900">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-widest">Featured</span>
              <h2 className="text-4xl font-bold text-surface-900 dark:text-white mt-2">Trending Now</h2>
            </div>
            <Link to="/products" className="hidden sm:flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all duration-200">
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.slice(0, 8).map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/products" className="btn-secondary">
              Explore All Products <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Promo"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-950 via-surface-950/80 to-surface-950/40" />
        </div>
        <div className="container-max relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <span className="text-gold-400 font-bold text-sm uppercase tracking-widest">Limited Offer</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
              Up to <span className="gradient-text-gold">50% Off</span>
              <br />Summer Collection
            </h2>
            <p className="text-surface-400 text-lg mb-8">Don't miss out on our biggest sale of the year. Limited time only.</p>
            <Link to="/products?sale=true" className="btn-gold text-base py-4 px-8">
              Shop the Sale <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white dark:bg-surface-950">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-widest">Testimonials</span>
            <h2 className="text-4xl font-bold text-surface-900 dark:text-white mt-2">What Customers Say</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {TESTIMONIALS.map((t) => (
              <motion.div key={t.name} variants={itemVariants} className="card-hover p-6 lg:p-8">
                <Quote className="w-8 h-8 text-primary-300 dark:text-primary-600 mb-4" />
                <p className="text-surface-600 dark:text-surface-300 leading-relaxed mb-6">{t.text}</p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-400 fill-current" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <p className="font-semibold text-surface-900 dark:text-white text-sm">{t.name}</p>
                    <p className="text-surface-500 dark:text-surface-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const MOCK_PRODUCTS = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: ['Premium Wireless Headphones', 'Luxury Leather Watch', 'Minimalist Sneakers', 'Designer Sunglasses', 'Silk Blend Shirt', 'Carbon Fiber Wallet', 'Smart Home Speaker', 'Premium Backpack'][i],
  price: [299.99, 599.99, 189.99, 249.99, 129.99, 89.99, 349.99, 179.99][i],
  originalPrice: [399.99, null, 239.99, null, 169.99, 119.99, null, 229.99][i],
  category: ['Electronics', 'Fashion', 'Footwear', 'Fashion', 'Apparel', 'Accessories', 'Electronics', 'Bags'][i],
  image: [
    'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/4790268/pexels-photo-4790268.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600',
  ][i],
  isNew: i % 3 === 0,
  rating: (4 + Math.random()).toFixed(1),
  reviews: Math.floor(Math.random() * 200 + 20),
}));

export default HomePage;
