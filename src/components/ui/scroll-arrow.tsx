"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollArrowProps {
  threshold?: number;
  className?: string;
  smooth?: boolean;
}

export function ScrollArrow({ 
  threshold = 300, 
  className,
  smooth = true 
}: ScrollArrowProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [threshold]);

  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg transition-all duration-300 transform",
        "bg-gradient-to-r from-msp-gold to-msp-yellow text-msp-dark",
        "hover:scale-110 hover:shadow-xl hover:shadow-msp-gold/30",
        "focus:outline-none focus:ring-2 focus:ring-msp-gold focus:ring-offset-2",
        "active:scale-95",
        isVisible 
          ? "opacity-100 translate-y-0 pointer-events-auto" 
          : "opacity-0 translate-y-2 pointer-events-none",
        className
      )}
      aria-label="Retour en haut de la page"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
}