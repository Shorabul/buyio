"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

export default function UserDropdown() {
    const [open, setOpen] = useState(false);
    const { user, logOut } = useAuth();
    const handleLogOut = () => {
        logOut();
    }
    return (
        <div className="relative">
            {/* Dropdown Toggle */}
            <button
                onClick={() => setOpen(!open)}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            >
                {user?.name || "User"}
            </button>

            {/* Dropdown Menu */}
            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                    <div className="px-4 py-2 border-b">
                        <p className="font-semibold">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <Link
                        href="/products/add"
                        className="block px-4 py-2 hover:bg-gray-100"
                    >
                        Add Product
                    </Link>
                    <Link
                        href="/products/manage"
                        className="block px-4 py-2 hover:bg-gray-100"
                    >
                        Manage Products
                    </Link>
                    <button
                        onClick={handleLogOut}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
