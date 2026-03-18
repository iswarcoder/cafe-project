import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="mt-16 bg-coffee-900 text-coffee-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <h3 className="text-2xl font-bold">Bean & Bloom</h3>
          <p className="mt-3 text-sm leading-relaxed text-coffee-300">
            Handcrafted coffee, warm interiors, and a calm corner for your everyday pause.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold">Opening Hours</h4>
          <ul className="mt-3 space-y-2 text-sm text-coffee-300">
            <li>Mon - Fri: 7:00 AM - 10:00 PM</li>
            <li>Saturday: 8:00 AM - 11:00 PM</li>
            <li>Sunday: 8:00 AM - 9:00 PM</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold">Follow Us</h4>
          <div className="mt-4 flex gap-3 text-lg">
            <a href="#" className="rounded-full bg-coffee-700 p-2 transition hover:bg-mocha" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="rounded-full bg-coffee-700 p-2 transition hover:bg-mocha" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="rounded-full bg-coffee-700 p-2 transition hover:bg-mocha" aria-label="Twitter">
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>
      <p className="border-t border-coffee-700 py-4 text-center text-xs text-coffee-300">
        © {new Date().getFullYear()} Bean & Bloom Cafe. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
