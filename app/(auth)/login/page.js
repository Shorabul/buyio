"use client";

import { useState } from "react";
import { CircleAlert, Mail, Lock, CheckCircle2 } from "lucide-react";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [emailSuccess, setEmailSuccess] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple validation example
        if (!email.includes("@")) {
            setEmailError("Please enter a valid email address.");
            setEmailSuccess("");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            setSuccess("");
            return;
        }

        // Clear errors and show success
        setError("");
        setSuccess("Looks good!");
        alert("Login logic goes here!");
    };

    return (
        <div className="max-w-sm mx-auto mt-10 bg-gray-600 p-6 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        Your Email
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <Mail className="w-4 h-4 text-body" />
                        </div>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Email"
                            className={`py-2.5 sm:py-3 pl-10 block w-full rounded-lg sm:text-sm focus:ring-2 border ${emailError
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : emailSuccess
                                    ? "border-teal-500 focus:border-teal-500 focus:ring-teal-500"
                                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                }`}
                            required
                        />
                        {error && (
                            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                                <CircleAlert className="text-red-500 w-4 h-4" />
                            </div>
                        )}
                        {success && (
                            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                                <CheckCircle2 className="text-teal-500 w-4 h-4" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium mb-2 dark:text-white"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <Lock className="w-4 h-4 text-gray-500" />
                        </div>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className={`py-2.5 sm:py-3 pl-10 block w-full rounded-lg sm:text-sm focus:ring-2 border ${error
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : success
                                    ? "border-teal-500 focus:border-teal-500 focus:ring-teal-500"
                                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                }`}
                            required
                        />
                        {error && (
                            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                                <CircleAlert className="text-red-500 w-4 h-4" />
                            </div>
                        )}
                        {success && (
                            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                                <CheckCircle2 className="text-teal-500 w-4 h-4" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                >
                    Login
                </button>

                {/* Feedback messages */}
                {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
                {success && <p className="text-sm text-teal-600 mt-2">{success}</p>}
            </form>
        </div>
    );
}