"use client";

import { useState } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { LogOut, PlusCircle, Boxes, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function UserDropdown() {
    const [open, setOpen] = useState(false);
    const { user, logOut } = useAuth();
    const handleLogOut = () => {
        logOut();
    }
    return (
        <div className="relative">
            {/* Avatar Button */}
            <button onClick={() => setOpen(!open)} className="rounded-full border border-gray-300 p-1 hover:ring-2 hover:ring-rose-400">
                <img
                    src={user?.photoURL || "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-3 w-56 bg-white border rounded-xl shadow-xl overflow-hidden"
                    >
                        <div className="px-4 py-3 border-b">
                            <p className="font-semibold">{user?.name}</p>
                            <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                        <Link href="/my-products" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
                            <Package size={18} /> My Product
                        </Link>
                        <Link href="/add-product" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
                            <PlusCircle size={18} /> Add Product
                        </Link>
                        <Link href="/manage-products" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
                            <Boxes size={18} /> Manage Products
                        </Link>
                        <button onClick={handleLogOut} className="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">
                            <LogOut size={18} /> Logout
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
