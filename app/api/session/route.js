// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { getAdminAuth } from "@/lib/firebaseAdmin";

// export async function POST(req) {
//     try {
//         const { idToken } = await req.json();
//         if (!idToken) {
//             return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
//         }

//         const auth = getAdminAuth();
//         const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
//         const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

//         cookies().set("session", sessionCookie, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "lax",
//             path: "/",
//             maxAge: expiresIn / 1000,
//         });

//         return NextResponse.json({ status: "ok" });
//     } catch (e) {
//         return NextResponse.json({ error: "Failed to create session" }, { status: 401 });
//     }
// }

// export async function DELETE() {
//     cookies().set("session", "", {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "lax",
//         path: "/",
//         maxAge: 0,
//     });
//     return NextResponse.json({ status: "signed_out" });
// }

import { NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebaseAdmin";

export async function POST(req) {
    try {
        const { idToken } = await req.json();
        if (!idToken) {
            return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
        }

        const auth = getAdminAuth();
        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
        const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

        const response = NextResponse.json({ status: "ok" });

        response.cookies.set("session", sessionCookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: expiresIn / 1000,
        });

        return response;
    } catch (e) {
        console.error("SESSION ERROR", e);
        return NextResponse.json({ error: "Failed to create session" }, { status: 401 });
    }
}

export async function DELETE() {
    const response = NextResponse.json({ status: "signed_out" });
    response.cookies.set("session", "", {
        path: "/",
        maxAge: 0,
    });
    return response;
}

