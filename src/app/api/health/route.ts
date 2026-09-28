import { sql } from "drizzle-orm";
import { apiErrorResponse, ApiError } from "@/lib/api-error";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { db } = await import("@/db/client");
    await db.execute(sql`select 1`);
    return Response.json({ status: "ok", database: "ok" });
  } catch {
    return apiErrorResponse(
      new ApiError("INTERNAL_ERROR", "Database unavailable."),
    );
  }
}
