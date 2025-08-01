import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import clientPromise from "@/lib/mongo";

export async function GET(req: Request) {
  const nextReq = new NextRequest(req.url, {
    headers: req.headers,
  });

  const { sessionClaims } = getAuth(nextReq);
  const role = sessionClaims?.metadata?.role;

  if (role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const client = await clientPromise;
  const db = client.db("grocery-mvp");

  const orders = await db
    .collection("orders")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json({ orders });
}
