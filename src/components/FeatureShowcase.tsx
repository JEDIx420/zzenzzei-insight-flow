
import { Zap, KanbanSquare, Upload, Users, BarChart2 } from "lucide-react";

const iconMap: Record<string, any> = {
  zap: Zap,
  kanban: KanbanSquare,
  upload: Upload,
  team: Users,
  "bar-chart-2": BarChart2,
};

export function FeatureIcon({ icon, title, desc }: { icon: string, title: string, desc: string }) {
  const LucideIcon = iconMap[icon] ?? Zap;
  return (
    <div className="bg-white/70 rounded-xl p-6 shadow-lg border backdrop-blur flex flex-col items-center text-center animate-fade-in hover:scale-105 transition-transform duration-200">
      <div className="mb-3">
        <LucideIcon size={36} className="text-[#9b87f5]" />
      </div>
      <div className="font-semibold text-lg mb-2">{title}</div>
      <div className="text-gray-500 text-sm">{desc}</div>
    </div>
  );
}

export function FeatureList() {
  return null; // In case you need a list version in future
}
