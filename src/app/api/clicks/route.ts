import { NextResponse } from "next/server";
import { getMongoClient } from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await getMongoClient();
    const db = client.db();
    const docs = await db
      .collection("linkClicks")
      .find({}, { projection: { linkId: 1, count: 1, _id: 0 } })
      .toArray();

    const counts: Record<string, number> = {};
    for (const doc of docs) {
      counts[doc.linkId as string] = (doc.count as number) ?? 0;
    }

    return NextResponse.json({ counts });
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return NextResponse.json({ counts: {} }, { status: 500 });
  }
}
