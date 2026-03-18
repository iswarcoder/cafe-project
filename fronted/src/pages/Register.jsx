import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await register(formData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to register. Please try again.");
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-14 sm:px-6">
      <div className="soft-card p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-coffee-900 sm:text-3xl">Create Account</h1>
        <p className="mt-2 text-sm text-coffee-700">Join Bean & Bloom for faster orders and updates.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-coffee-200 px-4 py-3 text-sm outline-none transition focus:border-mocha"
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
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
            {isLoading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-coffee-700">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-coffee-900 hover:text-mocha">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
