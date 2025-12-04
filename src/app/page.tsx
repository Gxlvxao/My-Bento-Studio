import BentoGrid from "@/components/home/BentoGrid";
import RightPanel from "@/components/ui/RightPanel";
import LeftPanel from "@/components/ui/LeftPanel";
import Toolbar from "@/components/ui/Toolbar";

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col overflow-hidden bg-gray-50">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden relative">
        <LeftPanel />
        <div className="flex-1 relative bg-gray-900/5 overflow-hidden">
            <BentoGrid />
        </div>
        <RightPanel />
      </div>
    </main>
  );
}