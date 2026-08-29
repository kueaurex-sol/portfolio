// // import { NextResponse } from "next/server";
// // import { connectDB } from "@/lib/mongoose";
// // import Submission from "@/models/Submission";

// // const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// // function badRequest(error) {
// //   return NextResponse.json({ ok: false, error }, { status: 400 });
// // }

// // export async function POST(request) {
// //   let body;
// //   try {
// //     body = await request.json();
// //   } catch {
// //     return badRequest("Invalid request body.");
// //   }

// //   const { type, name, email, website } = body;

// //   // Honeypot: real visitors never see or fill this field (it's visually
// //   // hidden off-screen, not display:none, since bots often skip fields
// //   // that are display:none). If it's filled, report success anyway so
// //   // bots don't learn to look for a different tell — just don't save it.
// //   if (website) {
// //     return NextResponse.json({ ok: true });
// //   }

// //   if (type !== "message" && type !== "call") {
// //     return badRequest("Unknown request type.");
// //   }
// //   if (!name || typeof name !== "string" || name.trim().length < 2) {
// //     return badRequest("Enter your name.");
// //   }
// //   if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
// //     return badRequest("Enter a valid email address.");
// //   }

// //   const doc = {
// //     type,
// //     name: name.trim().slice(0, 200),
// //     email: email.trim().toLowerCase().slice(0, 200),
// //   };

// //   if (type === "message") {
// //     const { subject, message } = body;
// //     if (!message || typeof message !== "string" || message.trim().length < 10) {
// //       return badRequest("Add a little more detail to your message (10+ characters).");
// //     }
// //     doc.subject = String(subject || "").trim().slice(0, 200);
// //     doc.message = message.trim().slice(0, 5000);
// //   } else {
// //     const { date, time, phone, notes } = body;
// //     if (!date || !time) {
// //       return badRequest("Pick a date and time for the call.");
// //     }
// //     const when = new Date(`${date}T${time}`);
// //     if (Number.isNaN(when.getTime())) {
// //       return badRequest("That date and time don't look right.");
// //     }
// //     if (when.getTime() < Date.now()) {
// //       return badRequest("Pick a time in the future.");
// //     }
// //     doc.phone = String(phone || "").trim().slice(0, 40);
// //     doc.notes = String(notes || "").trim().slice(0, 2000);
// //     doc.preferredDate = date; // raw "YYYY-MM-DD" as picked, for display
// //     doc.preferredTime = time; // raw "HH:MM" as picked, for display
// //     doc.scheduledFor = when; // combined Date, for sorting/reminders
// //   }

// //   try {
// //     await connectDB();
// //     await Submission.create(doc);
// //   } catch (err) {
// //     // Schema-level validation (belt-and-suspenders on top of the manual
// //     // checks above — catches anything those didn't, like a message that
// //     // slipped through at exactly 10 chars of whitespace).
// //     if (err.name === "ValidationError") {
// //       const firstError = Object.values(err.errors)[0];
// //       return badRequest(firstError?.message || "Some fields aren't valid.");
// //     }
// //     console.error("contact submission failed:", err);
// //     return NextResponse.json(
// //       { ok: false, error: "Something went wrong on our end. Please try again." },
// //       { status: 500 }
// //     );
// //   }

// //   return NextResponse.json({ ok: true });
// // }


// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongoose";
// import Submission from "@/models/Submission";

// const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// function badRequest(error) {
//   return NextResponse.json({ ok: false, error }, { status: 400 });
// }

// export async function POST(request) {
//   let body;
//   try {
//     body = await request.json();
//   } catch {
//     return badRequest("Invalid request body.");
//   }

//   const { type, website } = body;

//   if (website) {
//     return NextResponse.json({ ok: true });
//   }

//   if (type !== "message" && type !== "call" && type !== "audit") {
//     return badRequest("Unknown request type.");
//   }

//   const doc = { type };

//   if (type === "message") {
//     const { name, email, subject, message } = body;
//     if (!name || typeof name !== "string" || name.trim().length < 2) {
//       return badRequest("Enter your name.");
//     }
//     if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
//       return badRequest("Enter a valid email address.");
//     }
//     if (!message || typeof message !== "string" || message.trim().length < 10) {
//       return badRequest("Add a little more detail to your message (10+ characters).");
//     }
//     doc.name = name.trim().slice(0, 200);
//     doc.email = email.trim().toLowerCase().slice(0, 200);
//     doc.subject = String(subject || "").trim().slice(0, 200);
//     doc.message = message.trim().slice(0, 5000);
//   } else if (type === "call") {
//     const { name, email, date, time, phone, notes } = body;
//     if (!name || typeof name !== "string" || name.trim().length < 2) {
//       return badRequest("Enter your name.");
//     }
//     if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
//       return badRequest("Enter a valid email address.");
//     }
//     if (!date || !time) {
//       return badRequest("Pick a date and time for the call.");
//     }
//     const when = new Date(`${date}T${time}`);
//     if (Number.isNaN(when.getTime())) {
//       return badRequest("That date and time don't look right.");
//     }
//     if (when.getTime() < Date.now()) {
//       return badRequest("Pick a time in the future.");
//     }
//     doc.name = name.trim().slice(0, 200);
//     doc.email = email.trim().toLowerCase().slice(0, 200);
//     doc.phone = String(phone || "").trim().slice(0, 40);
//     doc.notes = String(notes || "").trim().slice(0, 2000);
//     doc.preferredDate = date;
//     doc.preferredTime = time;
//     doc.scheduledFor = when;
//   } else {
//     // type === "audit"
//     const {
//       companyName,
//       repName,
//       companyEmail,
//       phone,
//       altPhone,
//       productLink,
//       issue,
//       directions,
//       interactionType,
//       contactMethod,
//     } = body;

//     if (!companyName || typeof companyName !== "string" || companyName.trim().length < 2) {
//       return badRequest("Enter your company name.");
//     }
//     if (!repName || typeof repName !== "string" || repName.trim().length < 2) {
//       return badRequest("Enter the representative's name.");
//     }
//     if (!companyEmail || typeof companyEmail !== "string" || !EMAIL_RE.test(companyEmail.trim())) {
//       return badRequest("Enter a valid company email address.");
//     }
//     if (!phone || typeof phone !== "string" || phone.trim().length < 5) {
//       return badRequest("Enter a phone number.");
//     }
//     if (!productLink || typeof productLink !== "string" || productLink.trim().length < 3) {
//       return badRequest("Add a link to the website, app, or product.");
//     }
//     if (!issue || typeof issue !== "string" || issue.trim().length < 10) {
//       return badRequest("Describe the issue in a bit more detail (10+ characters).");
//     }
//     if (interactionType !== "report" && interactionType !== "meeting") {
//       return badRequest("Let us know whether you'd like a report or a meeting.");
//     }
//     if (contactMethod !== "whatsapp" && contactMethod !== "email") {
//       return badRequest("Pick how we should send the report.");
//     }

//     doc.companyName = companyName.trim().slice(0, 200);
//     doc.repName = repName.trim().slice(0, 200);
//     doc.companyEmail = companyEmail.trim().toLowerCase().slice(0, 200);
//     doc.phone = phone.trim().slice(0, 40);
//     doc.altPhone = String(altPhone || "").trim().slice(0, 40);
//     doc.productLink = productLink.trim().slice(0, 500);
//     doc.issue = issue.trim().slice(0, 3000);
//     doc.directions = String(directions || "").trim().slice(0, 2000);
//     doc.interactionType = interactionType;
//     doc.contactMethod = contactMethod;
//     // name/email kept in sync with the shared schema fields so the
//     // Submission model's base name/email requirement is satisfied too
//     doc.name = doc.repName;
//     doc.email = doc.companyEmail;
//   }

//   try {
//     await connectDB();
//     await Submission.create(doc);
//   } catch (err) {
//     if (err.name === "ValidationError") {
//       const firstError = Object.values(err.errors)[0];
//       return badRequest(firstError?.message || "Some fields aren't valid.");
//     }
//     console.error("contact submission failed:", err);
//     return NextResponse.json(
//       { ok: false, error: "Something went wrong on our end. Please try again." },
//       { status: 500 }
//     );
//   }

//   return NextResponse.json({ ok: true });
// }
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Submission from "@/models/Submission";
import { sendSubmissionNotification } from "@/lib/mail";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function badRequest(error) {
  return NextResponse.json({ ok: false, error }, { status: 400 });
}

function conflict(error) {
  return NextResponse.json({ ok: false, error }, { status: 409 });
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid request body.");
  }

  const { type, website } = body;

  if (website) {
    // Honeypot tripped — pretend success, do nothing.
    return NextResponse.json({ ok: true });
  }

  if (type !== "contact" && type !== "audit") {
    return badRequest("Unknown request type.");
  }

  const doc = { type };
  let emailForLookup;

  if (type === "contact") {
    const { name, email, phone, subject, message, scheduleCall, date, time, notes } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return badRequest("Enter your name.");
    }
    if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
      return badRequest("Enter a valid email address.");
    }
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return badRequest("Add a little more detail to your message (10+ characters).");
    }

    const wantsCall = scheduleCall === "yes" || scheduleCall === true;

    if (wantsCall) {
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
      doc.preferredDate = date;
      doc.preferredTime = time;
      doc.scheduledFor = when;
    }

    doc.name = name.trim().slice(0, 200);
    doc.email = email.trim().toLowerCase().slice(0, 200);
    doc.phone = String(phone || "").trim().slice(0, 40);
    doc.subject = String(subject || "").trim().slice(0, 200);
    doc.message = message.trim().slice(0, 5000);
    doc.scheduleCall = wantsCall;
    doc.notes = String(notes || "").trim().slice(0, 2000);

    emailForLookup = doc.email;
  } else {
    // type === "audit"
    const {
      companyName,
      repName,
      companyEmail,
      phone,
      altPhone,
      productLink,
      issue,
      directions,
      interactionType,
      contactMethod,
    } = body;

    if (!companyName || typeof companyName !== "string" || companyName.trim().length < 2) {
      return badRequest("Enter your company name.");
    }
    if (!repName || typeof repName !== "string" || repName.trim().length < 2) {
      return badRequest("Enter the representative's name.");
    }
    if (!companyEmail || typeof companyEmail !== "string" || !EMAIL_RE.test(companyEmail.trim())) {
      return badRequest("Enter a valid company email address.");
    }
    if (!phone || typeof phone !== "string" || phone.trim().length < 5) {
      return badRequest("Enter a phone number.");
    }
    if (!productLink || typeof productLink !== "string" || productLink.trim().length < 3) {
      return badRequest("Add a link to the website, app, or product.");
    }
    if (!issue || typeof issue !== "string" || issue.trim().length < 10) {
      return badRequest("Describe the issue in a bit more detail (10+ characters).");
    }
    if (!["report", "meeting", "both"].includes(interactionType)) {
      return badRequest("Let us know whether you'd like a report, a meeting, or both.");
    }
    if (!["whatsapp", "email", "both"].includes(contactMethod)) {
      return badRequest("Pick how we should send the report.");
    }

    doc.companyName = companyName.trim().slice(0, 200);
    doc.repName = repName.trim().slice(0, 200);
    doc.companyEmail = companyEmail.trim().toLowerCase().slice(0, 200);
    doc.phone = phone.trim().slice(0, 40);
    doc.altPhone = String(altPhone || "").trim().slice(0, 40);
    doc.productLink = productLink.trim().slice(0, 500);
    doc.issue = issue.trim().slice(0, 3000);
    doc.directions = String(directions || "").trim().slice(0, 2000);
    doc.interactionType = interactionType;
    doc.contactMethod = contactMethod;
    // name/email kept in sync with the shared schema fields so the
    // Submission model's base name/email requirement is satisfied too
    doc.name = doc.repName;
    doc.email = doc.companyEmail;

    emailForLookup = doc.email;
  }

  try {
    await connectDB();

    // Friendly pre-check so most spammy resubmits get a clean message
    // instead of a raw duplicate-key error.
    const existing = await Submission.findOne({ email: emailForLookup });
    if (existing) {
      return conflict(
        "A request from this email address has already been submitted. We've got it and will be in touch soon — no need to send another."
      );
    }

    const created = await Submission.create(doc);

    // Notification email is best-effort — a failure here never fails
    // the request, since the submission is already safely saved.
    try {
      await sendSubmissionNotification(created.toObject());
    } catch (mailErr) {
      console.error("submission notification email failed:", mailErr);
    }
  } catch (err) {
    // Backstop for the race where two requests with the same email pass
    // the findOne check above at nearly the same instant — the unique
    // index on `email` catches it here instead.
    if (err.code === 11000) {
      return conflict(
        "A request from this email address has already been submitted. We've got it and will be in touch soon — no need to send another."
      );
    }
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