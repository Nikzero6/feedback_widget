"use client";

import { useState } from "react";
import TabNavigation from "./TabNavigation";
import QuestionList from "./questions/QuestionList";
import ResponseList from "./responses/ResponseList";

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState<"questions" | "responses">(
    "questions"
  );

  return (
    <div>
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === "questions" ? <QuestionList /> : <ResponseList />}
      </div>
    </div>
  );
}
