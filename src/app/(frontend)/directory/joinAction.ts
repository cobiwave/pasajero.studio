"use server";

import { Resend } from "resend";
import { z } from "zod";
import { getPayloadClient } from "@/lib/payload";

const JoinRequestSchema = z.object({
  name: z.string().trim().min(1),
  disciplines: z.array(z.string()).min(1),
  contact: z.string().trim().min(1),
});

export type JoinRequestState = {
  status: "idle" | "success" | "error";
};

export async function submitJoinRequest(
  _prevState: JoinRequestState,
  formData: FormData,
): Promise<JoinRequestState> {
  if (formData.get("website")) {
    return { status: "success" };
  }

  const parsed = JoinRequestSchema.safeParse({
    name: formData.get("name"),
    disciplines: formData.getAll("disciplines"),
    contact: formData.get("contact"),
  });

  if (!parsed.success) {
    return { status: "error" };
  }

  const payload = await getPayloadClient();

  const disciplines = await payload.find({
    collection: "disciplines",
    where: { name: { in: parsed.data.disciplines } },
    limit: parsed.data.disciplines.length,
  });

  if (disciplines.docs.length !== parsed.data.disciplines.length) {
    return { status: "error" };
  }

  try {
    await payload.create({
      collection: "artist-applications",
      data: {
        name: parsed.data.name,
        disciplines: disciplines.docs.map((discipline) => discipline.id),
        contact: parsed.data.contact,
        status: "new",
      },
    });
  } catch {
    return { status: "error" };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.JOIN_FORM_FROM_EMAIL ?? "onboarding@resend.dev",
      to: process.env.JOIN_FORM_TO_EMAIL!,
      replyTo: parsed.data.contact.includes("@")
        ? parsed.data.contact
        : undefined,
      subject: `Nueva solicitud — ${parsed.data.name}`,
      text: `Nombre: ${parsed.data.name}\nDisciplinas: ${parsed.data.disciplines.join(", ")}\nContacto: ${parsed.data.contact}`,
    });
  } catch (err) {
    console.error("Fallo el envio de email de notificacion de join request", err);
  }

  return { status: "success" };
}
