// Configuration des variables d'environnement
export const env = {
  // Email Configuration (Resend)
  RESEND_API_KEY: process.env.RESEND_API_KEY!,

  // SMTP Configuration (Nodemailer)
  SMTP_HOST: process.env.SMTP_HOST!,
  SMTP_PORT: process.env.SMTP_PORT!,
  SMTP_USER: process.env.SMTP_USER!,
  SMTP_PASS: process.env.SMTP_PASS!,

  // Twilio Configuration
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID!,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN!,
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER!,

  // Algolia Configuration
  ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  ALGOLIA_SEARCH_KEY: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
  ALGOLIA_ADMIN_KEY: process.env.ALGOLIA_ADMIN_KEY!,

  // App Configuration
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
};

// Validation des variables d'environnement requises
export const validateEnv = () => {
  const requiredVars: string[] = [
    // Ajoutez ici les variables obligatoires si nécessaire
  ];

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(
      `Variables d'environnement manquantes: ${missingVars.join(", ")}`
    );
  }
};
