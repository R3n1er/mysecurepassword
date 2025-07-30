import PasswordGenerator from "@/components/password/PasswordGenerator";
import AppPresentation from "@/components/presentation/AppPresentation";

export default function HomePage() {
  return (
    <div>
      <AppPresentation />
      <PasswordGenerator />
    </div>
  );
}
