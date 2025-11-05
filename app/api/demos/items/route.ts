import { NextRequest, NextResponse } from "next/server";
import { listItems } from "./data";

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter");
  const latency = Number(searchParams.get("delay") ?? 400);
  const errorRate = Number(searchParams.get("error") ?? 0);

  await delay(latency);
  if (Math.random() < errorRate) {
    return NextResponse.json({ message: "Random demo error" }, { status: 500 });
  }

  const data = listItems(filter);
  return NextResponse.json({ items: data });
}


