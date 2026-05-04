import { NextResponse } from "next/server";
import { Resend } from "resend";

const contactEmail = process.env.CONTACT_EMAIL ?? "geral@adelinobcarvalho.pt";
const MAX_FILE_BYTES = 5 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = (formData.get("name") as string) ?? "";
    const email = (formData.get("email") as string) ?? "";
    const phone = (formData.get("phone") as string) ?? "";
    const city = (formData.get("city") as string) ?? "";
    const message = (formData.get("message") as string) ?? "";
    const cvFile = formData.get("cv") as File | null;

    if (!name || !email || !phone || !city) {
      return NextResponse.json({ error: "Campos obrigatórios em falta." }, { status: 400 });
    }

    if (cvFile && cvFile.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: "Ficheiro demasiado grande." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.log("Candidatura recebida:", { name, email, phone, city, message, cv: cvFile?.name });
      return NextResponse.json({ success: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    type Attachment = { filename: string; content: string };
    const attachments: Attachment[] = [];

    if (cvFile && cvFile.size > 0) {
      const buffer = await cvFile.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      attachments.push({ filename: cvFile.name, content: base64 });
    }

    await resend.emails.send({
      from: "website@adelinobcarvalho.pt",
      to: contactEmail,
      replyTo: email,
      subject: `Nova candidatura — ${name}`,
      attachments,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#1c3558;">Nova candidatura recebida</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:6px 0;font-weight:bold;color:#374151;width:120px;">Nome</td><td style="padding:6px 0;">${name}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold;color:#374151;">Email</td><td style="padding:6px 0;">${email}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold;color:#374151;">Telemóvel</td><td style="padding:6px 0;">${phone}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold;color:#374151;">Cidade</td><td style="padding:6px 0;">${city}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold;color:#374151;">Currículo</td><td style="padding:6px 0;">${cvFile ? cvFile.name : "Não enviado"}</td></tr>
          </table>
          ${message ? `<div style="margin-top:16px;padding:16px;background:#f8fafc;border-radius:8px;"><strong style="color:#374151;">Mensagem:</strong><p style="margin-top:8px;color:#1a1a2e;">${message.replace(/\n/g, "<br>")}</p></div>` : ""}
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Candidatura error:", error);
    return NextResponse.json({ error: "Erro ao enviar candidatura." }, { status: 500 });
  }
}
