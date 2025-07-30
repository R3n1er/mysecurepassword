"use client";

import { ReactNode, useEffect, useState } from "react";

interface TransitionWrapperProps {
  children: ReactNode;
  delay?: number;
}

export default function TransitionWrapper({ children, delay = 0 }: TransitionWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
} 