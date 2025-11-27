"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard/ProductCard";

export default function FeaturedProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                if (data?.success && Array.isArray(data.products)) {
                    const limited = data.products.length > 6
                        ? data.products.slice(0, 6)
                        : data.products;

                    setProducts(limited);
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


    if (loading) {
        return <p className="p-6 text-center text-gray-600">Loading featured products...</p>;
    }

    if (!products.length) {
        return <p className="p-6 text-center text-gray-600">No products found.</p>;
    }

    return (
        <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
                <Link href="/products">
                    <button className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 transition">
                        See All
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </section>
    );
}
