"use client";

import { useState, useEffect } from "react";
import { useQuestions } from "@/hooks/useQuestions";
import QuestionItem from "./QuestionItem";
import QuestionForm from "./QuestionForm";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui";

export default function QuestionList() {
  const [showForm, setShowForm] = useState(false);
  const { questions, fetchQuestions, loading } = useQuestions();

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Questions</h2>
        {/* add question button */}
        <Button onClick={() => setShowForm(!showForm)} variant="primary">
          {showForm ? "Cancel" : "Add Question"}
        </Button>
      </div>
      {/* question form */}
      {showForm && (
        <QuestionForm
          onQuestionCreated={() => {
            fetchQuestions();
            setShowForm(false);
          }}
        />
      )}
      {/* question list */}
      <div className="space-y-4">
        {questions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No questions created yet.
          </p>
        ) : (
          questions.map((question) => (
            <QuestionItem
              key={question.id}
              question={question}
              onUpdated={fetchQuestions}
              onDeleted={fetchQuestions}
            />
          ))
        )}
      </div>
    </div>
  );
}
