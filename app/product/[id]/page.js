"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function ProductDetailsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (!user) {
            router.push("/login"); // redirect if not logged in
            return;
        }

        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                if (!res.ok) {
                    console.log("Fetch error:", res.statusText);
                    return;
                }
                const data = await res.json();
                setProduct(data.product);
            } catch (err) {
                console.error("Fetch failed:", err);
            }
        };

        fetchProduct();
    }, [id, user, router]);

    if (!product) return <p className="p-6 text-center">Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-96 object-cover rounded mb-4"
            />
            <p className="text-gray-600 mb-2">Category: {product.category}</p>
            <p className="text-gray-900 font-bold mb-2">Price: ${product.price}</p>
            <p className="text-gray-700">{product.description}</p>
        </div>
    );
}
