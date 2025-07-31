"use client";

import Image from "next/image";

export default function HeaderV2() {
  return (
    <header className="msp-header relative overflow-hidden">
      {/* Overlay effet glassmorphism très discret */}
      <div className="msp-glass-overlay"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
          {/* Logo - À GAUCHE */}
          <div className="flex items-center justify-center flex-shrink-0">
            <Image
              src="/mysecurepassword-logo-v2-min.png"
              alt="MySecurePassword Logo"
              width={80}
              height={80}
              className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
              priority
            />
          </div>

          {/* Contenu principal avec texte BLANC */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold msp-text-white mb-4 leading-tight">
              MySecurePassword
            </h1>
            <p className="text-xl lg:text-2xl msp-text-white/90 mb-3 font-medium">
              Générateur de mots de passe sécurisés
            </p>
            <p className="text-lg lg:text-xl msp-text-white/80 leading-relaxed">
              Compatible Google Workspace • Conforme RGPD • 100% gratuit
            </p>
          </div>

          {/* Badge français - À DROITE */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-3 px-6 py-4 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-sm">
              <div className="flex shadow-sm rounded-lg overflow-hidden">
                <div className="w-5 h-4 bg-blue-600"></div>
                <div className="w-5 h-4 bg-white"></div>
                <div className="w-5 h-4 bg-red-600"></div>
              </div>
              <span className="text-white font-bold text-sm">
                Solution française
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}