import nodemailer from "nodemailer";

function getTransporter() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com", // ✅ better than service: gmail
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function row(label, value) {
  if (value === undefined || value === null || value === "") return "";
  return `<p><b>${escapeHtml(label)}:</b> ${escapeHtml(value)}</p>`;
}

function buildContactEmail(doc) {
  const subject = doc.scheduleCall
    ? `New Contact (call requested) - ${doc.name}`
    : `New Contact - ${doc.name}`;

  const html = `
    <h2>New Contact Submission</h2>
    ${row("Name", doc.name)}
    ${row("Email", doc.email)}
    ${row("Phone", doc.phone)}
    ${row("Subject", doc.subject)}
    <p><b>Message:</b> ${escapeHtml(doc.message)}</p>
    ${
      doc.scheduleCall
        ? `
    <h3>Requested Call</h3>
    ${row("Date", doc.preferredDate)}
    ${row("Time", doc.preferredTime)}
    ${row("Notes", doc.notes)}
    `
        : ""
    }
  `;

  return { subject, html };
}

function buildAuditEmail(doc) {
  const subject = `New Technical Audit Request - ${doc.companyName}`;

  const html = `
    <h2>New Technical Audit Request</h2>
    ${row("Company name", doc.companyName)}
    ${row("Representative", doc.repName)}
    ${row("Company email", doc.companyEmail)}
    ${row("Phone", doc.phone)}
    ${row("Alt phone", doc.altPhone)}
    ${row("Product link", doc.productLink)}
    <p><b>Issue:</b> ${escapeHtml(doc.issue)}</p>
    ${doc.directions ? `<p><b>Directions:</b> ${escapeHtml(doc.directions)}</p>` : ""}
    ${row("Interaction type", doc.interactionType)}
    ${row("Contact method", doc.contactMethod)}
  `;

  return { subject, html };
}

export async function sendSubmissionNotification(doc) {
  try {
    const transporter = getTransporter();

    const { subject, html } =
      doc.type === "audit" ? buildAuditEmail(doc) : buildContactEmail(doc);

    const info = await transporter.sendMail({
      from: `"Submission Notifier" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject,
      html,
    });

    console.log("✅ Mail sent:", info.messageId);
  } catch (error) {
    console.error("❌ Mail failed:", error.message);
    // ❗ don't throw → keeps API stable (route.js already treats this as best-effort)
  }
}