"use client";
import { useState } from "react";
import { X, Home, Package, PlusCircle, Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function ManageProductsPage() {
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen flex relative">
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: open ? 256 : 70 }}
                transition={{ duration: 0.25 }}
                className="h-full shadow-xl flex flex-col bg-white"
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h1 className={`text-xl font-bold ${open ? "block" : "hidden"}`}>Dashboard</h1>
                    <button
                        aria-label="Toggle sidebar"
                        onClick={() => setOpen(!open)}
                    >
                        <X size={22} />
                    </button>
                </div>

                <nav className="mt-4 flex-1">
                    <ul className="space-y-2 text-black">
                        <SidebarItem open={open} icon={<Home size={20} />} label="Home" />
                        <SidebarItem open={open} icon={<Package size={20} />} label="Manage Products" />
                        <SidebarItem open={open} icon={<PlusCircle size={20} />} label="Add Product" />
                        <SidebarItem open={open} icon={<Settings size={20} />} label="Settings" />
                    </ul>
                </nav>
            </motion.aside>

            {/* Main Content */}
            <main className={`flex-1 p-6 transition-all duration-300 ${open ? "ml-64" : "ml-20"}`}>
                <h2 className="text-3xl font-bold mb-4">Manage Products</h2>
                <p className="text-gray-600">Your content goes here...</p>
            </main>
        </div>
    );
}

function SidebarItem({ icon, label, open }) {
    return (
        <button className="flex items-center gap-4 p-3 w-full hover:bg-gray-200 transition rounded-md">
            <span>{icon}</span>
            <span className={`${open ? "block" : "hidden"}`}>{label}</span>
        </button>
    );
}
