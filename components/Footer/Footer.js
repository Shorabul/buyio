"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="py-10 px-6 md:px-16 lg:px-24">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-sm">
                {/* Company Info */}
                <div>
                    <h3 className="font-semibold mb-2">Buyio AG</h3>
                    <p>buyioagstrasse 1</p>
                    <p>8000 Zürich</p>
                    <p className="mt-2">Help & Contact</p>
                    <p>Monday–Friday: 08:00–17:00</p>
                    <Link href="#" className="text-red-600 hover:underline">
                        Our Opening Hours
                    </Link>
                </div>

                {/* About Us */}
                <div>
                    <h3 className="font-semibold mb-2">ABOUT US</h3>
                    <ul className="space-y-1">
                        <li><Link href="#">Company</Link></li>
                        <li><Link href="#">History</Link></li>
                        <li><Link href="#">Locations</Link></li>
                        <li><Link href="#">Terms & Conditions</Link></li>
                        <li><Link href="#">Privacy Policy</Link></li>
                        <li><Link href="#">Legal Notice</Link></li>
                    </ul>
                </div>

                {/* Jobs & Careers */}
                <div>
                    <h3 className="font-semibold mb-2">JOBS & CAREERS</h3>
                    <ul className="space-y-1">
                        <li><Link href="#">Working with Us</Link></li>
                        <li><Link href="#">Job Offers</Link></li>
                        <li><Link href="#">Open Applications</Link></li>
                        <li><Link href="#">Apprenticeships</Link></li>
                    </ul>
                </div>

                {/* Offers & Services */}
                <div>
                    <h3 className="font-semibold mb-2">OFFERS & SERVICES</h3>
                    <ul className="space-y-1">
                        <li><Link href="#">Weekly Deals & Catalogs</Link></li>
                        <li><Link href="#">Buyio Cars</Link></li>
                        <li><Link href="#">Rental Vans</Link></li>
                        <li><Link href="#">Sport Outlet</Link></li>
                        <li><Link href="#">Beauty Shop</Link></li>
                        <li><Link href="#">Real Estate</Link></li>
                    </ul>
                </div>

                {/* Info & Help */}
                <div>
                    <h3 className="font-semibold mb-2">INFO & HELP</h3>
                    <ul className="space-y-1">
                        <li><Link href="#">Contact & Help Center</Link></li>
                        <li><Link href="#">Services</Link></li>
                        <li><Link href="#">Payment Methods</Link></li>
                        <li><Link href="#">Returns & Warranty</Link></li>
                    </ul>
                </div>

                {/* Newsletter & Social */}
                <div>
                    <h3 className="font-semibold mb-2">NEWSLETTER</h3>
                    <p className="mb-2">Sign up now and enjoy exclusive benefits!</p>
                    <Link href="#" className="text-red-600 hover:underline">
                        Subscribe
                    </Link>

                    <h3 className="font-semibold mt-6 mb-2">Follow Us</h3>
                    <div className="flex gap-3">
                        <Link href="#"><Facebook className="w-5 h-5 text-blue-600" /></Link>
                        <Link href="#"><Instagram className="w-5 h-5 text-pink-500" /></Link>
                        <Link href="#"><Youtube className="w-5 h-5 text-red-600" /></Link>
                        <Link href="#"><Twitter className="w-5 h-5 text-sky-500" /></Link>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-10 border-t pt-4 text-xs text-center text-gray-500">
                <p>© 2025 Buyio AG. All rights reserved.</p>
                <div className="mt-2 flex justify-center gap-4">
                    <span>EN</span>
                    <span>FR</span>
                    <span>IT</span>
                </div>
            </div>
        </footer>
    );
}