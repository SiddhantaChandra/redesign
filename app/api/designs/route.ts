import { NextResponse } from "next/server";
import designsData from "@/generated/designs.json";

export const revalidate = 120; // 2 minutes

export async function GET() {
  return NextResponse.json(designsData, {
    headers: {
      "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
    },
  });
}
