import type { HealthResponse } from "@repo/types";
import { NextResponse } from "next/server";

export function GET() {
	return NextResponse.json<HealthResponse>({ ok: true });
}
