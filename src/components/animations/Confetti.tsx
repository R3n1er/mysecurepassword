"use client";

import { useEffect, useState } from "react";
import { useIsClient } from "@/hooks/useIsClient";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  velocity: { x: number; y: number };
}

interface ConfettiProps {
  isActive: boolean;
  onComplete?: () => void;
}

const colors = [
  "#FF6B6B", // Rouge
  "#4ECDC4", // Turquoise
  "#45B7D1", // Bleu
  "#96CEB4", // Vert
  "#FFEAA7", // Jaune
  "#DDA0DD", // Violet
  "#FFB347", // Orange
  "#87CEEB", // Bleu ciel
];

export default function Confetti({ isActive, onComplete }: ConfettiProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const isClient = useIsClient();

  useEffect(() => {
    if (!isActive) {
      setConfetti([]);
      return;
    }

    // Créer 50 confettis (seulement côté client pour éviter l'hydratation)
    if (!isClient) return;
    
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const newConfetti: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * windowWidth,
      y: -20,
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      velocity: {
        x: (Math.random() - 0.5) * 8,
        y: Math.random() * 3 + 2,
      },
    }));

    setConfetti(newConfetti);

    // Animation
    const animate = () => {
      const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
      setConfetti((prev) =>
        prev
          .map((piece) => ({
            ...piece,
            x: piece.x + piece.velocity.x,
            y: piece.y + piece.velocity.y,
            rotation: piece.rotation + 2,
            velocity: {
              ...piece.velocity,
              y: piece.velocity.y + 0.1, // Gravité
            },
          }))
          .filter((piece) => piece.y < windowHeight + 50)
      );
    };

    const interval = setInterval(animate, 16);

    // Arrêter l'animation après 3 secondes
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setConfetti([]);
      onComplete?.();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isActive, onComplete, isClient]);

  // Ne pas rendre côté serveur pour éviter l'hydratation
  if (!isClient || !isActive || confetti.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            left: piece.x,
            top: piece.y,
            transform: `rotate(${piece.rotation}deg) scale(${piece.scale})`,
            backgroundColor: piece.color,
            boxShadow: `0 0 4px ${piece.color}`,
          }}
        />
      ))}
    </div>
  );
} 