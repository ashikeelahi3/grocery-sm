import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(request: Request) {
  // Create a NextRequest object to use with Clerk's getAuth
  const nextReq = new NextRequest(request.url, {
    headers: request.headers,
    method: request.method,
    body: request.body,
  });

  // Get userId from the authenticated user
  const { userId } = getAuth(nextReq);

  // If no userId, unauthorized
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse JSON body to get items array
  const { items } = await request.json();

  // Validate items: must be a non-empty array
  if (!items || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
  }

  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("grocery-mvp");

    // Calculate total price for the order
    const total = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantityInCart,
      0
    );

    // Create order document to insert
    const orderDoc = {
      userId,
      items,
      total,
      status: "pending", // default status
      createdAt: new Date(),
    };

    // Insert into "orders" collection
    const result = await db.collection("orders").insertOne(orderDoc);

    // Return success with inserted orderId
    return NextResponse.json({ message: "Order placed", orderId: result.insertedId });
  } catch (error) {
    // Log and return error response
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
