// Configuration minimale des variables d'environnement utilisées par l'application.
export const env = {
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
};

export const validateEnv = () => {
  return true;
};
