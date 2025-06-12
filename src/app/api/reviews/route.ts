// app/api/reviews/route.ts (GET /api/reviews?name=Starbucks)
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    if (!name) {
        return NextResponse.json({ error: "Missing place name" }, { status: 400 });
    }

    const apiKey = "AIzaSyB0Q01nC4pAqDSyJrBSlQgiUgJ6jtC0ZOM";

    // 1. Obtener el place_id
    const findPlaceUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(name)}&inputtype=textquery&fields=place_id&key=${apiKey}`;
    const placeRes = await fetch(findPlaceUrl);
    const placeData = await placeRes.json();
    const placeId = placeData?.candidates?.[0]?.place_id;

    if (!placeId) {
        return NextResponse.json({ error: "Place not found" }, { status: 404 });
    }

    // 2. Obtener detalles con reviews
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`;
    const detailsRes = await fetch(detailsUrl);
    const detailsData = await detailsRes.json();

    const reviews = detailsData?.result?.reviews || [];

    return NextResponse.json({ name: detailsData.result.name, reviews });
}
