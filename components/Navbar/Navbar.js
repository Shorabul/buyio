"use client";
import Link from "next/link";

import AuthButtons from "./AuthButtons";
import UserDropdown from "./UserDropdown";
import useAuth from "@/hooks/useAuth";
import { NavLinks } from "./NavLinks";

export default function Navbar() {
    const { user } = useAuth();
    return (
        <nav className="sticky top-0 z-50 shadow-md flex justify-between items-center px-6 py-3 bg-white">
            <Link href="/" className="text-xl font-bold text-rose-500">Buyio</Link>
            <NavLinks />
            {user ? <UserDropdown user={user} /> : <AuthButtons />}
        </nav>
    );
}
