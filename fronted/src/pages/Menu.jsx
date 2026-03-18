import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import api from "../services/api";

const fallbackMenu = [
  {
    id: 1,
    name: "Espresso Shot",
    description: "Strong and rich single-origin espresso.",
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
    price: 3.5
  },
  {
    id: 2,
    name: "Mocha Delight",
    description: "Espresso with dark chocolate and creamy milk.",
    image:
      "https://images.unsplash.com/photo-1494314671902-399b18174975?auto=format&fit=crop&w=900&q=80",
    price: 5.75
  },
  {
    id: 3,
    name: "Iced Americano",
    description: "Refreshing chilled americano with citrus notes.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    price: 4.25
  },
  {
    id: 4,
    name: "Cappuccino Classic",
    description: "Balanced espresso with velvety steamed milk foam.",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
    price: 4.75
  },
  {
    id: 5,
    name: "Vanilla Latte",
    description: "Smooth espresso latte infused with vanilla syrup.",
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=80",
    price: 5.25
  },
  {
    id: 6,
    name: "Caramel Macchiato",
    description: "Layered milk, espresso, and caramel drizzle.",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80",
    price: 5.5
  },
  {
    id: 7,
    name: "Hazelnut Cold Brew",
    description: "Slow-steeped cold brew with toasted hazelnut notes.",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
    price: 4.95
  },
  {
    id: 8,
    name: "Hot Chocolate",
    description: "Rich cocoa blend topped with milk foam.",
    image:
      "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=900&q=80",
    price: 4.0
  },
  {
    id: 9,
    name: "Butter Croissant",
    description: "Freshly baked flaky croissant with buttery layers.",
    image:
      "https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=1200",
    price: 3.25
  },
  {
    id: 10,
    name: "Blueberry Muffin",
    description: "Moist muffin packed with juicy blueberries.",
    image:
      "https://images.unsplash.com/photo-1607478900766-efe13248b125?auto=format&fit=crop&w=900&q=80",
    price: 3.5
  },
  {
    id: 11,
    name: "Bagel Sandwich",
    description: "Toasted bagel with egg, cheese, and greens.",
    image:
      "https://images.unsplash.com/photo-1553787499-6f91332480ff?auto=format&fit=crop&w=900&q=80",
    price: 6.25
  },
  {
    id: 12,
    name: "Cafe Au Lait",
    description: "Dark roast coffee blended with steamed milk.",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80",
    price: 4.5
  }
];

function Menu({ onAddToCart }) {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await api.get("/api/menu");
        const items = Array.isArray(data) ? data : data.items || [];
        const normalizedItems = items.map((item) => ({
          ...item,
          id: item.id || item._id
        }));

        const supplementedItems = [
          ...normalizedItems,
          ...fallbackMenu.filter(
            (fallbackItem) =>
              !normalizedItems.some(
                (liveItem) =>
                  String(liveItem.id) === String(fallbackItem.id) ||
                  liveItem.name?.toLowerCase() === fallbackItem.name.toLowerCase()
              )
          )
        ].slice(0, 10);

        setMenuItems(supplementedItems);
      } catch {
        setError("Live menu could not be loaded. Showing cafe specials.");
        setMenuItems(fallbackMenu);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-coffee-900 sm:text-4xl">Our Menu</h1>
        <p className="mt-2 text-sm text-coffee-700">
          Handcrafted drinks and fresh bites prepared throughout the day.
        </p>
      </div>

      {isLoading ? <Loader message="Loading menu..." /> : null}

      {!isLoading && error ? (
        <p className="mb-6 rounded-xl bg-coffee-100 px-4 py-3 text-sm text-coffee-800">{error}</p>
      ) : null}

      {!isLoading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <ProductCard key={item.id} product={item} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Menu;
