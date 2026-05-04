import { NextResponse } from "next/server";
import { Resend } from "resend";

const contactEmail = process.env.CONTACT_EMAIL ?? "geral@adelinobcarvalho.pt";

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      name: string;
      phone: string;
      email: string;
      service: string;
      message: string;
    };

    if (!process.env.RESEND_API_KEY) {
      // Resend not configured — log and return success for development
      console.log("Contact form submission:", body);
      return NextResponse.json({ success: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "website@adelinobcarvalho.pt",
      to: contactEmail,
      replyTo: body.email,
      subject: `Novo pedido de orçamento — ${body.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1c3558;">Novo pedido de contacto</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Nome</td><td style="padding: 8px 0;">${body.name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Telefone</td><td style="padding: 8px 0;">${body.phone}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Email</td><td style="padding: 8px 0;">${body.email}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Serviço</td><td style="padding: 8px 0;">${body.service}</td></tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f8fafc; border-radius: 8px;">
            <strong style="color: #374151;">Mensagem:</strong>
            <p style="margin-top: 8px; color: #1a1a2e;">${body.message.replace(/\n/g, "<br>")}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Erro ao enviar mensagem. Tente novamente." },
      { status: 500 }
    );
  }
}
