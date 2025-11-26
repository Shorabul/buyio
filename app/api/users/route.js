import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, image, createdAt } = body;

        if (!name || !email) {
            return NextResponse.json(
                { error: "Name and Email are required" },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("buyio-db");
        const usersCollection = db.collection("users");

        // Check if user already exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return NextResponse.json({
                success: true,
                message: "User already exists",
                user: existingUser
            });
        }

        // Insert new user
        const result = await usersCollection.insertOne({
            name,
            email,
            image,
            createdAt: createdAt || new Date(),
        });

        return NextResponse.json({
            success: true,
            id: result.insertedId,
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("buyio-db"); // Make sure DB name is consistent
        const usersCollection = db.collection("users");

        const users = await usersCollection.find({}).toArray();

        return NextResponse.json(users);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
