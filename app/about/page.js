"use client";
export default function AboutPage() {
    return (
        <div className="max-w-5xl mx-auto p-6 lg:p-12">
            {/* Page Title */}
            <h1 className="text-3xl font-bold mb-6">About Buyio AG</h1>

            {/* Company Section */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-3">Company</h2>
                <p className="text-gray-700 leading-relaxed">
                    Buyio AG is one of Switzerland’s trusted multi-category retail platforms,
                    providing thousands of high-quality products at competitive prices.
                    Based in Zürich, Buyio is committed to making shopping fast, simple, and reliable.
                </p>
            </section>

            {/* History Section */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-3">History</h2>
                <p className="text-gray-700 leading-relaxed">
                    Founded in Zurich, Buyio AG started with a simple goal—bring convenience
                    to everyday shopping. Over the years, we expanded from a small local retailer
                    to a digital-first shopping platform serving customers across Switzerland.
                </p>
            </section>

            {/* Locations Section */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-3">Our Locations</h2>
                <p className="text-gray-700">
                    📍 <strong>Head Office:</strong> buyioagstrasse 1, 8000 Zürich
                </p>
                <p className="text-gray-700 mt-2">
                    Our service centers and pickup points are available in major Swiss cities
                    including Zurich, Bern, Basel, Geneva, and Lausanne.
                </p>
            </section>

            {/* Values / Mission */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed">
                    Our mission is to innovate retail with top-notch service, fast delivery,
                    and a customer-first approach. We focus on sustainability, transparency,
                    and long-term value for our customers and partners.
                </p>
            </section>

            {/* Contact Info */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-3">Contact & Customer Support</h2>
                <p className="text-gray-700">
                    Monday–Friday: <strong>08:00–17:00</strong>
                </p>
                <p className="text-gray-700 mt-2">
                    For support inquiries, visit our Help Center or contact us directly.
                </p>
            </section>

            {/* Legal */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-3">Legal & Policies</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Terms & Conditions</li>
                    <li>Privacy Policy</li>
                    <li>Legal Notice</li>
                </ul>
            </section>
        </div>
    );
}
