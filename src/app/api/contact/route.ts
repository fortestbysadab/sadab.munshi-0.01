import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

/**
 * Contact form endpoint.
 *
 * Sends a real email via Resend (https://resend.com).
 *
 * Required environment variables (see .env.example):
 *   RESEND_API_KEY   – your Resend API key
 *   CONTACT_TO       – inbox that receives messages (defaults to site.email)
 *   CONTACT_FROM     – verified sender, e.g. "Website <noreply@sadabmunshi.online>"
 */

const TO_EMAIL = process.env.CONTACT_TO || site.email;
// Until your own domain is verified in Resend, you can use their shared
// onboarding sender for testing: "onboarding@resend.dev".
const FROM_EMAIL = process.env.CONTACT_FROM || "Website <onboarding@resend.dev>";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; message?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request." },
      { status: 400 }
    );
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  // --- Validation ---
  if (!name || !email || !message) {
    return NextResponse.json({
      success: false,
      message: "Please fill in all fields.",
    });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({
      success: false,
      message: "Please enter a valid email address.",
    });
  }

  if (message.length < 10) {
    return NextResponse.json({
      success: false,
      message: "Message is too short. Please write at least 10 characters.",
    });
  }

  // --- Send the email ---
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // No key configured (e.g. local dev without secrets) — don't fail silently
    // in a confusing way; log so the form still works end-to-end while you
    // finish setup.
    console.warn(
      "[contact] RESEND_API_KEY is not set — message not emailed:",
      { name, email, message }
    );
    return NextResponse.json({
      success: false,
      message:
        "The email service isn't configured yet. Please email me directly for now.",
    });
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New message from ${name} — ${site.name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: ui-sans-serif, system-ui, sans-serif; color:#171717; line-height:1.6;">
          <h2 style="margin:0 0 16px; font-size:18px;">New contact message</h2>
          <p style="margin:0 0 4px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin:0 0 4px;"><strong>Email:</strong>
            <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
          </p>
          <p style="margin:16px 0 8px;"><strong>Message:</strong></p>
          <p style="margin:0; white-space:pre-wrap; padding:12px 16px; background:#fafafa; border-radius:8px;">${escapeHtml(
            message
          )}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({
        success: false,
        // Surface the real reason (helps diagnose sender/domain issues).
        message: `Could not send: ${error.message || "email service error"}`,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your message. I will get back to you soon.",
    });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
}

export function GET() {
  return NextResponse.json(
    { success: false, message: "Method not allowed." },
    { status: 405 }
  );
}
