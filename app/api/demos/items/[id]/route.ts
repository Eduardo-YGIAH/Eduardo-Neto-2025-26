import { NextRequest, NextResponse } from "next/server";
import { updateItem, type DemoItem } from "../data";

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

type RouteParams = Promise<{ id: string }>;

export async function PUT(req: NextRequest, { params }: { params: RouteParams }) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const latency = Number(searchParams.get("delay") ?? 400);
  await delay(latency);
  const body = (await req.json()) as Partial<DemoItem>;
  const saved = updateItem({
    id,
    name: body.name ?? `Item ${id}`,
    category: body.category ?? "alpha",
    updatedAt: Date.now(),
  });
  return NextResponse.json(saved);
}


