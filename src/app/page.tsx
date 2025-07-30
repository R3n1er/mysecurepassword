import PasswordGenerator from "@/components/password/PasswordGenerator";
import AppPresentation from "@/components/presentation/AppPresentation";
import TransitionWrapper from "@/components/animations/TransitionWrapper";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <TransitionWrapper>
        <PasswordGenerator />
      </TransitionWrapper>
      
      <TransitionWrapper delay={500}>
        <AppPresentation />
      </TransitionWrapper>
    </div>
  );
}
