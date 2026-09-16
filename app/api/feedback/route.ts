import { NextResponse } from "next/server";

type Body = {
  message?: string;
  email?: string;
  kind?: string;
  page?: string;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const message = body.message?.trim();
  if (!message || message.length > 4000) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  const payload = {
    message,
    email: body.email?.trim() || null,
    kind: body.kind || "other",
    page: body.page || "/",
    at: new Date().toISOString(),
  };

  console.info("[firmstack-feedback]", JSON.stringify(payload));

  return NextResponse.json({ ok: true });
}
