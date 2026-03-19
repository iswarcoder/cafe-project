import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const email = formData.email.trim().toLowerCase();

    if (!email) {
      return "Enter your registered email address.";
    }

    if (formData.password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    if (!EMAIL_PATTERN.test(email)) {
      return "Enter a valid email address.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await login({
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      });
      setFormData({ email: "", password: "" });
      navigate("/");
    } catch (err) {
      setFormData((prev) => ({ ...prev, password: "" }));
      setError(
        err.response?.data?.message || "Login failed. Check your credentials and try again."
      );
    }
  };

  return (
    <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center px-4 py-8 sm:px-6 sm:py-14">
      <div className="soft-card w-full border border-coffee-100 p-5 shadow-md sm:p-8">
        <h1 className="text-2xl font-bold text-coffee-900 sm:text-3xl">Welcome Back</h1>
        <p className="mt-2 text-sm text-coffee-700">Log in with your registered email and password.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-coffee-800">Email address</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your registered email"
              value={formData.email}
              onChange={handleChange}
              required
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              inputMode="email"
              autoComplete="email"
              className="w-full rounded-xl border border-coffee-200 px-4 py-3 text-sm outline-none transition focus:border-mocha"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-coffee-800">Password</span>
            <div className="flex overflow-hidden rounded-xl border border-coffee-200 focus-within:border-mocha">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 text-sm outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="min-w-[4rem] px-4 text-xs font-semibold text-coffee-700 transition hover:text-coffee-900"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
          </label>

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
