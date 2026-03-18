import { useState } from "react";
import api from "../services/api";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    try {
      await api.post("/api/contact", formData);
      setStatus({ type: "success", message: "Message sent. We will get back to you soon." });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.response?.data?.message || "Failed to send message."
      });
    }
  };

  return (
    <section className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <div className="soft-card p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-coffee-900 sm:text-3xl">Contact Us</h1>
        <p className="mt-2 text-sm text-coffee-700">
          Questions, custom orders, or event inquiries. We would love to hear from you.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-coffee-200 px-4 py-3 text-sm outline-none transition focus:border-mocha"
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-coffee-200 px-4 py-3 text-sm outline-none transition focus:border-mocha"
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Write your message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-coffee-200 px-4 py-3 text-sm outline-none transition focus:border-mocha"
          />

          {status.message ? (
            <p className={`text-sm ${status.type === "success" ? "text-green-700" : "text-red-600"}`}>
              {status.message}
            </p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-xl bg-coffee-900 px-4 py-3 text-sm font-semibold text-cream transition hover:bg-mocha"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
