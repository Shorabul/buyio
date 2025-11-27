"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategorySlideshow() {
    const [categories, setCategories] = useState([]);
    const [index, setIndex] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch categories
    useEffect(() => {
        fetch("/categories.json")
            .then(res => res.json())
            .then(data => setCategories(data.categories))
            .catch(err => console.error("Error loading categories:", err));
    }, []);

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                if (data?.success && Array.isArray(data.products)) {
                    setProducts(data.products);
                } else {
                    setProducts([]);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]);
            }
            setLoading(false);
        };

        fetchProducts();
    }, []);

    const nextSlide = () => setIndex((index + 1) % categories.length);
    const prevSlide = () => setIndex((index - 1 + categories.length) % categories.length);

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;

    return (
        <div className="relative w-full">
            <AnimatePresence mode="wait">
                {categories.length > 0 && (
                    <motion.div
                        key={categories[index].name}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-xl shadow-lg p-4 text-black"
                    >
                        {/* Show the first product image in this category if available */}
                        <img
                            src={
                                products.find(p => p.category === categories[index].name)?.image ||
                                "https://via.placeholder.com/400x150?text=No+Image"
                            }
                            alt={categories[index].name}
                            className="w-full h-40 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-2 text-center">
                            {categories[index].name}
                        </h3>
                        <ul className="text-sm text-gray-700 list-disc list-inside text-left">
                            {categories[index].subCategories.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                <button
                    onClick={prevSlide}
                    className="p-2 bg-rose-500 shadow-md rounded-full hover:bg-red-500 transition"
                >
                    <ChevronLeft size={24} />
                </button>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                <button
                    onClick={nextSlide}
                    className="p-2 bg-rose-500 shadow-md rounded-full hover:bg-red-500 transition"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
}
