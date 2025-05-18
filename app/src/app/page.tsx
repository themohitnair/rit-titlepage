import TitlePageForm from "@/components/TitlePageForm";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <TitlePageForm />
      </div>
    </div>
  );
}
