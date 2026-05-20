import nodemailer from "nodemailer";

export const runtime = "nodejs";

const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL || "contact@david-chambaud.fr";
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "David Chambaud <contact@david-chambaud.fr>";

type ContactField =
  | "name"
  | "email"
  | "eventType"
  | "location"
  | "guests"
  | "date"
  | "message";

type ContactPayload = Record<ContactField, string> & {
  website?: string;
};

type FieldErrors = Partial<Record<ContactField, string>>;

const requiredFields = [
  ["name", "Indiquez votre nom."],
  ["email", "Indiquez une adresse email."],
  ["eventType", "Précisez le type d'événement."],
  ["message", "Ajoutez quelques mots sur votre demande."],
] as const satisfies readonly (readonly [ContactField, string])[];

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validateContactPayload(payload: Partial<ContactPayload>) {
  const errors: FieldErrors = {};

  requiredFields.forEach(([field, message]) => {
    if (!clean(payload[field])) {
      errors[field] = message;
    }
  });

  const email = clean(payload.email);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "L'adresse email semble incomplète.";
  }

  return errors;
}

function buildTextEmail(payload: ContactPayload) {
  const lines = [
    "Nouvelle demande depuis le formulaire david-chambaud.fr",
    "",
    `Nom: ${payload.name}`,
    `Email: ${payload.email}`,
    `Type d'événement: ${payload.eventType}`,
    `Lieu: ${payload.location || "Non précisé"}`,
    `Invités: ${payload.guests || "Non précisé"}`,
    `Date: ${payload.date || "Non précisée"}`,
    "",
    "Message:",
    payload.message,
  ];

  return lines.join("\n");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildHtmlEmail(payload: ContactPayload) {
  const rows = [
    ["Nom", payload.name],
    ["Email", payload.email],
    ["Type d'événement", payload.eventType],
    ["Lieu", payload.location || "Non précisé"],
    ["Invités", payload.guests || "Non précisé"],
    ["Date", payload.date || "Non précisée"],
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#1f2421;line-height:1.6">
      <h1 style="font-size:20px">Nouvelle demande de contact</h1>
      <table style="border-collapse:collapse;width:100%;max-width:640px">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="padding:8px 12px;border:1px solid #e7e0d2;font-weight:bold">${label}</td>
                <td style="padding:8px 12px;border:1px solid #e7e0d2">${escapeHtml(value)}</td>
              </tr>
            `,
          )
          .join("")}
      </table>
      <h2 style="font-size:16px;margin-top:24px">Message</h2>
      <p style="white-space:pre-wrap">${escapeHtml(payload.message)}</p>
    </div>
  `;
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;

  try {
    body = (await request.json()) as Partial<ContactPayload>;
  } catch {
    return Response.json(
      { message: "La demande est invalide." },
      { status: 400 },
    );
  }

  if (clean(body.website)) {
    return Response.json({ ok: true });
  }

  const payload: ContactPayload = {
    name: clean(body.name),
    email: clean(body.email),
    eventType: clean(body.eventType),
    location: clean(body.location),
    guests: clean(body.guests),
    date: clean(body.date),
    message: clean(body.message),
  };

  const errors = validateContactPayload(payload);
  if (Object.keys(errors).length > 0) {
    return Response.json(
      { message: "Merci de vérifier les champs du formulaire.", errors },
      { status: 400 },
    );
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return Response.json(
      {
        message:
          "L'envoi email n'est pas encore configuré. Merci d'appeler ou d'écrire directement à contact@david-chambaud.fr.",
      },
      { status: 500 },
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: payload.email,
      subject: `Nouvelle demande traiteur - ${payload.name}`,
      text: buildTextEmail(payload),
      html: buildHtmlEmail(payload),
    });
  } catch {
    return Response.json(
      {
        message:
          "Impossible d'envoyer le message pour le moment. Merci d'essayer à nouveau ou d'écrire directement à contact@david-chambaud.fr.",
      },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
