import nodemailer from "nodemailer";

// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true pour 465, false pour les autres ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Interface pour les options d'email
interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
}

// Fonction pour envoyer un email
export async function sendEmail(options: EmailOptions) {
  try {
    const mailOptions = {
      from: options.from || process.env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return { success: false, error: error };
  }
}

// Fonction pour envoyer un email de bienvenue
export async function sendWelcomeEmail(email: string, name?: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Bienvenue sur Portfolio2 !</h1>
      <p>Bonjour ${name || "utilisateur"},</p>
      <p>Nous sommes ravis de vous accueillir sur notre plateforme.</p>
      <p>Votre compte a été créé avec succès.</p>
      <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
        <h3>Prochaines étapes :</h3>
        <ul>
          <li>Complétez votre profil</li>
          <li>Explorez nos fonctionnalités</li>
          <li>Contactez-nous si vous avez des questions</li>
        </ul>
      </div>
      <p>Cordialement,<br>L'équipe Portfolio2</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Bienvenue sur Portfolio2",
    html,
  });
}

// Fonction pour envoyer un email de réinitialisation de mot de passe
export async function sendPasswordResetEmail(email: string, resetLink: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Réinitialisation de mot de passe</h1>
      <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
      <p>Cliquez sur le lien ci-dessous pour créer un nouveau mot de passe :</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Réinitialiser le mot de passe
        </a>
      </div>
      <p>Ce lien expirera dans 1 heure.</p>
      <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
      <p>Cordialement,<br>L'équipe Portfolio2</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Réinitialisation de mot de passe - Portfolio2",
    html,
  });
}

// Fonction pour envoyer un email de notification
export async function sendNotificationEmail(
  email: string,
  subject: string,
  message: string
) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">${subject}</h1>
      <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
        ${message}
      </div>
      <p>Cordialement,<br>L'équipe Portfolio2</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject,
    html,
  });
}
