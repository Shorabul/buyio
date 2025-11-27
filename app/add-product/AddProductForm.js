"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "@/hooks/useAuth";

export default function AddProductForm() {
    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ mode: "onChange" });

    const [categoriesData, setCategoriesData] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // ✅ Load categories.json from public folder
    useEffect(() => {
        fetch("/categories.json")
            .then((res) => res.json())
            .then((data) => setCategoriesData(data));
    }, []);

    const onSubmit = async (formData) => {
        setLoading(true);
        const imageFile = formData.image[0];

        try {
            // Upload image to imgbb
            const fd = new FormData();
            fd.append("image", imageFile);
            const image_API_URL = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_HOST_API_KEY}`;
            const imgRes = await axios.post(image_API_URL, fd);
            const imageUrl = imgRes.data.data.url;

            // Send product data to backend
            const product = {
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                category: formData.category,
                subCategory: formData.subCategory,
                stock: parseInt(formData.stock),
                sku: formData.sku,
                seller: user?.displayName,
                sellerEmail: user?.email,
                image: imageUrl,
                createdAt: new Date(),
            };

            await axios.post("/api/products", product);
            setMessage("✅ Product added successfully!");
            reset();
        } catch (error) {
            console.error(error);
            setMessage("❌ Failed to add product.");
        } finally {
            setLoading(false);
        }
    };

    // Find selected category object
    const categoryObj = categoriesData?.categories.find(
        (c) => c.name === selectedCategory
    );

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 max-w-2xl mx-auto p-6 bg-white rounded shadow"
        >
            <h1>{user?.displayName}</h1>
            <h3>{user?.email}</h3>

            <input {...register("title", { required: true })} placeholder="Title" className="w-full border p-2 rounded" />
            <textarea {...register("description", { required: true })} placeholder="Description" className="w-full border p-2 rounded" />
            <input {...register("price", { required: true })} type="number" step="0.01" placeholder="Price" className="w-full border p-2 rounded" />

            {/* Main Category */}
            {categoriesData && (
                <select
                    {...register("category", { required: true })}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border p-2 rounded"
                >
                    <option value="">Select Category</option>
                    {categoriesData.categories.map((cat) => (
                        <option key={cat.name} value={cat.name}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            )}

            {/* Sub Category */}
            {selectedCategory && (
                <select {...register("subCategory", { required: true })} className="w-full border p-2 rounded">
                    <option value="">Select Sub Category</option>
                    {categoryObj?.subCategories.map((sub) => (
                        <option key={sub} value={sub}>
                            {sub}
                        </option>
                    ))}
                </select>
            )}

            <input {...register("stock", { required: true })} type="number" placeholder="Stock" className="w-full border p-2 rounded" />

            <input {...register("sku", { required: true })} placeholder="SKU" className="w-full border p-2 rounded" />

            <input {...register("image", { required: true })} type="file" accept="image/*" className="w-full border p-2 rounded" />

            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                {loading ? "Adding..." : "Add Product"}
            </button>

            {message && <p className="mt-2 text-sm">{message}</p>}
        </form>
    );
}
