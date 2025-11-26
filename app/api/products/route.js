import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("buyio-db"); //database name
        const productcollection = db.collection("products");

        const products = await productcollection.find({}).toArray();

        return NextResponse.json({ products });
    } catch (error) {
        return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
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