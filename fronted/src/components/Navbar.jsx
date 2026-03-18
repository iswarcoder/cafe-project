import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaMugHot } from "react-icons/fa";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/menu", label: "Menu" },
  { path: "/reservation", label: "Reservation" },
  { path: "/contact", label: "Contact" },
  { path: "/cart", label: "Cart" }
];

function Navbar({ cartCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const displayUserId = user?.id || user?._id || "";

  const navLinkClass = ({ isActive }) =>
    `transition-colors duration-300 ${isActive ? "text-mocha" : "text-coffee-900 hover:text-mocha"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-coffee-100 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-coffee-900">
          <FaMugHot className="text-xl text-mocha" />
          <span className="text-lg font-bold tracking-wide sm:text-xl">Bean & Bloom</span>
        </Link>

        <button
          type="button"
          className="text-coffee-900 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <HiXMark className="text-2xl" /> : <HiBars3 className="text-2xl" />}
        </button>

        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={navLinkClass}>
              {item.label}
              {item.label === "Cart" && cartCount > 0 && (
                <span className="ml-1 rounded-full bg-coffee-900 px-2 py-0.5 text-xs text-cream">
                  {cartCount}
                </span>
              )}
            </NavLink>
          ))}

          {!isAuthenticated && (
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
          )}

          {isAuthenticated && (
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-coffee-200 bg-white px-3 py-1.5 text-xs text-coffee-800">
                <span className="font-semibold">{user?.name || "User"}</span>
                {displayUserId ? <span className="ml-2">ID: {displayUserId}</span> : null}
              </div>
              <button
                type="button"
                onClick={logout}
                className="rounded-lg border border-coffee-300 px-3 py-1.5 text-xs text-coffee-800 transition hover:border-mocha hover:text-mocha"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>

      {isOpen && (
        <nav className="space-y-3 border-t border-coffee-100 px-4 py-4 md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block rounded-lg px-2 py-2 text-base font-semibold transition-colors duration-300 ${
                  isActive ? "bg-coffee-100 text-mocha" : "text-coffee-900 hover:bg-coffee-50 hover:text-mocha"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {item.label}
              {item.label === "Cart" && cartCount > 0 && (
                <span className="ml-2 rounded-full bg-coffee-900 px-2 py-0.5 text-xs text-cream">
                  {cartCount}
                </span>
              )}
            </NavLink>
          ))}

          {!isAuthenticated && (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `block rounded-lg px-2 py-2 text-base font-semibold transition-colors duration-300 ${
                  isActive ? "bg-coffee-100 text-mocha" : "text-coffee-900 hover:bg-coffee-50 hover:text-mocha"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Login
            </NavLink>
          )}

          {isAuthenticated && (
            <div className="space-y-2 rounded-xl border border-coffee-200 bg-white p-3 text-xs text-coffee-800">
              <p className="font-semibold">{user?.name || "User"}</p>
              {displayUserId ? <p>ID: {displayUserId}</p> : null}
              <button
                type="button"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="rounded-lg border border-coffee-300 px-3 py-1.5 text-xs text-coffee-800 transition hover:border-mocha hover:text-mocha"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
