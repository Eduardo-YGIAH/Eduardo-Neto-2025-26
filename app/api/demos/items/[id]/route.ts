import { NextRequest, NextResponse } from "next/server";
import { updateItem, type DemoItem } from "../data";

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { searchParams } = new URL(req.url);
  const latency = Number(searchParams.get("delay") ?? 400);
  await delay(latency);
  const body = (await req.json()) as Partial<DemoItem>;
  const saved = updateItem({
    id: params.id,
    name: body.name ?? `Item ${params.id}`,
    category: body.category ?? "alpha",
    updatedAt: Date.now(),
  });
  return NextResponse.json(saved);
}


