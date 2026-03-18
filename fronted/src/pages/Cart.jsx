import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Cart({ cartItems, onUpdateQuantity, onClearCart }) {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [orderError, setOrderError] = useState("");
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      setOrderError("Please log in first to place your order.");
      navigate("/login");
      return;
    }

    setOrderError("");
    setOrderMessage("");
    setIsOrdering(true);

    try {
      const items = cartItems
        .map((item) => {
          const itemId = item.id || item._id;
          const isObjectId = /^[a-fA-F0-9]{24}$/.test(String(itemId || ""));
          const safePrice = Number(item.price);
          const safeQuantity = Number(item.quantity);

          return {
            menuItem: isObjectId ? itemId : undefined,
            name: item.name,
            price: safePrice,
            quantity: safeQuantity,
            image: item.image
          };
        })
        .filter(
          (item) =>
            item.name &&
            Number.isFinite(item.price) &&
            item.price >= 0 &&
            Number.isFinite(item.quantity) &&
            item.quantity > 0
        );

      if (items.length === 0) {
        setOrderError("Your cart has invalid items. Please add products again.");
        return;
      }

      const computedTotal = Number(
        items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
      );

      await api.post("/api/orders", {
        items,
        totalPrice: computedTotal
      });

      setOrderMessage(
        `Order placed successfully for ${user?.name || "customer"}. Your order will be ready in 5 minutes, please wait.`
      );
      onClearCart();
    } catch (error) {
      if (error.response?.status === 401) {
        logout();
        navigate("/login");
      }
      setOrderError(error.response?.data?.message || "Unable to place order. Please try again.");
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold text-coffee-900 sm:text-4xl">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="mt-6 space-y-3">
          <p className="rounded-2xl bg-white p-8 text-center text-coffee-700 shadow-soft">
            Your cart is empty. Add your favorite coffee from the menu.
          </p>
          {orderMessage ? (
            <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">{orderMessage}</p>
          ) : null}
          {orderError ? (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{orderError}</p>
          ) : null}
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {cartItems.map((item) => (
            <article
              key={item.id || item._id || item.name}
              className="soft-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-full rounded-xl object-cover sm:w-32"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-coffee-900">{item.name}</h3>
                <p className="text-sm text-coffee-700">${Number(item.price).toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(item.id || item._id, "decrease")}
                  className="rounded-lg bg-coffee-100 px-3 py-1.5 text-coffee-900"
                >
                  -
                </button>
                <span className="w-8 text-center font-semibold text-coffee-900">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(item.id || item._id, "increase")}
                  className="rounded-lg bg-coffee-100 px-3 py-1.5 text-coffee-900"
                >
                  +
                </button>
              </div>
              <p className="min-w-20 text-right text-sm font-semibold text-coffee-800">
                ${(Number(item.price || 0) * Number(item.quantity || 0)).toFixed(2)}
              </p>
            </article>
          ))}

          <div className="soft-card mt-6 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xl font-bold text-coffee-900">Total: ${total.toFixed(2)}</p>
              {!isAuthenticated ? (
                <p className="mt-1 text-xs text-coffee-700">
                  Please <Link to="/login" className="font-semibold text-mocha">log in</Link> to place your order.
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isOrdering}
                className="w-full rounded-xl bg-mocha px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-coffee-900 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {isOrdering ? "Placing Order..." : "Place Order"}
              </button>
              <button
                type="button"
                onClick={onClearCart}
                className="w-full rounded-xl bg-coffee-900 px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-mocha sm:w-auto"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {orderMessage ? (
            <p className="mt-3 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">{orderMessage}</p>
          ) : null}

          {orderError ? (
            <p className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{orderError}</p>
          ) : null}
        </div>
      )}
    </section>
  );
}

export default Cart;
