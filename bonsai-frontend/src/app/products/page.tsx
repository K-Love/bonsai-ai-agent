// src/app/products/page.tsx
import { Product } from '@/types/product';

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">Bonsai Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Product grid will go here */}
      </div>
    </div>
  );
}