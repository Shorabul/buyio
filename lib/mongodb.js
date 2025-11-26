import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
    throw new Error("Please add MONGODB_URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
    // Use global to avoid multiple connections
    if (!global._mongoClient) {
        global._mongoClient = new MongoClient(uri, options);
    }
    client = global._mongoClient;
} else {
    client = new MongoClient(uri, options);
}

clientPromise = client.connect();

export default clientPromise;