"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function SocialLogin() {
    const { googleSignin } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleGoogle = () => {
        setLoading(true); // start loading

        googleSignin()
            .then(res => {
                const user = res.user;

                const userInfo = {
                    name: user?.displayName || "",
                    email: user?.email || "",
                    image: user?.photoURL || "",
                    createdAt: new Date(),
                };

                // Call your backend to store/check user
                fetch("/api/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userInfo),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.message || "User saved to MongoDB");
                        router.push(router.query?.redirect || "/");
                    })
                    .catch(err => {
                        console.error("Error saving user:", err);
                        alert("Failed to save user. Please try again.");
                    })
                    .finally(() => setLoading(false));
            })
            .catch(err => {
                console.error("Google login error:", err);
                alert("Google login failed. Please try again.");
                setLoading(false);
            });
    };

    return (
        <div className="text-center space-y-4">
            <div className="flex justify-center items-center gap-2">
                <span className="h-px w-full bg-gray-400"></span>
                <p className="w-full text-gray-500">or continue with</p>
                <span className="h-px w-full bg-gray-400"></span>
            </div>

            <button
                onClick={handleGoogle}
                disabled={loading}
                className={`w-full py-2 text-center border border-gray-300 rounded-lg flex justify-center items-center gap-2 transition-all delay-300 ease-out 
                    hover:bg-rose-500 hover:text-white ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
                <FcGoogle size={24} />
                <span className="font-semibold">Google</span>
            </button>
        </div>
    );
}
