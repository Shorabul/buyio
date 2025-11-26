"use client";

import Link from "next/link";

export default function AuthButtons() {
    return (
        <div className="flex gap-4">
            <Link
                href="/login"
                className="px-4 py-2 rounded bg-rose-500 text-white hover:bg-red-600"
            >
                Login
            </Link>
            <Link
                href="/register"
                className="px-4 py-2 rounded border border-rose-500 text-rose-500 hover:bg-red-50"
            >
                Register
            </Link>
        </div>
    );
}
