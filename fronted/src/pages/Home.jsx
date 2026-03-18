import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const featuredProducts = [
  {
    id: "f1",
    name: "Caramel Latte",
    description: "Silky espresso, caramel drizzle, and steamed milk.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    price: 5.5
  },
  {
    id: "f2",
    name: "Vanilla Cold Brew",
    description: "Slow-steeped cold brew with vanilla cream foam.",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
    price: 6.25
  },
  {
    id: "f3",
    name: "Hazelnut Cappuccino",
    description: "Double shot espresso with hazelnut-infused foam.",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
    price: 4.95
  }
];

function Home({ onAddToCart }) {
  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80"
          alt="Cafe interior"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-coffee-900/65" />
        <div className="mx-auto max-w-6xl px-4 py-24 text-cream sm:px-6 md:py-32">
          <p className="mb-4 inline-block rounded-full bg-cream/20 px-4 py-1 text-xs uppercase tracking-[0.2em]">
            Artisan Coffee Since 2012
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            A warm corner for bold brews and calm mornings.
          </h1>
          <p className="mt-6 max-w-xl text-sm text-coffee-100 sm:text-base">
            Discover signature blends, hand-poured classics, and desserts crafted fresh every day.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/menu"
              className="rounded-xl bg-cream px-6 py-3 text-sm font-semibold text-coffee-900 transition hover:bg-coffee-100"
            >
              Explore Menu
            </Link>
            <Link
              to="/reservation"
              className="rounded-xl border border-cream/80 px-6 py-3 text-sm font-semibold text-cream transition hover:bg-cream/10"
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-coffee-900 sm:text-3xl">Featured Brews</h2>
          <Link to="/menu" className="text-sm font-semibold text-coffee-700 hover:text-mocha">
            View full menu
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 sm:px-6 md:grid-cols-2 md:items-center">
        <div className="soft-card p-8">
          <h3 className="text-2xl font-bold text-coffee-900 sm:text-3xl">About Bean & Bloom</h3>
          <p className="mt-4 text-sm leading-relaxed text-coffee-700">
            We source premium beans from ethical farms and roast in small batches to protect flavor,
            aroma, and freshness. Whether you need a focused work session or a catch-up spot with
            friends, our cafe is designed to feel personal and inviting.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex rounded-xl bg-coffee-900 px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-mocha"
          >
            Connect With Us
          </Link>
        </div>
        <div className="relative h-80 overflow-hidden rounded-3xl shadow-soft">
          <img
            src="https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=1200&q=80"
            alt="Barista preparing coffee"
            className="h-full w-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}

export default Home;
