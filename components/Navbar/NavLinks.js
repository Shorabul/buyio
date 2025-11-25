"use client";

import Link from "next/link";

export default function NavLinks() {
    return (
        <div className="hidden md:flex gap-6">
            <Link href="/" className="hover:text-red-600">Home</Link>
            <Link href="/products" className="hover:text-red-600">Products</Link>
            <Link href="/about" className="hover:text-red-600">About</Link>
            <Link href="/contact" className="hover:text-red-600">Contact</Link>
        </div>
    );
}
