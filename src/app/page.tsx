import BentoGrid from "@/components/home/BentoGrid";
import EditorPanel from "@/components/ui/EditorPanel";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <BentoGrid />
      <EditorPanel />
    </main>
  );
}