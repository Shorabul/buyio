"use client";

import Link from "next/link";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import UserDropdown from "./UserDropdown";
import useAuth from "@/hooks/useAuth";
// import { useAuth } from "@/hooks/useAuth"; // custom hook for auth state

export default function Navbar() {

    const { user } = useAuth();

    return (
        <nav className="sticky top-0 z-50 shadow-md flex justify-between items-center px-6 py-3">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-rose-500">
                Buyio
            </Link>

            {/* Navigation Links */}
            <NavLinks />

            {/* Auth / Dropdown */}
            <div>
                {user ? <UserDropdown user={user} /> : <AuthButtons />}
            </div>
        </nav>
    );
}
