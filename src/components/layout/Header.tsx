"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      className="w-full py-8 px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Logo et titre principal */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <motion.div
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/logo-mysecurepassword.png"
              alt="MySecurePassword Logo"
              width={320}
              height={80}
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Sous-titre */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Générateur de mots de passe sécurisés compatibles avec Google
            Workspace
          </motion.p>

          {/* Badge RGPD */}
          <motion.div
            className="flex items-center space-x-2 px-3 py-1 bg-accent/20 border border-accent/30 rounded-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="flex items-center space-x-1">
              <span className="text-xs font-medium text-accent-foreground">
                🔒
              </span>
              <span className="text-xs font-medium text-accent-foreground">
                RGPD Conforme
              </span>
            </div>
            <div className="w-4 h-3 relative">
              <Image
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDJkN2YiLz4KPHJlY3QgeT0iNCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjQiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHk9IjgiIHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiBmaWxsPSIjZWYzMTIzIi8+Cjwvc3ZnPgo="
                alt="Drapeau français"
                width={16}
                height={12}
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
