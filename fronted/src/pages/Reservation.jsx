import { useEffect, useState } from "react";
import api from "../services/api";

function Reservation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    people: ""
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    if (status.type !== "success") {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      setStatus({ type: "", message: "" });
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    try {
      await api.post("/api/reservation", {
        name: formData.name,
        email: formData.email,
        date: formData.date,
        time: formData.time,
        numberOfPeople: Number(formData.people)
      });
      setStatus({
        type: "success",
        message: "Your table is reserved with you. Please wait for 5 minutes and enjoy."
      });
      setFormData({ name: "", email: "", date: "", time: "", people: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.response?.data?.message || "Reservation could not be submitted."
      });
    }
  };

  return (
    <section className="mx-auto max-w-xl px-4 py-14 sm:px-6">
      {status.type === "success" ? (
        <div className="fixed right-3 top-16 z-50 w-[calc(100vw-1.5rem)] max-w-[420px] rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-green-800 shadow-xl sm:right-4 sm:top-20">
          <div className="mb-1 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xl" aria-hidden="true">
              <span className="inline-block animate-bounce">🎉</span>
              <span className="inline-block animate-pulse">✅</span>
              <span className="inline-block animate-bounce">🍽️</span>
            </div>
            <button
              type="button"
              onClick={() => setStatus({ type: "", message: "" })}
              className="rounded-md px-2 py-1 text-xs font-semibold text-green-900 hover:bg-green-100"
            >
              Close
            </button>
          </div>
          <p className="text-sm font-medium" role="status" aria-live="polite">
            {status.message}
          </p>
        </div>
      ) : null}

      <div className="soft-card p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-coffee-900 sm:text-3xl">Reserve Your Table</h1>
        <p className="mt-2 text-sm text-coffee-700">Book your perfect coffee hour in advance.</p>

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
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-coffee-200 px-4 py-3 text-sm outline-none transition focus:border-mocha"
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-coffee-200 px-4 py-3 text-sm outline-none transition focus:border-mocha"
          />
          <input
            type="number"
            name="people"
            placeholder="Number of people"
            min="1"
            value={formData.people}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-coffee-200 px-4 py-3 text-sm outline-none transition focus:border-mocha"
          />

          {status.type === "error" && status.message ? (
            <p className="text-sm text-red-600">{status.message}</p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-xl bg-coffee-900 px-4 py-3 text-sm font-semibold text-cream transition hover:bg-mocha"
          >
            Confirm Reservation
          </button>
        </form>
      </div>
    </section>
  );
}

export default Reservation;
