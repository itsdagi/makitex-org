import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save the inquiry to Supabase for admin visibility
    await supabase.from("inquiries").insert([{
      name,
      email,
      phone: phone || null,
      message,
      service: "General Contact",
      budget: null,
      timeline: null,
      created_at: new Date().toISOString(),
    }]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
