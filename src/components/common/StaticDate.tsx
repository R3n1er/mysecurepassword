"use client";

import { useIsClient } from "@/hooks/useIsClient";

interface StaticDateProps {
  fallback?: string;
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
}

/**
 * Composant pour afficher des dates sans causer d'erreurs d'hydratation
 * Utilise une date de fallback côté serveur et la date réelle côté client
 */
export default function StaticDate({ 
  fallback = "Décembre 2024", 
  locale = "fr-FR",
  options = {}
}: StaticDateProps) {
  const isClient = useIsClient();

  if (!isClient) {
    return <>{fallback}</>;
  }

  return <>{new Date().toLocaleDateString(locale, options)}</>;
}