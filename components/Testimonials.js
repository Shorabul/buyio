"use client";
import React, { useEffect, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { ShoppingCart } from 'lucide-react';


const productReviews = [
    {
        rating: 5,
        comment: "The t-shirt fits perfectly and the quality is excellent!",
        userName: "Alena Johnson",
        productName: "Classic White T-Shirt",
        photoURL: "https://i.ibb.co/3Y95MbL1/user2.jpg",
    },
    {
        rating: 4,
        comment: "Love the summer dress! Very comfortable but slightly long for me.",
        userName: "Michael Smith",
        productName: "Elegant Summer Dress",
        photoURL: "https://i.ibb.co/jvpgfc3L/user1.jpg",
    },
    {
        rating: 5,
        comment: "Kids shoes are super durable and my son loves them!",
        userName: "Sophia Lee",
        productName: "Kids Running Shoes",
        photoURL: "https://i.ibb.co/xqqLVsYK/user3.jpg",
    },
    {
        rating: 4,
        comment: "Jeans are stylish and comfortable, exactly as described.",
        userName: "John Doe",
        productName: "Blue Denim Jeans",
        photoURL: "https://i.ibb.co/pj2MgNN8/cute-dog-consultation-Edited.jpg",
    },
    {
        rating: 5,
        comment: "This handbag looks premium and is very spacious.",
        userName: "Emma Watson",
        productName: "Stylish Handbag",
        photoURL: "https://i.ibb.co/xKzD3mqy/women-user.jpg",
    },
];

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    const [index, setIndex] = useState(0);

    // Fix: defer setting state to avoid React 18 warning
    useEffect(() => {
        const timer = setTimeout(() => setReviews(productReviews), 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!reviews.length) return;

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % reviews.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [reviews.length]);

    if (!reviews.length) {
        return (
            <section className="py-16 px-4 text-center">
                <div className="max-w-md mx-auto bg-base-300 p-8 rounded-xl shadow">
                    <ShoppingCart size={50} className="mx-auto text-rose-500" />
                    <h2 className="text-xl font-semibold mt-4">No Customer Reviews Found</h2>
                    <p className="text-base-content/70 mt-2">
                        Be the first to leave a review about our products!
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="text-rose-500 py-16 px-4 md:px-8">
            <div className="text-center mb-12">
                <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-3 inline-table border-b-2 pb-0.5">
                    <span className="flex items-center justify-center gap-2">
                        <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                        <span>What Our Customers Say</span>
                    </span>
                </p>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 leading-snug text-base-content text-gray-900">
                    Hear From Our <span className="text-rose-500">Satisfied</span> Customers
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-base-content">
                    Real feedback from people who purchased our products.
                </p>
            </div>

            <div className="flex justify-center">
                <AnimatePresence mode="wait">
                    <Motion.div
                        key={index}
                        initial={{ opacity: 0, x: 100, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -100, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-base-content/90 bg-base-300 rounded-xl shadow-lg p-6 max-w-xl w-full"
                    >
                        {/* Rating Stars */}
                        <div className="flex items-center gap-2 text-rose-500 mb-2">
                            {[...Array(reviews[index]?.rating || 0)].map((_, i) => (
                                <FaStar key={i} aria-label="Star" />
                            ))}
                        </div>

                        {/* Comment */}
                        <p className="italic text-base-content/80 text-xs md:text-sm lg:text-base leading-relaxed mb-4 text-gray-900">
                            “ {reviews[index]?.comment} ”
                        </p>

                        {/* Customer Info */}
                        <div className="flex items-center gap-4">
                            <img
                                src={reviews[index]?.photoURL}
                                alt={`${reviews[index]?.userName}'s profile picture`}
                                className="w-12 h-12 rounded-full object-cover border-2 border-rose-500"
                            />
                            <div className="text-rose-500 text-xs md:text-sm lg:text-base">
                                <p className="font-bold">{reviews[index]?.userName}</p>
                                <p className="font-semibold text-base-content">{reviews[index]?.productName}</p>
                            </div>
                        </div>
                    </Motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Testimonials;
