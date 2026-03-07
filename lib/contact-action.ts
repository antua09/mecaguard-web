"use server";

import { contactSchema, type ContactFormData } from "./validations";

export type ActionResult =
  | { success: true; message: string }
  | { success: false; errors: Partial<Record<keyof ContactFormData | "root", string>> };

export async function sendContactMessage(
  formData: ContactFormData
): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(formData);

  if (!parsed.success) {
    const errors: Partial<Record<keyof ContactFormData | "root", string>> = {};
    parsed.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof ContactFormData;
      errors[field] = issue.message;
    });
    return { success: false, errors };
  }

  // Simulate API delay
  await new Promise((r) => setTimeout(r, 800));

  // TODO: integrate with email service (Resend, SendGrid, etc.)
  console.log("New contact message:", parsed.data);

  return {
    success: true,
    message: "¡Mensaje recibido! Te responderemos en menos de 24 horas.",
  };
}
