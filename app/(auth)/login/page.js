// app/(auth)/login/page.js
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminAuth } from "@/lib/firebaseAdmin";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
    const cookieStore = await cookies();        // ✅ MUST await
    const session = cookieStore.get("session"); // ✅ now get() works
    const sessionCookie = session?.value;

    if (sessionCookie) {
        const auth = getAdminAuth();
        try {
            await auth.verifySessionCookie(sessionCookie, true);
            redirect("/"); // already logged in → go home
        } catch {
            // invalid cookie → show login form
        }
    }

    return <LoginForm />;
}

