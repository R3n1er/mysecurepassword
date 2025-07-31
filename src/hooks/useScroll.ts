"use client";

import { useState, useEffect } from "react";

interface UseScrollReturn {
  scrollY: number;
  scrollProgress: number;
  isScrollingUp: boolean;
  isAtTop: boolean;
  isAtBottom: boolean;
}

export function useScroll(): UseScrollReturn {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (currentScrollY / docHeight) * 100 : 0;

      setScrollY(currentScrollY);
      setScrollProgress(progress);
      setIsScrollingUp(currentScrollY < lastScrollY);
      setIsAtTop(currentScrollY < 10);
      setIsAtBottom(currentScrollY >= docHeight - 10);

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    scrollY,
    scrollProgress,
    isScrollingUp,
    isAtTop,
    isAtBottom,
  };
}