import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import clientPromise from "@/lib/mongo";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { items, name, phone, address, total } = await req.json();
  if (!items?.length || !name || !phone || !address) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  const orderDoc = { userId, name, phone, address, items, total, status: "pending", createdAt: new Date(), updatedAt: new Date() };

  try {
    const client = await clientPromise;
    const db = client.db("grocery-mvp");
    const result = await db.collection("orders").insertOne(orderDoc);
    return NextResponse.json({ message: "Order placed", orderId: result.insertedId });
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
