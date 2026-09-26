import { NextRequest, NextResponse } from "next/server";
import { getMongoClient } from "@/lib/mongodb";
import { links } from "@/config/links";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const link = links.find((item) => item.id === id);

  if (!link) {
    return NextResponse.json({ error: "존재하지 않는 링크입니다." }, { status: 404 });
  }

  try {
    const client = await getMongoClient();
    const db = client.db();
    await db
      .collection("linkClicks")
      .updateOne({ linkId: id }, { $inc: { count: 1 } }, { upsert: true });
  } catch (error) {
    console.error("클릭 수 기록 실패:", error);
  }

  return NextResponse.redirect(link.url);
}
