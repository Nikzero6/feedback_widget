"use client";

import { Question } from "@/types";
import { Button } from "@/components/ui";
import { questionsAPI } from "@/lib/api/questions";

interface QuestionActionsProps {
  question: Question;
  onUpdated: () => void;
  onDeleted: () => void;
}

export default function QuestionActions({
  question,
  onUpdated,
  onDeleted,
}: QuestionActionsProps) {
  const handleTogglePublish = async () => {
    try {
      await questionsAPI.updateQuestion(question.id, {
        isPublished: !question.isPublished,
      });

      onUpdated();
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this question?")) return;

    try {
      await questionsAPI.deleteQuestion(question.id);
      onDeleted();
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant={question.isPublished ? "default" : "primary"}
        size="sm"
        onClick={handleTogglePublish}
      >
        {question.isPublished ? "Unpublish" : "Publish"}
      </Button>
      <Button variant="destructive" size="sm" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
}
