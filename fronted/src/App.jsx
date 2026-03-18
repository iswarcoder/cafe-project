import { Route, Routes } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reservation from "./pages/Reservation";
import Contact from "./pages/Contact";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cafe_cart");
    if (!savedCart) {
      return [];
    }

    try {
      const parsed = JSON.parse(savedCart);
      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed
        .map((item) => {
          const resolvedId = item.id || item._id;
          const resolvedQuantity = Number(item.quantity);
          return {
            ...item,
            id: resolvedId,
            quantity: Number.isFinite(resolvedQuantity) && resolvedQuantity > 0 ? resolvedQuantity : 1
          };
        })
        .filter((item) => Boolean(item.id));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cafe_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    [cartItems]
  );

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const productId = product.id || product._id;
      const existingItem = prevItems.find((item) => (item.id || item._id) === productId);
      if (existingItem) {
        return prevItems.map((item) =>
          (item.id || item._id) === productId
            ? { ...item, quantity: Number(item.quantity || 0) + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, id: productId, quantity: 1 }];
    });
  };

  const updateQuantity = (id, direction) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if ((item.id || item._id) !== id) return item;
          const currentQty = Number(item.quantity || 0);
          const nextQty = direction === "increase" ? currentQty + 1 : currentQty - 1;
          return { ...item, quantity: nextQty };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <div className="min-h-screen bg-cream text-coffee-900">
      <Navbar cartCount={cartCount} />
      <main>
        <Routes>
          <Route path="/" element={<Home onAddToCart={addToCart} />} />
          <Route path="/menu" element={<Menu onAddToCart={addToCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
                onClearCart={clearCart}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
