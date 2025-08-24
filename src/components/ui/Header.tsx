import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  actions?: ReactNode;
  className?: string;
}

export default function Header({ title, actions, className }: HeaderProps) {
  return (
    <header className={cn("bg-white shadow-sm sticky top-0 z-10", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <h1 className={cn("font-bold text-gray-900 text-2xl")}>{title}</h1>
          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
      </div>
    </header>
  );
}
