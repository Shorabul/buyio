"use client";

import { useState } from "react";
import { CircleAlert, Mail, Lock, CheckCircle2 } from "lucide-react";
import SocialLogin from "@/components/auth/SocialLogin";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const { user, logIn } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
        setError,
    } = useForm({ mode: "onChange" });

    const getFirebaseLoginErrorMessage = (error) => {
        switch (error.code) {
            case "auth/invalid-email":
                return "The email address is not valid.";
            case "auth/user-disabled":
                return "This user account has been disabled.";
            case "auth/user-not-found":
                return "No account found with this email.";
            case "auth/wrong-password":
                return "Incorrect password.";
            case "auth/too-many-requests":
                return "Too many login attempts. Please try again later.";
            case "auth/network-request-failed":
                return "Network error. Please check your internet connection.";
            case "auth/invalid-credential":
                return "Invalid credentials. Please log in again.";
            case "auth/popup-closed-by-user":
                return "Login was canceled. Please try again.";
            case "auth/cancelled-popup-request":
                return "Login request was canceled. Try again.";
            case "auth/popup-blocked":
                return "Popup blocked. Please allow popups and try again.";
            default:
                return error.message || "An unexpected error occurred.";
        }
    };

    const onSubmit = (data) => {
        setLoading(true);

        logIn(data.email, data.password)
            .then(() => {
                // alert(`Welcome ${user?.displayName}`);
                router.push(router.query?.redirect || "/");
            })
            .catch((error) => {
                console.error(error);

                if (error.code && (error.code.includes("email") || error.code.includes("invalid"))) {
                    setError("email", {
                        type: "firebase",
                        message: getFirebaseLoginErrorMessage(error),
                    });
                } else if (error.code === "auth/wrong-password") {
                    setError("password", {
                        type: "firebase",
                        message: getFirebaseLoginErrorMessage(error),
                    });
                } else {
                    alert(getFirebaseLoginErrorMessage(error));
                }
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="max-w-sm mx-auto my-10 space-y-5 text-gray-900">
            <div className="space-y-2">
                <h1 className="font-bold text-left text-4xl">Welcome back</h1>
                <div className="flex text-left items-center gap-2">
                    <p className="text-gray-500">Don&#39;t have an account?</p>
                    <Link href="/register" className="underline">Create an account</Link>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email */}
                <div>
                    <label htmlFor="email" className="block mb-2.5 text-sm font-medium">
                        Email
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <Mail className="w-4 h-4 text-body" />
                        </div>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" },
                            })}
                            className={`py-2.5 sm:py-3 pl-10 block w-full rounded-lg sm:text-sm border ${errors.email
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : touchedFields.email
                                    ? "border-teal-500 focus:border-teal-500 focus:ring-teal-500"
                                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                }`}
                        />
                        {errors.email && (
                            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                                <CircleAlert className="text-red-500 w-4 h-4" />
                            </div>
                        )}
                        {!errors.email && touchedFields.email && (
                            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                                <CheckCircle2 className="text-teal-500 w-4 h-4" />
                            </div>
                        )}
                    </div>
                    {errors.email && <p className="text-sm text-red-600 mt-2">{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                        Password
                    </label>

                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <Lock className="w-4 h-4 text-gray-500" />
                        </div>

                        <input
                            type="password"
                            placeholder="Enter password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be at least 6 characters" }
                            })}
                            className={`py-2.5 sm:py-3 pl-10 block w-full rounded-lg sm:text-sm border ${errors.password
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : touchedFields.password
                                    ? "border-teal-500 focus:border-teal-500 focus:ring-teal-500"
                                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                }`}
                        />

                        {errors.password && (
                            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                                <CircleAlert className="text-red-500 w-4 h-4" />
                            </div>
                        )}

                        {!errors.password && touchedFields.password && (
                            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                                <CheckCircle2 className="text-teal-500 w-4 h-4" />
                            </div>
                        )}
                    </div>

                    {errors.password && (
                        <p className="text-sm text-red-600 mt-2">{errors.password.message}</p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-rose-500 text-white py-2 rounded-lg transition flex justify-center items-center gap-2
        ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-500"}`}
                >
                    Login
                </button>

                <SocialLogin></SocialLogin>
            </form>
        </div>
    );
}