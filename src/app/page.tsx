import PasswordGenerator from "@/components/password/PasswordGeneratorNew";
import AppPresentation from "@/components/presentation/AppPresentation";
import TransitionWrapper from "@/components/animations/TransitionWrapper";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-msp-navy to-msp-blue">
      {/* Overlay doux pour adoucir le fond */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/20 pointer-events-none"></div>
      
      {/* Contenu principal avec espacement moderne */}
      <main className="relative space-y-16 px-4 py-12">
        <TransitionWrapper>
          <PasswordGenerator />
        </TransitionWrapper>

        <TransitionWrapper delay={500}>
          <AppPresentation />
        </TransitionWrapper>
      </main>
    </div>
  );
}
