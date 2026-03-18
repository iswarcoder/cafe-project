import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await login(formData);
      setFormData({ identifier: "", password: "" });
      navigate("/");
    } catch (err) {
      setFormData((prev) => ({ ...prev, password: "" }));
      setError(err.response?.data?.message || "Unable to log in. Please try again.");
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-14 sm:px-6">
      <div className="soft-card p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-coffee-900 sm:text-3xl">Welcome Back</h1>
        <p className="mt-2 text-sm text-coffee-700">Log in with your email or user ID.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="identifier"
            placeholder="Email or User ID"
            value={formData.identifier}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-coffee-200 px-4 py-3 text-sm outline-none transition focus:border-mocha"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-coffee-200 px-4 py-3 text-sm outline-none transition focus:border-mocha"
          />

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-coffee-900 px-4 py-3 text-sm font-semibold text-cream transition hover:bg-mocha disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-coffee-700">
          New here?{" "}
          <Link to="/register" className="font-semibold text-coffee-900 hover:text-mocha">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
