"use client";

import Link from "next/link";

export default function AuthButtons() {
    return (
        <div className="flex gap-4">
            <Link
                href="/login"
                className="px-4 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-600"
            >
                Login
            </Link>
            <Link
                href="/register"
                className="px-4 py-2 rounded-lg border border-rose-500 text-rose-500 hover:bg-red-50"
            >
                Register
            </Link>
        </div>
    );
}
