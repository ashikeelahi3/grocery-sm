import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(request: Request) {
  const nextReq = new NextRequest(request.url, {
    headers: request.headers,
    method: request.method,
    body: request.body,
  });
  
  const { userId } = getAuth(nextReq);
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("grocery-mvp");

    // Find all orders for this user, sorted by newest first
    const orders = await db
      .collection("orders")
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
