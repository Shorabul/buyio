"use client";

import Link from "next/link";

export default function AuthButtons() {
    return (
        <div className="flex gap-4">
            <Link
                href="/login"
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            >
                Login
            </Link>
            <Link
                href="/register"
                className="px-4 py-2 rounded border border-red-600 text-red-600 hover:bg-red-50"
            >
                Register
            </Link>
        </div>
    );
}
