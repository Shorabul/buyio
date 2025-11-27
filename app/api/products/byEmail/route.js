import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");

        if (!email) {
            return NextResponse.json(
                { success: false, error: "Email is required" },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("buyio-db");
        const productCollection = db.collection("products");

        // Find products added by this user
        const products = await productCollection.find({ sellerEmail: email }).toArray();

        return NextResponse.json({ success: true, products }, { status: 200 });
    } catch (error) {
        console.error("Error fetching products by email:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
