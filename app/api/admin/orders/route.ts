import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import clientPromise from "@/lib/mongo";

export async function GET(_req: NextRequest) {
  const { sessionClaims } = await auth();
  const role = sessionClaims?.metadata?.role;

  if (role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const client = await clientPromise;
    const orders = await client.db("grocery-mvp").collection("orders").find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ error: "Fetch error" }, { status: 500 });
  }
}
