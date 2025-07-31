import HeaderV2 from "@/components/layout/HeaderV2";
import FooterV2 from "@/components/layout/FooterV2";
import TransitionWrapper from "@/components/animations/TransitionWrapper";
import { Shield, Lock, Eye, FileText, Globe, Database } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <TransitionWrapper>
        <HeaderV2 />
      </TransitionWrapper>

      {/* Contenu principal */}
      <section className="msp-section-generator py-12">
        <div className="max-w-4xl mx-auto px-6">
          <TransitionWrapper delay={200}>
            <div className="relative msp-card p-8 overflow-hidden">
              <div className="msp-glass-overlay"></div>
              
              <div className="relative space-y-8">
                {/* Titre principal */}
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold msp-text-white">
                        Politique de Confidentialité
                      </h1>
                      <p className="text-lg msp-text-white/80 mt-2">
                        Protection de vos données personnelles
                      </p>
                    </div>
                  </div>
                </div>

                {/* Informations générales */}
                <div className="msp-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-6 h-6 text-white" />
                    <h2 className="text-2xl font-bold msp-text-white">Informations Générales</h2>
                  </div>
                  <div className="space-y-4 msp-text-white/90 leading-relaxed">
                    <p><strong>Date de dernière mise à jour :</strong> Décembre 2024</p>
                    <p><strong>Éditeur :</strong> MySecurePassword</p>
                    <p><strong>Type d'application :</strong> Générateur de mots de passe sécurisés</p>
                    <p>
                      MySecurePassword est une application web gratuite de génération de mots de passe sécurisés, 
                      développée en France et conforme au Règlement Général sur la Protection des Données (RGPD).
                    </p>
                  </div>
                </div>

                {/* Collecte de données */}
                <div className="msp-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="w-6 h-6 text-white" />
                    <h2 className="text-2xl font-bold msp-text-white">Collecte de Données</h2>
                  </div>
                  <div className="space-y-4 msp-text-white/90 leading-relaxed">
                    <div className="bg-green-500/20 border border-green-500/40 rounded-xl p-4">
                      <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-400" />
                        Aucune Collecte de Données Personnelles
                      </h3>
                      <p>
                        <strong>MySecurePassword ne collecte, ne stocke et ne transmet AUCUNE donnée personnelle.</strong>
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-2">❌ Nous ne collectons PAS :</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Mots de passe générés</li>
                          <li>• Adresses e-mail</li>
                          <li>• Adresses IP</li>
                          <li>• Cookies de tracking</li>
                          <li>• Données de navigation</li>
                          <li>• Informations personnelles</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-2">✅ Traitement 100% local :</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Génération dans votre navigateur</li>
                          <li>• Aucun envoi sur nos serveurs</li>
                          <li>• Web Crypto API sécurisée</li>
                          <li>• Code source ouvert</li>
                          <li>• Vérifiable et auditable</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cookies */}
                <div className="msp-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="w-6 h-6 text-white" />
                    <h2 className="text-2xl font-bold msp-text-white">Cookies et Stockage</h2>
                  </div>
                  <div className="space-y-4 msp-text-white/90 leading-relaxed">
                    <p>
                      MySecurePassword utilise uniquement des cookies techniques essentiels au fonctionnement de l'application :
                    </p>
                    <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                      <h4 className="font-bold text-white mb-2">Cookies Techniques Uniquement :</h4>
                      <ul className="space-y-2">
                        <li><strong>Session :</strong> Maintien de la session utilisateur (supprimé à la fermeture)</li>
                        <li><strong>Préférences :</strong> Sauvegarde des paramètres de configuration (local)</li>
                        <li><strong>Sécurité :</strong> Protection CSRF (Cross-Site Request Forgery)</li>
                      </ul>
                    </div>
                    <p>
                      <strong>Aucun cookie de tracking, analytique ou publicitaire n'est utilisé.</strong>
                    </p>
                  </div>
                </div>

                {/* Sécurité */}
                <div className="msp-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="w-6 h-6 text-white" />
                    <h2 className="text-2xl font-bold msp-text-white">Sécurité Technique</h2>
                  </div>
                  <div className="space-y-4 msp-text-white/90 leading-relaxed">
                    <p>
                      Notre approche de sécurité garantit la protection maximale de vos données :
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-2">🔐 Chiffrement :</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Web Crypto API native</li>
                          <li>• Génération cryptographique</li>
                          <li>• HTTPS obligatoire</li>
                          <li>• Aucun stockage serveur</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-2">🛡️ Protection :</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Code source ouvert</li>
                          <li>• Hébergement sécurisé</li>
                          <li>• Mises à jour régulières</li>
                          <li>• Audit de sécurité</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vos droits */}
                <div className="msp-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-6 h-6 text-white" />
                    <h2 className="text-2xl font-bold msp-text-white">Vos Droits RGPD</h2>
                  </div>
                  <div className="space-y-4 msp-text-white/90 leading-relaxed">
                    <p>
                      Conformément au RGPD, vous disposez des droits suivants :
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                          <div>
                            <strong>Droit d'accès :</strong> Accéder aux données vous concernant
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                          <div>
                            <strong>Droit de rectification :</strong> Corriger vos données
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                          <div>
                            <strong>Droit d'effacement :</strong> Supprimer vos données
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                          <div>
                            <strong>Droit de portabilité :</strong> Récupérer vos données
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                          <div>
                            <strong>Droit d'opposition :</strong> Vous opposer au traitement
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                          <div>
                            <strong>Droit de limitation :</strong> Limiter le traitement
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-xl p-4">
                      <h4 className="font-bold text-white mb-2">📌 Important :</h4>
                      <p>
                        <strong>Comme MySecurePassword ne collecte aucune donnée personnelle, 
                        l'exercice de ces droits n'est pas applicable.</strong> Vous gardez un contrôle total 
                        sur vos données car elles ne quittent jamais votre navigateur.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="msp-card border-2 border-white/20 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-white" />
                    <h2 className="text-2xl font-bold msp-text-white">Contact & Questions</h2>
                  </div>
                  <div className="space-y-4 msp-text-white/90 leading-relaxed">
                    <p>
                      Pour toute question concernant cette politique de confidentialité ou 
                      vos droits en matière de protection des données :
                    </p>
                    <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                      <h4 className="font-bold text-white mb-2">📧 Nous contacter :</h4>
                      <ul className="space-y-2">
                        <li><strong>Formulaire de contact :</strong> Disponible en bas de page</li>
                        <li><strong>Code source :</strong> <a href="https://github.com/R3n1er/mysecurepassword" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">GitHub Repository</a></li>
                        <li><strong>Documentation :</strong> Consultable dans le projet open source</li>
                      </ul>
                    </div>
                    <p className="text-sm">
                      <strong>Délai de réponse :</strong> Nous nous engageons à répondre dans les 72 heures 
                      conformément aux exigences du RGPD.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TransitionWrapper>
        </div>
      </section>

      {/* Footer */}
      <TransitionWrapper delay={400}>
        <FooterV2 />
      </TransitionWrapper>
    </div>
  );
}