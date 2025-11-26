"use client";

import { motion } from "framer-motion";

export default function HeroSlide() {
    return (
        <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-rose-100 to-orange-100 px-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center max-w-2xl bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-lg"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-rose-600 mb-4">
                    Healthy Food Available to Everyone
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-6">
                    Free shipping on orders over $50 — shop now!
                </p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-6 rounded shadow"
                >
                    Shop Now
                </motion.button>
            </motion.div>
        </section>
    );
}