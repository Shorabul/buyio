import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminAuth } from "@/lib/firebaseAdmin";
import RegisterForm from "./RegisterForm";

export default async function RegisterPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");
    const sessionCookie = session?.value;

    if (sessionCookie) {
        const auth = getAdminAuth();
        try {
            await auth.verifySessionCookie(sessionCookie, true);
            redirect("/"); // already logged in → go home
        } catch {
            // invalid cookie → show register form
        }
    }

    return <RegisterForm />;
}