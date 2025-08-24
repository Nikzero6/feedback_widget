"use client";

import { useResponses } from "@/hooks/useResponses";
import ResponseItem from "./ResponseItem";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function ResponseList() {
  const { responses, loading } = useResponses();

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        {responses.length} responses
      </h2>
      <div className="space-y-4">
        {responses.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No responses yet.</p>
        ) : (
          responses.map((response) => (
            <ResponseItem key={response.id} response={response} />
          ))
        )}
      </div>
    </div>
  );
}
