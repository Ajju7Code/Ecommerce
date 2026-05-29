import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown, Grid3X3, List, ArrowUpDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/Skeleton';
import productService from '../services/productService';

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Footwear', 'Accessories', 'Apparel', 'Bags', 'Home & Living', 'Sports'];
const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' },
];

const MOCK_PRODUCTS = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  name: ['Premium Wireless Headphones', 'Luxury Leather Watch', 'Minimalist Sneakers', 'Designer Sunglasses', 'Silk Blend Shirt', 'Carbon Fiber Wallet', 'Smart Home Speaker', 'Premium Backpack', 'Ceramic Coffee Set', 'Running Shorts Pro', 'Titanium Pen', 'Wool Sweater', 'Smart Watch Series X', 'Leather Belt', 'Canvas Tote Bag', 'Bamboo Desk Organizer'][i],
  price: [299.99, 599.99, 189.99, 249.99, 129.99, 89.99, 349.99, 179.99, 79.99, 64.99, 149.99, 199.99, 499.99, 69.99, 89.99, 44.99][i],
  originalPrice: [399.99, null, 239.99, null, 169.99, 119.99, null, 229.99, null, 84.99, null, 249.99, 599.99, null, null, 59.99][i],
  category: ['Electronics', 'Fashion', 'Footwear', 'Fashion', 'Apparel', 'Accessories', 'Electronics', 'Bags', 'Home & Living', 'Sports', 'Accessories', 'Apparel', 'Electronics', 'Accessories', 'Bags', 'Home & Living'][i],
  image: [
    'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/4790268/pexels-photo-4790268.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/53621/calculator-calculation-insurance-finance-53621.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/5698854/pexels-photo-5698854.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/5632373/pexels-photo-5632373.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/6207366/pexels-photo-6207366.jpeg?auto=compress&cs=tinysrgb&w=600',
  ][i],
  isNew: i % 4 === 0,
  rating: (4 + Math.random() * 0.9).toFixed(1),
  reviews: Math.floor(Math.random() * 200 + 20),
  stock: i % 7 === 0 ? Math.floor(Math.random() * 5) + 1 : 20,
}));

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  useEffect(() => {
    setLoading(true);
    productService.getProducts({
      search: searchParams.get('search') || '',
      category: selectedCategory !== 'All' ? selectedCategory : '',
    })
      .then(setProducts)
      .catch(() => setProducts(MOCK_PRODUCTS))
      .finally(() => setLoading(false));
  }, [selectedCategory, searchParams]);

  const filtered = useCallback(() => {
    let list = [...products];
    const q = searchInput.toLowerCase();
    if (q) list = list.filter(p => p.name?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q));
    if (selectedCategory !== 'All') list = list.filter(p => p.category === selectedCategory);
    list = list.filter(p => Number(p.price) >= priceRange[0] && Number(p.price) <= priceRange[1]);
    switch (sortBy) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'newest': list.sort((a, b) => b.id - a.id); break;
      case 'popular': list.sort((a, b) => Number(b.rating) - Number(a.rating)); break;
    }
    return list;
  }, [products, searchInput, selectedCategory, sortBy, priceRange]);

  const filteredProducts = filtered();
  const paginated = filteredProducts.slice(0, page * PER_PAGE);
  const hasMore = paginated.length < filteredProducts.length;

  return (
    <div className="min-h-screen bg-white dark:bg-surface-950 pt-20">
      {/* Page Header */}
      <div className="bg-surface-50 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-1">All Products</h1>
            <p className="text-surface-500 dark:text-surface-400">
              {loading ? 'Loading...' : `${filteredProducts.length} products found`}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products..."
              className="input-field pl-10"
            />
            {searchInput && (
              <button onClick={() => setSearchInput('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-surface-400 hover:text-surface-600" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative min-w-48">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field pl-10 appearance-none cursor-pointer"
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 pointer-events-none" />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border font-medium text-sm transition-all ${filtersOpen ? 'bg-primary-600 text-white border-primary-600' : 'bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-300 border-surface-200 dark:border-surface-600 hover:border-primary-600'}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

          {/* View Mode */}
          <div className="flex items-center gap-1 bg-surface-100 dark:bg-surface-800 rounded-xl p-1">
            {[['grid', Grid3X3], ['list', List]].map(([mode, Icon]) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`p-2 rounded-lg transition-all ${viewMode === mode ? 'bg-white dark:bg-surface-700 shadow-sm text-primary-600' : 'text-surface-500 hover:text-surface-700'}`}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mb-6"
            >
              <div className="card p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Categories */}
                  <div>
                    <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-3 uppercase tracking-widest">Category</h3>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                            selectedCategory === cat
                              ? 'bg-primary-600 text-white shadow-glow'
                              : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-3 uppercase tracking-widest">
                      Price: ${priceRange[0]} – ${priceRange[1]}
                    </h3>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="10"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full accent-primary-600"
                    />
                    <div className="flex justify-between text-xs text-surface-400 mt-1">
                      <span>$0</span><span>$1000+</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Pills (compact) */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all flex-shrink-0 ${
                selectedCategory === cat
                  ? 'bg-primary-600 text-white shadow-glow'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <ProductGridSkeleton count={8} />
        ) : filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">No products found</h3>
            <p className="text-surface-500 dark:text-surface-400">Try adjusting your filters or search term.</p>
            <button onClick={() => { setSearchInput(''); setSelectedCategory('All'); }} className="btn-primary mt-6">
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className={viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'flex flex-col gap-4'
            }
          >
            {paginated.map((p, i) => (
              viewMode === 'grid' ? (
                <ProductCard key={p.id} product={p} index={i} />
              ) : (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="card-hover p-4 flex gap-4"
                >
                  <img src={p.image || p.imageUrl} alt={p.name} className="w-24 h-24 rounded-2xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-widest">{p.category}</span>
                    <h3 className="font-semibold text-surface-900 dark:text-white mt-0.5 truncate">{p.name}</h3>
                    <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">Rating: {p.rating} ★ ({p.reviews} reviews)</p>
                  </div>
                  <div className="flex flex-col items-end justify-between flex-shrink-0">
                    <span className="text-lg font-bold text-surface-900 dark:text-white">${Number(p.price).toFixed(2)}</span>
                    <button onClick={() => {}} className="btn-primary text-sm py-2 px-4">Add to Cart</button>
                  </div>
                </motion.div>
              )
            ))}
          </motion.div>
        )}

        {/* Load More */}
        {hasMore && !loading && (
          <div className="text-center mt-10">
            <button onClick={() => setPage(p => p + 1)} className="btn-secondary">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
