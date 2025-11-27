"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks() {
    const pathname = usePathname();
    const linkClass = (path) =>
        pathname === path ? "text-rose-500 font-semibold" : "text-gray-600 hover:text-rose-500";

    return (
        <div className="hidden md:flex gap-6">
            <Link href="/" className={linkClass("/")}>Home</Link>
            <Link href="/all-products" className={linkClass("/products")}>
                Products
            </Link>
            <Link href="/about" className={linkClass("/about")}>About</Link>
            <Link href="/contact" className={linkClass("/contact")}>Contact</Link>
        </div>
    );
}

