// app/add-product/page.js
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminAuth } from "@/lib/firebaseAdmin";
import AddProductForm from "./AddProductForm";

export default async function AddProductPage() {
    // ⬅️ MUST USE await
    const cookieStore = await cookies();

    const session = cookieStore.get("session");

    console.log("SESSION COOKIE:", session);

    if (!session) {
        redirect("/");
    }

    const auth = getAdminAuth();
    try {
        await auth.verifySessionCookie(session.value, true);
    } catch (err) {
        console.error("VERIFY ERROR:", err);
        redirect("/");
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Add Product</h1>
            <AddProductForm />
        </div>
    );
}

// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import { getAdminAuth } from "@/lib/firebaseAdmin";
// import AddProductForm from "./AddProductForm";

// export default async function AddProductPage() {
//     const cookieStore = cookies(); // ✅ this is correct
//     const sessionCookie = cookieStore.get?.("session")?.value; // ✅ get the cookie

//     if (!sessionCookie) {
//         redirect("/");
//     }

//     const auth = getAdminAuth();
//     try {
//         await auth.verifySessionCookie(sessionCookie, true);
//     } catch {
//         redirect("/");
//     }

//     return (
//         <div className="max-w-2xl mx-auto p-6">
//             <h1 className="text-2xl font-bold mb-4">Add Product</h1>
//             <AddProductForm />
//         </div>
//     );
// }


// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import { getAdminAuth } from "@/lib/firebaseAdmin";
// import AddProductForm from "./AddProductForm";

// export default async function AddProductPage() {
//     // cookies() এখন iterable
//     let sessionCookie;
//     for (const cookie of cookies()) {
//         if (cookie.name === "session") {
//             sessionCookie = cookie.value;
//             break;
//         }
//     }

//     if (!sessionCookie) {
//         redirect("/login");
//     }

//     const auth = getAdminAuth();
//     try {
//         await auth.verifySessionCookie(sessionCookie, true);
//     } catch {
//         redirect("/login");
//     }

//     return (
//         <div className="max-w-2xl mx-auto p-6">
//             <h1 className="text-2xl font-bold mb-4">Add Product</h1>
//             <AddProductForm />
//         </div>
//     );
// }

// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import { getAdminAuth } from "@/lib/firebaseAdmin";
// import AddProductForm from "./AddProductForm";

// export default async function AddProductPage() {
//     const allCookies = cookies().getAll();
//     const session = allCookies.find(c => c.name === "session");
//     const sessionCookie = session?.value;

//     if (!sessionCookie) {
//         redirect("/login");
//     }

//     const auth = getAdminAuth();
//     try {
//         await auth.verifySessionCookie(sessionCookie, true);
//     } catch {
//         redirect("/login");
//     }

//     return (
//         <div className="max-w-2xl mx-auto p-6">
//             <h1 className="text-2xl font-bold mb-4">Add Product</h1>
//             <AddProductForm />
//         </div>
//     );
// }

// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import { getAdminAuth } from "@/lib/firebaseAdmin";
// import AddProductForm from "./AddProductForm";

// export default async function AddProductPage() {
//     const cookieStore = cookies();
//     const session = cookieStore.get("session");
//     const sessionCookie = session?.value;

//     if (!sessionCookie) {
//         redirect("/login");
//     }

//     const auth = getAdminAuth();
//     try {
//         await auth.verifySessionCookie(sessionCookie, true);
//     } catch {
//         redirect("/login");
//     }

//     return (
//         <div className="max-w-2xl mx-auto p-6">
//             <h1 className="text-2xl font-bold mb-4">Add Product</h1>
//             <AddProductForm />
//         </div>
//     );
// }


