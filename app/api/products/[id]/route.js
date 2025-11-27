import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
    try {
        const { id } = params;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, error: "Invalid product ID" },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("buyio-db");
        const productCollection = db.collection("products");

        const product = await productCollection.findOne({
            _id: new ObjectId(id),
        });

        if (!product) {
            return NextResponse.json(
                { success: false, error: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, product }, { status: 200 });

    } catch (error) {
        console.error("GET product by ID error:", error.message);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = params;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, message: "Invalid product ID" },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("buyio-db");
        const productCollection = db.collection("products");

        const result = await productCollection.deleteOne({
            _id: new ObjectId(id),
        });

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { success: false, message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Product deleted successfully",
        });

    } catch (error) {
        console.error("DELETE API Error:", error.message);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
