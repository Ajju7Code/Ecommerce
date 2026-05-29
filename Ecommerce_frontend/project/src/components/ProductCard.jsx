import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import useCart from '../hooks/useCart';

const ProductCard = ({ product, index = 0 }) => {
  const { addItem } = useCart();
  const [liked, setLiked] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addItem(product);
    setTimeout(() => setAdding(false), 1200);
  };

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  };

  const rating = product.rating || (4 + Math.random()).toFixed(1);
  const reviews = product.reviews || Math.floor(Math.random() * 200 + 20);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="card overflow-hidden cursor-pointer">
          {/* Image Container */}
          <div className="relative overflow-hidden bg-surface-100 dark:bg-surface-700 aspect-square">
            <img
              src={product.imageUrl || product.image || `https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600`}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />

            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {discount && (
                <span className="badge bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
                  -{discount}%
                </span>
              )}
              {product.isNew && (
                <span className="badge bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
                  NEW
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
              <button
                onClick={toggleLike}
                className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-md backdrop-blur-sm transition-all duration-200 ${
                  liked
                    ? 'bg-red-500 text-white'
                    : 'bg-white/90 dark:bg-surface-800/90 text-surface-600 dark:text-surface-300 hover:bg-red-500 hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
              </button>
              <Link
                to={`/products/${product.id}`}
                onClick={(e) => e.stopPropagation()}
                className="w-9 h-9 rounded-xl bg-white/90 dark:bg-surface-800/90 text-surface-600 dark:text-surface-300 hover:bg-primary-600 hover:text-white flex items-center justify-center shadow-md backdrop-blur-sm transition-all duration-200"
              >
                <Eye className="w-4 h-4" />
              </Link>
            </div>

            {/* Add to Cart - Bottom Overlay */}
            <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className={`w-full py-3 flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 ${
                  adding
                    ? 'bg-accent-600 text-white'
                    : 'bg-primary-600 hover:bg-primary-700 text-white'
                }`}
              >
                {adding ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    Added!
                  </motion.div>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            {product.category && (
              <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-widest">
                {product.category}
              </span>
            )}
            <h3 className="text-surface-900 dark:text-white font-semibold text-sm mt-1 mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${
                      star <= Math.round(Number(rating))
                        ? 'text-gold-400 fill-current'
                        : 'text-surface-300 dark:text-surface-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-surface-500 dark:text-surface-400">
                {rating} ({reviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-surface-900 dark:text-white">
                  ${Number(product.price || 0).toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-surface-400 line-through">
                    ${Number(product.originalPrice).toFixed(2)}
                  </span>
                )}
              </div>
              {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
                <span className="text-xs font-medium text-gold-600 dark:text-gold-400">
                  Only {product.stock} left
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
