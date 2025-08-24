import { useState, useCallback } from "react";
import { questionsAPI } from "@/lib/api/questions";
import { Question } from "@/types";
import { CreateQuestionRequest, UpdateQuestionRequest } from "@/types";

export const useQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await questionsAPI.fetchQuestions();
      setQuestions(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch questions"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const createQuestion = useCallback(
    async (data: CreateQuestionRequest): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);
        const newQuestion = await questionsAPI.createQuestion(data);
        setQuestions((prev) => [newQuestion, ...prev]);
        return true;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to create question"
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateQuestion = useCallback(
    async (id: string, data: UpdateQuestionRequest): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);
        const updatedQuestion = await questionsAPI.updateQuestion(id, data);
        setQuestions((prev) =>
          prev.map((q) => (q.id === id ? updatedQuestion : q))
        );
        return true;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to update question"
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteQuestion = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await questionsAPI.deleteQuestion(id);
      setQuestions((prev) => prev.filter((q) => q.id !== id));
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete question"
      );
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const togglePublish = useCallback(
    async (id: string, currentStatus: boolean): Promise<boolean> => {
      return updateQuestion(id, { isPublished: !currentStatus });
    },
    [updateQuestion]
  );

  return {
    questions,
    loading,
    error,
    fetchQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    togglePublish,
  };
};
