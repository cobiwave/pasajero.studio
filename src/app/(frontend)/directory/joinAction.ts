"use server";

import { Resend } from "resend";
import { z } from "zod";

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

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: process.env.JOIN_FORM_FROM_EMAIL ?? "onboarding@resend.dev",
      to: process.env.JOIN_FORM_TO_EMAIL!,
      replyTo: parsed.data.contact.includes("@")
        ? parsed.data.contact
        : undefined,
      subject: `Nueva solicitud — ${parsed.data.name}`,
      text: `Nombre: ${parsed.data.name}\nDisciplinas: ${parsed.data.disciplines.join(", ")}\nContacto: ${parsed.data.contact}`,
    });
  } catch {
    return { status: "error" };
  }

  return { status: "success" };
}
