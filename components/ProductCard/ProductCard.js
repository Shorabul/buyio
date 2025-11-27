"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
    const router = useRouter();

    const handleViewDetails = () => {
        router.push(`/product/${product._id}`);
    };

    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-600">{product.category}</p>
            <p className="text-gray-900 font-bold">${product.price}</p>
            <button
                onClick={handleViewDetails}
                className="mt-3 w-full bg-rose-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
                View Details
            </button>
        </div>
    );
}


