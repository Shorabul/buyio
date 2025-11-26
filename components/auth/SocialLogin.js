"use client";

import useAuth from "@/hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

export default function SocialLogin() {
    const { googleSignin } = useAuth();
    const router = useRouter();

    const handleGoogle = async () => {

        googleSignin().then(res => {
            console.log("Google login successful");
            router.push(router.query?.redirect || "/");
        }).catch(error => {
            console.log(error);
        });
    };

    return (
        <div className="text-center space-y-4">
            <div className="flex justify-center items-center gap-2">
                <span className="h-px w-full bg-gray-400"></span>
                <p className="w-full">or continue with</p>
                <span className="h-px w-full bg-gray-400"></span>
            </div>
            <button
                onClick={handleGoogle}
                className="w-full py-2 text-center border border-gray-300 rounded-lg flex justify-center items-center gap-2 cursor-pointer hover:bg-rose-500 hover:text-white transition-all delay-300 ease-out"
            >
                <FcGoogle size={24} />
                <span className="font-semibold">Google</span>
            </button>
        </div>
    );
}
