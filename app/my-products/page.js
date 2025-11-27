"use client";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function MyProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();
    const userEmail = user?.email;

    useEffect(() => {
        if (!userEmail) return;

        fetch(`/api/products/byEmail?email=${userEmail}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setProducts(data.products);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading products:", err);
                setLoading(false);
            });
    }, [userEmail]);


    const handleProductDelete = async (id) => {
        console.log("Deleting product ID:", id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    const res = await fetch(`/api/products/${id}`, {
                        method: "DELETE",
                    });

                    const data = await res.json();

                    // 🔥 LOG EVERYTHING
                    console.log("DELETE API Response:", data);

                    if (data.success) {
                        setProducts(prev => prev.filter((p) => p._id !== id));

                        Swal.fire({
                            title: "Deleted!",
                            text: "Your product has been deleted.",
                            icon: "success",
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: data.message || "Something went wrong!",
                            icon: "error",
                        });
                    }
                } catch (error) {
                    console.error("DELETE Request Error:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "Network or server issue.",
                        icon: "error",
                    });
                }

            }
        });
    };



    if (loading) {
        return <p className="p-6 text-gray-600">Loading your products...</p>;
    }

    if (!products.length) {
        return <p className="p-6 text-gray-600">You haven’t added any products yet.</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Products</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 divide-y divide-gray-200 rounded-lg overflow-hidden">
                    {/* Table Head */}
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">#</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Price</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Category</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product, index) => (
                            <tr key={product._id} className="hover:bg-gray-50 transition">
                                <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                    {product.title}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    ${product.price}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {product.category || "-"}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    <button
                                        onClick={() => handleProductDelete(product._id)}
                                        className="px-3 py-1 bg-rose-500 text-white rounded hover:bg-rose-600 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                    {/* Table Footer */}
                    <tfoot className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">#</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Price</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Category</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
