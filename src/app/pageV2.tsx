import HeaderV2 from "@/components/layout/HeaderV2";
import PasswordGeneratorV2 from "@/components/password/PasswordGeneratorV2";
import AppPresentationV2 from "@/components/presentation/AppPresentationV2";
import FooterV2 from "@/components/layout/FooterV2";
import TransitionWrapper from "@/components/animations/TransitionWrapper";

export default function HomePageV2() {
  return (
    <div className="min-h-screen">
      {/* Header avec dégradé bleu-violet */}
      <TransitionWrapper>
        <HeaderV2 />
      </TransitionWrapper>

      {/* Section Générateur - Bleu nuit */}
      <TransitionWrapper delay={200}>
        <PasswordGeneratorV2 />
      </TransitionWrapper>

      {/* Section Avantages - Bleu intense */}
      <TransitionWrapper delay={400}>
        <AppPresentationV2 />
      </TransitionWrapper>

      {/* Footer - Bleu très foncé */}
      <TransitionWrapper delay={600}>
        <FooterV2 />
      </TransitionWrapper>
    </div>
  );
}