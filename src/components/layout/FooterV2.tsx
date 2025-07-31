"use client";

import { useState } from "react";
import { Github, Mail, Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FooterV2() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi (remplacer par votre logique d'envoi)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsSubmitting(false);
    setEmail("");
    setMessage("");
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <footer className="msp-section-footer py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Informations */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="msp-logo w-16 h-16 flex items-center justify-center text-lg font-bold">
                MSP
              </div>
              <div>
                <h3 className="text-2xl font-bold msp-text-white">
                  MySecurePassword
                </h3>
                <p className="msp-text-white/80">
                  Solution française
                </p>
              </div>
            </div>
            <p className="msp-text-white/70 leading-relaxed text-lg">
              Générateur de mots de passe sécurisés, conforme RGPD, 
              compatible Google Workspace. Développé en France.
            </p>
            
            {/* Liens légaux */}
            <div className="space-y-3">
              <a
                href="/privacy"
                className="flex items-center gap-2 msp-text-white/80 hover:text-white transition-colors text-lg"
              >
                <Shield className="w-5 h-5" />
                Politique de confidentialité
              </a>
              <a
                href="/legal"
                className="flex items-center gap-2 msp-text-white/80 hover:text-white transition-colors text-lg"
              >
                <ExternalLink className="w-5 h-5" />
                Mentions légales
              </a>
            </div>
          </div>

          {/* Liens GitHub */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold msp-text-white">
              Open Source
            </h3>
            <div className="space-y-4">
              <a
                href="https://github.com/R3n1er/mysecurepassword"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white/5 border border-white/20 rounded-xl hover:bg-white/10 transition-colors group"
              >
                <Github className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                <div>
                  <div className="msp-text-white font-semibold text-lg">
                    Code source
                  </div>
                  <div className="msp-text-white/70">
                    Voir le projet sur GitHub
                  </div>
                </div>
              </a>
              <div className="text-sm msp-text-white/60 leading-relaxed">
                Code source ouvert et auditable. Contribuez au projet ou 
                signalez des améliorations sur GitHub.
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold msp-text-white">
              Contact
            </h3>
            
            {submitted ? (
              <div className="p-6 bg-green-500/20 border border-green-500/40 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="msp-text-white font-semibold">Message envoyé !</span>
                </div>
                <p className="msp-text-white/80 text-sm">
                  Merci pour votre message. Nous vous répondrons rapidement.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="contact-email" className="msp-text-white font-medium text-lg">
                    Email
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                    className="mt-2 bg-white/5 border-white/20 msp-text-white placeholder:text-white/50 focus:border-white/40 h-12 text-lg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="contact-message" className="msp-text-white font-medium text-lg">
                    Message
                  </Label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Votre message..."
                    required
                    rows={4}
                    className="mt-2 w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 msp-text-white placeholder:text-white/50 focus:border-white/40 focus:ring-0 focus:outline-none resize-none text-lg"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full msp-button-white h-12 text-lg font-semibold"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      Envoi...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      Envoyer le message
                    </div>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p className="msp-text-white/60 text-lg">
            © 2024 MySecurePassword. Développé en France 🇫🇷 • 
            Code source disponible sous licence open source
          </p>
        </div>
      </div>
    </footer>
  );
}