"use client";

import { useEffect, useState } from "react";

/**
 * Hook pour déterminer si le code s'exécute côté client
 * Évite les mismatches d'hydratation en garantissant la cohérence serveur/client
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}