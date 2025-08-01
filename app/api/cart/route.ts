import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';


export async function GET(request: Request) {
  const nextReq = new NextRequest(request.url, {
    headers: request.headers,
    method: request.method,
    body: request.body,
  }); 
  const { userId } = getAuth(nextReq);

  if (!userId) return NextResponse.json({ items: [] });

  const client = await clientPromise;
  const db = client.db("grocery-mvp");
  const record = await db.collection("carts").findOne({ userId });
  return NextResponse.json({ items: record?.items || [] });
}

export async function POST(request: Request) {
  const nextReq = new NextRequest(request.url, {
    headers: request.headers,
    method: request.method,
    body: request.body,
  });
  const { userId } = getAuth(nextReq);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { items } = await request.json();
  const client = await clientPromise;
  const db = client.db("grocery-mvp");

  await db
    .collection("carts")
    .updateOne({ userId }, { $set: { items } }, { upsert: true });

  return NextResponse.json({ message: "Cart updated" });
}

export async function DELETE(request: Request) {
  const nextReq = new NextRequest(request.url, {
    headers: request.headers,
    method: request.method,
    body: request.body,
  });
  const { userId } = getAuth(nextReq);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("grocery-mvp");

  // Remove the cart document for this user or clear items array
  await db.collection("carts").updateOne(
    { userId },
    { $set: { items: [] } }
  );

  return NextResponse.json({ message: "Cart cleared" });
}
