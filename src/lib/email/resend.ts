import { Resend } from "resend";
import { env } from "@/config/env";

const resend = new Resend(env.RESEND_API_KEY);

export interface EmailData {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export const sendEmail = async (data: EmailData) => {
  try {
    const result = await resend.emails.send({
      from: data.from || "noreply@yourdomain.com",
      to: data.to,
      subject: data.subject,
      html: data.html,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Erreur lors de l'envoi d'email:", error);
    return { success: false, error };
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  return sendEmail({
    to: email,
    subject: "Bienvenue sur Portfolio2 !",
    html: `
      <h1>Bienvenue ${name} !</h1>
      <p>Merci de vous être inscrit sur Portfolio2.</p>
      <p>Nous sommes ravis de vous accueillir dans notre communauté.</p>
    `,
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  resetToken: string
) => {
  const resetUrl = `${env.APP_URL}/reset-password?token=${resetToken}`;

  return sendEmail({
    to: email,
    subject: "Réinitialisation de votre mot de passe",
    html: `
      <h1>Réinitialisation de mot de passe</h1>
      <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
      <p>Cliquez sur le lien ci-dessous pour définir un nouveau mot de passe :</p>
      <a href="${resetUrl}">Réinitialiser le mot de passe</a>
      <p>Ce lien expire dans 1 heure.</p>
    `,
  });
};
