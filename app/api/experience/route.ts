import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getAllExperiences, createExperience } from "@/lib/experience";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const featuredOnly = searchParams.get("featured") === "true";
    const experiences = await getAllExperiences({ featuredOnly });
    return NextResponse.json(experiences);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch experiences" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized: Super Admin access required." }, { status: 401 });
    }

    const body = await req.json();
    if (!body.company || !body.role) {
      return NextResponse.json({ error: "Company and Role are required." }, { status: 400 });
    }

    const created = await createExperience({
      company: body.company,
      role: body.role,
      location: body.location || null,
      period: body.period || "Present",
      startDate: body.startDate ? new Date(body.startDate) : null,
      endDate: body.endDate ? new Date(body.endDate) : null,
      current: Boolean(body.current),
      description: body.description || null,
      highlights: Array.isArray(body.highlights) ? body.highlights : [],
      skills: Array.isArray(body.skills) ? body.skills : [],
      displayOrder: Number(body.displayOrder) || 0,
      featured: body.featured !== false,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create experience" }, { status: 500 });
  }
}
