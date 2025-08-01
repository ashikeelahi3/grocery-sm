import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("grocery-mvp");
  const products = await db.collection("products").find().toArray();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const product = await request.json();

  const client = await clientPromise;
  const db = client.db("grocery-mvp");
  const collection = db.collection("products");

  // Add createdAt date
  const newProduct = { ...product, createdAt: new Date() };
  const result = await collection.insertOne(newProduct);

  return NextResponse.json({ message: "Product added", id: result.insertedId });
}