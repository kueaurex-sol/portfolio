import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Submission from "@/models/Submission";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function badRequest(error) {
  return NextResponse.json({ ok: false, error }, { status: 400 });
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid request body.");
  }

  const { type, name, email, website } = body;

  // Honeypot: real visitors never see or fill this field (it's visually
  // hidden off-screen, not display:none, since bots often skip fields
  // that are display:none). If it's filled, report success anyway so
  // bots don't learn to look for a different tell — just don't save it.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (type !== "message" && type !== "call") {
    return badRequest("Unknown request type.");
  }
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return badRequest("Enter your name.");
  }
  if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return badRequest("Enter a valid email address.");
  }

  const doc = {
    type,
    name: name.trim().slice(0, 200),
    email: email.trim().toLowerCase().slice(0, 200),
  };

  if (type === "message") {
    const { subject, message } = body;
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return badRequest("Add a little more detail to your message (10+ characters).");
    }
    doc.subject = String(subject || "").trim().slice(0, 200);
    doc.message = message.trim().slice(0, 5000);
  } else {
    const { date, time, phone, notes } = body;
    if (!date || !time) {
      return badRequest("Pick a date and time for the call.");
    }
    const when = new Date(`${date}T${time}`);
    if (Number.isNaN(when.getTime())) {
      return badRequest("That date and time don't look right.");
    }
    if (when.getTime() < Date.now()) {
      return badRequest("Pick a time in the future.");
    }
    doc.phone = String(phone || "").trim().slice(0, 40);
    doc.notes = String(notes || "").trim().slice(0, 2000);
    doc.preferredDate = date; // raw "YYYY-MM-DD" as picked, for display
    doc.preferredTime = time; // raw "HH:MM" as picked, for display
    doc.scheduledFor = when; // combined Date, for sorting/reminders
  }

  try {
    await connectDB();
    await Submission.create(doc);
  } catch (err) {
    // Schema-level validation (belt-and-suspenders on top of the manual
    // checks above — catches anything those didn't, like a message that
    // slipped through at exactly 10 chars of whitespace).
    if (err.name === "ValidationError") {
      const firstError = Object.values(err.errors)[0];
      return badRequest(firstError?.message || "Some fields aren't valid.");
    }
    console.error("contact submission failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our end. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}