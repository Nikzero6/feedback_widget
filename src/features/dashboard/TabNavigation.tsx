"use client";

import { cn } from "@/lib/utils";

interface TabNavigationProps {
  activeTab: "questions" | "responses";
  onTabChange: (tab: "questions" | "responses") => void;
}

export default function TabNavigation({
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        <TabButton
          isActive={activeTab === "questions"}
          onClick={() => onTabChange("questions")}
        >
          Questions
        </TabButton>
        <TabButton
          isActive={activeTab === "responses"}
          onClick={() => onTabChange("responses")}
        >
          Responses
        </TabButton>
      </nav>
    </div>
  );
}

interface TabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

const TabButton = ({ isActive, children, ...props }: TabButtonProps) => {
  return (
    <button
      className={cn(
        "py-2 px-1 border-b-2 font-medium text-sm cursor-pointer",
        isActive
          ? "border-indigo-500 text-indigo-600"
          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
      )}
      {...props}
    >
      {children}
    </button>
  );
};
