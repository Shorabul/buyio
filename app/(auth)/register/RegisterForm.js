"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CircleAlert, Mail, Lock, CheckCircle2, User, CloudUpload, ChevronRight } from "lucide-react";
import SocialLogin from "@/components/auth/SocialLogin";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const { user, registerUser, updateUserProfile } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
        setError,
    } = useForm({ mode: "onChange" });

    useEffect(() => {
        if (user) {
            router.replace("/");
        }
    }, [user, router]);

    const getFirebaseErrorMessage = (error) => {
        switch (error.code) {
            case "auth/email-already-in-use":
                return "This email is already registered.";
            case "auth/invalid-email":
                return "The email address is not valid.";
            case "auth/weak-password":
                return "Your password is too weak.";
            case "auth/user-disabled":
                return "This user account has been disabled.";
            case "auth/user-not-found":
                return "No user found with this email.";
            case "auth/wrong-password":
                return "Incorrect password.";
            default:
                return error.message || "An unexpected error occurred.";
        }
    };

    const onSubmit = (data) => {
        setLoading(true);
        const profileImage = data.photo[0];

        registerUser(data.email, data.password).then(() => {
            // Clear previous errors
            setError("email", {});
            setError("password", {});

            // Upload image to imgbb
            const formData = new FormData();
            formData.append("image", profileImage);
            const image_API_URL = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_HOST_API_KEY}`;

            return axios.post(image_API_URL, formData);
        }).then((imgRes) => {
            const photo_URL = imgRes.data.data.url;

            // Save user to backend
            return axios.post("/api/users", {
                name: data.name,
                email: data.email,
                image: photo_URL,
                createdAt: new Date(),
            }).then(() => photo_URL); // Pass photo_URL to next then
        }).then((photo_URL) => {
            // Update Firebase profile
            return updateUserProfile({
                displayName: data.name,
                photoURL: photo_URL,
            });
        }).then(() => {
            router.push(router.query?.redirect || "/");
        }).catch((error) => {
            console.log(error);

            // Handle Firebase errors under the correct field
            if (error.code && (error.code.includes("auth/email") || error.code.includes("auth/invalid"))) {
                setError("email", {
                    type: "firebase",
                    message: getFirebaseErrorMessage(error),
                });
            } else if (error.code === "auth/weak-password") {
                setError("password", {
                    type: "firebase",
                    message: getFirebaseErrorMessage(error),
                });
            } else {
                alert(error.message || "Something went wrong!");
            }
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <div className="max-w-sm mx-auto my-10 space-y-5 text-gray-900">
            <div className="space-y-2">
                <h1 className="font-bold text-left text-4xl">Create an account</h1>
                <div className="flex text-left items-center gap-2">
                    <p className="text-gray-500">I already have an account</p>
                    <Link href="/login" className="underline">Log in</Link>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block mb-2.5 text-sm font-medium">
                        Name
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <User className="w-4 h-4 text-body" />
                        </div>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            {...register("name", {
                                required: "Name is required",
                                minLength: { value: 5, message: "Name must be at least 5 characters" },
                            })}
                            className={`py-2.5 sm:py-3 pl-10 block w-full rounded-lg sm:text-sm border ${errors.name
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : touchedFields.name
                                    ? "border-teal-500 focus:border-teal-500 focus:ring-teal-500"
                                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                }`}
                        />
                        {errors.name && (
                            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                                <CircleAlert className="text-red-500 w-4 h-4" />
                            </div>
                        )}
                        {!errors.name && touchedFields.name && (
                            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                                <CheckCircle2 className="text-teal-500 w-4 h-4" />
                            </div>
                        )}
                    </div>
                    {errors.name && <p className="text-sm text-red-600 mt-2">{errors.name.message}</p>}
                </div>
                {/* Photo */}
                <div>
                    <label htmlFor="photo" className="block mb-2.5 text-sm font-medium">
                        Photo
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <CloudUpload className="w-4 h-4 text-body" />
                        </div>
                        <input
                            type="file"
                            placeholder="Your Photo"
                            {...register('photo', {
                                required: "Photo is required"
                            })}
                            className={`py-2.5 sm:py-3 pl-10 block w-full rounded-lg sm:text-sm border ${errors.photo
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : touchedFields.photo
                                    ? "border-teal-500 focus:border-teal-500 focus:ring-teal-500"
                                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                }`}
                        />
                        {errors.photo && (
                            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                                <CircleAlert className="text-red-500 w-4 h-4" />
                            </div>
                        )}
                        {!errors.photo && touchedFields.photo && (
                            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                                <CheckCircle2 className="text-teal-500 w-4 h-4" />
                            </div>
                        )}
                    </div>
                    {errors.photo && <p className="text-sm text-red-600 mt-2">{errors.photo.message}</p>}
                </div>

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

                {/* Password */}
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
                    <span>Create an account</span><ChevronRight className="w-4 h-4" />
                </button>
                <SocialLogin></SocialLogin>
            </form>
        </div>
    );
}
