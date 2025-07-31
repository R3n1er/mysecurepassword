"use client";

import { useState, useEffect } from "react";
import { ArrowUp, ChevronUp, ChevronsUp } from "lucide-react";
import { cn } from "@/lib/utils";

type ScrollArrowVariant = "default" | "minimal" | "progress";
type ScrollArrowIcon = "arrow" | "chevron" | "double-chevron";

interface ScrollToTopProps {
  threshold?: number;
  variant?: ScrollArrowVariant;
  icon?: ScrollArrowIcon;
  position?: "bottom-right" | "bottom-left" | "bottom-center";
  showProgress?: boolean;
  className?: string;
}

export function ScrollToTop({
  threshold = 300,
  variant = "default",
  icon = "chevron",
  position = "bottom-right",
  showProgress = false,
  className,
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;

      setScrollProgress(progress);
      setIsVisible(scrollTop > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getIcon = () => {
    switch (icon) {
      case "arrow":
        return <ArrowUp className="w-5 h-5" />;
      case "double-chevron":
        return <ChevronsUp className="w-5 h-5" />;
      default:
        return <ChevronUp className="w-5 h-5" />;
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case "bottom-left":
        return "bottom-8 left-8";
      case "bottom-center":
        return "bottom-8 left-1/2 -translate-x-1/2";
      default:
        return "bottom-8 right-8";
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "minimal":
        return "p-2 bg-white/90 backdrop-blur-sm text-msp-dark border border-msp-blue/20 hover:bg-msp-gold/10";
      case "progress":
        return "p-3 bg-gradient-to-r from-msp-gold to-msp-yellow text-msp-dark relative overflow-hidden";
      default:
        return "p-3 bg-gradient-to-r from-msp-gold to-msp-yellow text-msp-dark hover:from-msp-yellow hover:to-msp-gold";
    }
  };

  if (!isVisible) return null;

  return (
    <div className={cn("fixed z-50", getPositionClasses())}>
      <button
        onClick={scrollToTop}
        className={cn(
          "rounded-full shadow-lg transition-all duration-300 transform",
          "hover:scale-110 hover:shadow-xl",
          "focus:outline-none focus:ring-2 focus:ring-msp-gold focus:ring-offset-2",
          "active:scale-95",
          getVariantClasses(),
          className
        )}
        aria-label="Retour en haut de la page"
      >
        {/* Progress ring pour la variante progress */}
        {variant === "progress" && showProgress && (
          <div className="absolute inset-0 rounded-full">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="stroke-msp-dark/20"
                strokeWidth="2"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="stroke-msp-dark transition-all duration-300"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={`${scrollProgress}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
        )}
        
        <div className="relative z-10">
          {getIcon()}
        </div>
      </button>
    </div>
  );
}