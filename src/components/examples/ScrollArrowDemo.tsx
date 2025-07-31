"use client";

import { ScrollArrow } from "@/components/ui/scroll-arrow";
import { ScrollToTop } from "@/components/navigation/ScrollToTop";
import { useScroll } from "@/hooks/useScroll";

export function ScrollArrowDemo() {
  const { scrollProgress, scrollY } = useScroll();

  return (
    <div className="min-h-[300vh] bg-gradient-to-b from-msp-dark via-msp-navy to-msp-blue">
      {/* Header fixe avec indicateur de scroll */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm border-b border-msp-blue/20 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-msp-dark">ScrollArrow Demo</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-msp-blue">
              Scroll: {Math.round(scrollY)}px
            </span>
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-msp-gold to-msp-yellow transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="pt-20 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Section 1 */}
          <section className="text-center py-16">
            <h2 className="text-4xl font-bold text-msp-yellow mb-8">
              Composant ScrollArrow
            </h2>
            <p className="text-msp-gold text-xl max-w-2xl mx-auto">
              Démonstration des différentes variantes du composant ScrollArrow 
              avec la palette de couleurs MSP et des animations fluides.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-msp-yellow mb-6">
              Variante par défaut
            </h3>
            <p className="text-msp-gold mb-4">
              Le composant ScrollArrow basique avec le style MSP par défaut.
            </p>
            <div className="bg-msp-dark/50 rounded-lg p-4">
              <code className="text-msp-yellow text-sm">
                {`<ScrollArrow threshold={300} />`}
              </code>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-msp-yellow mb-6">
              Variante avec progression
            </h3>
            <p className="text-msp-gold mb-4">
              Version avancée avec indicateur de progression du scroll.
            </p>
            <div className="bg-msp-dark/50 rounded-lg p-4">
              <code className="text-msp-yellow text-sm">
                {`<ScrollToTop variant="progress" showProgress={true} />`}
              </code>
            </div>
          </section>

          {/* Contenu de remplissage */}
          {Array.from({ length: 10 }, (_, i) => (
            <section key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-xl font-bold text-msp-yellow mb-4">
                Section {i + 4}
              </h3>
              <p className="text-msp-gold">
                Contenu de démonstration pour tester le scroll. 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </section>
          ))}
        </div>
      </div>

      {/* Composants ScrollArrow */}
      <ScrollArrow threshold={200} />
      <ScrollToTop 
        variant="progress" 
        showProgress={true}
        position="bottom-left"
        threshold={400}
      />
    </div>
  );
}