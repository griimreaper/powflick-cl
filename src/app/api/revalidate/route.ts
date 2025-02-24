import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
    try {
        revalidatePath("/"); // 🔹 Revalida la página principal
        return NextResponse.json({ revalidated: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 });
    }
}
