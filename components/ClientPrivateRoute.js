"use client";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

export default function ClientPrivateRoute({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return <div>Loading...</div>;
    }

    return children;
}
