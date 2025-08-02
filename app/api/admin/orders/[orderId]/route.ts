import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import clientPromise from "@/lib/mongo";
import { ObjectId } from "mongodb";

export async function PATCH(req: NextRequest, { params }: { params: { orderId: string } }) {
  try {
    const { sessionClaims } = await auth();
    if (sessionClaims?.metadata?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { status } = await req.json();
    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("grocery-mvp");

    const result = await db.collection("orders").updateOne(
      { _id: new ObjectId(params.orderId) },
      { $set: { status, updatedAt: new Date() } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Order not found or already updated" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order status updated successfully" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}
