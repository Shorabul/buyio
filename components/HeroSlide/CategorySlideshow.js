"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategorySlideshow() {
    const [categories, setCategories] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        fetch("/categories.json")
            .then(res => res.json())
            .then(data => setCategories(data.categories));
    }, []);

    const images = {
        Men: "https://coderthemes.com/cartzilla-laravel/assets/img/home/fashion/v2/categories/01.png",
        Women: "https://coderthemes.com/cartzilla-laravel/assets/img/home/fashion/v2/categories/02.png",
        Kids: "https://coderthemes.com/cartzilla-laravel/assets/img/home/fashion/v2/categories/03.png",
    };

    const nextSlide = () => setIndex((index + 1) % categories.length);
    const prevSlide = () => setIndex((index - 1 + categories.length) % categories.length);

    return (
        <div className="relative w-full">
            <AnimatePresence mode="wait">
                {categories.length > 0 && (
                    <motion.div
                        key={categories[index].name}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white rounded-lg shadow-md p-4 text-black"
                    >
                        <img
                            src={images[categories[index].name]}
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
                <button onClick={prevSlide} className="p-2 bg-gray-200 rounded-full">
                    <ChevronLeft />
                </button>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                <button onClick={nextSlide} className="p-2 bg-gray-200 rounded-full">
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
}
