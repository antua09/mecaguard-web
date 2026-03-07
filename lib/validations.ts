import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(80, "El nombre es demasiado largo"),
  email: z
    .string()
    .email("Introduce un correo electrónico válido"),
  subject: z
    .string()
    .min(4, "El asunto debe tener al menos 4 caracteres")
    .max(120, "El asunto es demasiado largo"),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(2000, "El mensaje es demasiado largo"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
