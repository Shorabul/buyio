"use client";
import React from 'react';

export default function ProductCard({ product }) {
    return (
        <div className="border rounded p-4 shadow">
            <img
                src={product.image}
                alt={product.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="font-bold mt-2">${product.price}</p>
            <p className="text-xs text-gray-500">Category: {product.category}</p>
            <p className="text-xs text-gray-500">Stock: {product.stock}</p>
            <p className="text-xs text-gray-500">Seller: {product.seller}</p>
        </div>
    );
};

