import { useState } from "react";

const placeholderProductImage = "/images/product-placeholder.svg";

function ProductCard({ product, onAddToCart }) {
  const [imageSrc, setImageSrc] = useState(product.image || placeholderProductImage);

  return (
    <article className="soft-card group overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={imageSrc}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          onError={() => setImageSrc(placeholderProductImage)}
        />
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-coffee-900">{product.name}</h3>
          <span className="rounded-full bg-coffee-100 px-3 py-1 text-sm font-semibold text-coffee-800">
            ${Number(product.price).toFixed(2)}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-coffee-700">{product.description}</p>
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="w-full rounded-xl bg-coffee-900 px-4 py-2 text-sm font-semibold text-cream transition hover:bg-mocha"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
