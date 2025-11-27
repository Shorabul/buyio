import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("buyio-db");
        const productcollection = db.collection("products");

        // Return selected fields only
        const products = await productcollection
            .find({}, {
                projection: {
                    _id: 1,
                    image: 1,
                    title: 1,
                    price: 1,
                    category: 1,
                }
            })
            .toArray();

        return NextResponse.json({
            success: true,
            products,
        });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}



export async function POST(req) {
    try {
        const data = await req.json();
        const client = await clientPromise;
        const db = client.db("buyio-db"); //database name
        const productcollection = db.collection("products");

        const result = await productcollection.insertOne({
            ...data,
            createdAt: new Date(),
        });

        return NextResponse.json({ status: "success", id: result.insertedId });
    } catch (error) {
        return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
    }
}