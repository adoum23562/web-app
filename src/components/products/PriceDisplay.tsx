import { formatPrice } from '@/lib/utils';

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCurrency?: boolean;
}

export default function PriceDisplay({
  price,
  originalPrice,
  size = 'md',
  showCurrency = true,
}: PriceDisplayProps) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="flex items-center gap-3">
      <span className={`font-bold text-primary-600 ${sizes[size]}`}>
        {showCurrency ? formatPrice(price) : price.toLocaleString()}
      </span>

      {hasDiscount && (
        <>
          <span className="text-gray-400 line-through text-lg">
            {showCurrency ? formatPrice(originalPrice) : originalPrice.toLocaleString()}
          </span>
          <span className="bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded">
            -{discountPercentage}%
          </span>
        </>
      )}
    </div>
  );
}
