"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard/ProductCard";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    // console.log(products);
    useEffect(() => {
        axios.get("/api/products").then((res) => {
            setProducts(res.data.products);
        });

    }, []);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">All Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product}></ProductCard>
                ))}
            </div>
        </div>
    );
}
