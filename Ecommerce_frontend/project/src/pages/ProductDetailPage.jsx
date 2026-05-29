import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Truck, Shield, RotateCcw, ChevronRight, Minus, Plus, Share2 } from 'lucide-react';
import { ProductDetailSkeleton } from '../components/Skeleton';
import ProductCard from '../components/ProductCard';
import useCart from '../hooks/useCart';
import productService from '../services/productService';

const MOCK_PRODUCTS = Array.from({ length: 4 }, (_, i) => ({
  id: i + 100,
  name: ['Premium Wireless Headphones', 'Luxury Leather Watch', 'Minimalist Sneakers', 'Designer Sunglasses'][i],
  price: [299.99, 599.99, 189.99, 249.99][i],
  category: ['Electronics', 'Fashion', 'Footwear', 'Fashion'][i],
  image: [
    'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg?auto=compress&cs=tinysrgb&w=600',
  ][i],
  rating: (4 + Math.random()).toFixed(1),
  reviews: Math.floor(Math.random() * 200 + 20),
}));

const MOCK_PRODUCT = {
  id: 1,
  name: 'Premium Wireless Headphones Pro',
  price: 299.99,
  originalPrice: 399.99,
  category: 'Electronics',
  description: 'Experience audio perfection with our flagship wireless headphones. Featuring advanced noise cancellation, 40-hour battery life, and premium leather ear cushions. The epitome of acoustic engineering meets luxury design.',
  features: ['Active Noise Cancellation', '40-hour battery life', 'Bluetooth 5.3', 'Premium leather cushions', 'Foldable design', 'Hi-Res Audio certified'],
  images: [
    'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800',
  ],
  rating: 4.8,
  reviews: 342,
  stock: 12,
  isNew: true,
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    setLoading(true);
    productService.getProducts()
      .then((data) => {
        const found = data.find(p => p.id === parseInt(id));
        setProduct(found || MOCK_PRODUCT);
        setRelated(data.slice(0, 4));
      })
      .catch(() => {
        setProduct(MOCK_PRODUCT);
        setRelated(MOCK_PRODUCTS);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addItem({ ...product, quantity });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const images = product?.images || [product?.imageUrl || product?.image || MOCK_PRODUCT.images[0]];

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-surface-950 pt-28 pb-20">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <ProductDetailSkeleton />
        </div>
      </div>
    );
  }

  const p = product || MOCK_PRODUCT;
  const discount = p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : null;

  return (
    <div className="min-h-screen bg-white dark:bg-surface-950 pt-20">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400 mb-8">
          <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/products" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-surface-900 dark:text-white font-medium truncate max-w-xs">{p.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
          {/* Image Gallery */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="relative rounded-3xl overflow-hidden bg-surface-100 dark:bg-surface-800 aspect-square mb-4 group">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={images[selectedImage]}
                alt={p.name}
                className="w-full h-full object-cover"
              />
              {discount && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-xl shadow-md">
                  -{discount}%
                </div>
              )}
              <button
                onClick={() => setLiked(!liked)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center shadow-md backdrop-blur-sm transition-all ${
                  liked ? 'bg-red-500 text-white' : 'bg-white/90 dark:bg-surface-800/90 text-surface-600 hover:bg-red-500 hover:text-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              </button>
              <button className="absolute bottom-4 right-4 w-10 h-10 rounded-xl bg-white/90 dark:bg-surface-800/90 text-surface-600 dark:text-surface-300 flex items-center justify-center shadow-md backdrop-blur-sm hover:bg-primary-600 hover:text-white transition-all">
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square rounded-2xl overflow-hidden ring-2 transition-all ${
                      selectedImage === i ? 'ring-primary-600 shadow-glow' : 'ring-transparent hover:ring-surface-300 dark:hover:ring-surface-600'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex flex-col">
            {p.category && (
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-widest mb-2">
                {p.category}
              </span>
            )}
            <h1 className="text-3xl lg:text-4xl font-bold text-surface-900 dark:text-white mb-4 leading-tight">
              {p.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`w-4 h-4 ${s <= Math.round(Number(p.rating)) ? 'text-gold-400 fill-current' : 'text-surface-300 dark:text-surface-600'}`} />
                ))}
              </div>
              <span className="text-sm font-semibold text-surface-900 dark:text-white">{p.rating}</span>
              <span className="text-sm text-surface-500 dark:text-surface-400">({p.reviews} reviews)</span>
              {p.isNew && <span className="badge bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300">New Arrival</span>}
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-surface-200 dark:border-surface-700">
              <span className="text-4xl font-bold text-surface-900 dark:text-white">
                ${Number(p.price).toFixed(2)}
              </span>
              {p.originalPrice && (
                <div className="flex flex-col">
                  <span className="text-xl text-surface-400 line-through">${Number(p.originalPrice).toFixed(2)}</span>
                  <span className="text-sm text-red-500 font-semibold">Save {discount}%</span>
                </div>
              )}
            </div>

            {/* Description */}
            {p.description && (
              <p className="text-surface-600 dark:text-surface-300 leading-relaxed mb-6">
                {p.description}
              </p>
            )}

            {/* Features */}
            {p.features && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-surface-900 dark:text-white uppercase tracking-widest mb-3">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stock Status */}
            {p.stock !== undefined && (
              <div className="mb-6">
                {p.stock > 5 ? (
                  <span className="badge-success">In Stock</span>
                ) : p.stock > 0 ? (
                  <span className="badge-warning">Only {p.stock} left!</span>
                ) : (
                  <span className="badge-error">Out of Stock</span>
                )}
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-surface-100 dark:bg-surface-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 flex items-center justify-center text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold text-surface-900 dark:text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 flex items-center justify-center text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                disabled={p.stock === 0}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-base transition-all duration-300 ${
                  addedToCart
                    ? 'bg-accent-600 text-white shadow-md'
                    : 'btn-primary shadow-glow hover:shadow-glow-lg'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <ShoppingCart className="w-5 h-5" />
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-surface-200 dark:border-surface-700">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'Orders over $50' },
                { icon: Shield, label: 'Secure Payment', sub: '256-bit SSL' },
                { icon: RotateCcw, label: 'Easy Returns', sub: '30 day policy' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center p-3 rounded-xl bg-surface-50 dark:bg-surface-800">
                  <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400 mb-1.5" />
                  <p className="text-xs font-semibold text-surface-900 dark:text-white">{label}</p>
                  <p className="text-xs text-surface-500 dark:text-surface-400">{sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-surface-900 dark:text-white">Related Products</h2>
              <Link to="/products" className="text-primary-600 dark:text-primary-400 font-medium hover:underline text-sm">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.slice(0, 4).map((rp, i) => (
                <ProductCard key={rp.id} product={rp} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
