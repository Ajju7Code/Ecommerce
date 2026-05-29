import { motion } from 'framer-motion';

export const ProductCardSkeleton = () => (
  <div className="card overflow-hidden">
    <div className="aspect-square skeleton" />
    <div className="p-4 space-y-3">
      <div className="h-3 skeleton rounded w-1/3" />
      <div className="h-4 skeleton rounded w-3/4" />
      <div className="h-3 skeleton rounded w-1/2" />
      <div className="flex justify-between items-center pt-1">
        <div className="h-5 skeleton rounded w-16" />
        <div className="h-4 skeleton rounded w-12" />
      </div>
    </div>
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
    <div className="space-y-4">
      <div className="aspect-square skeleton rounded-3xl" />
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="aspect-square skeleton rounded-2xl" />
        ))}
      </div>
    </div>
    <div className="space-y-5">
      <div className="h-4 skeleton rounded w-1/4" />
      <div className="h-8 skeleton rounded w-3/4" />
      <div className="h-6 skeleton rounded w-1/3" />
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-4 skeleton rounded" />
        ))}
      </div>
      <div className="h-12 skeleton rounded-xl" />
    </div>
  </div>
);

export const OrderCardSkeleton = () => (
  <div className="card p-6 space-y-4">
    <div className="flex justify-between">
      <div className="h-5 skeleton rounded w-1/4" />
      <div className="h-6 skeleton rounded-full w-20" />
    </div>
    <div className="space-y-2">
      <div className="h-4 skeleton rounded w-1/2" />
      <div className="h-4 skeleton rounded w-1/3" />
    </div>
    <div className="h-10 skeleton rounded-xl w-1/3" />
  </div>
);

export const TableRowSkeleton = ({ cols = 4 }) => (
  <tr>
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-4 py-3">
        <div className="h-4 skeleton rounded" />
      </td>
    ))}
  </tr>
);

export const ProductGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.05 }}
      >
        <ProductCardSkeleton />
      </motion.div>
    ))}
  </div>
);

export const ProfileSkeleton = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <div className="w-20 h-20 skeleton rounded-2xl" />
      <div className="space-y-2">
        <div className="h-6 skeleton rounded w-32" />
        <div className="h-4 skeleton rounded w-48" />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-3 skeleton rounded w-1/4" />
          <div className="h-10 skeleton rounded-xl" />
        </div>
      ))}
    </div>
  </div>
);

export default {
  ProductCardSkeleton,
  ProductDetailSkeleton,
  OrderCardSkeleton,
  TableRowSkeleton,
  ProductGridSkeleton,
  ProfileSkeleton,
};
