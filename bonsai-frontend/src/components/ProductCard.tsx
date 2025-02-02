// src/components/ProductCard.tsx
import { Product } from '@/types/product';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      {product.image && (
        <div className="relative h-48">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold">${product.price}</span>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}