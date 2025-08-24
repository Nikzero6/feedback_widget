"use client";

import { useState } from "react";
import { Button, Textarea, Select, Input } from "@/components/ui";
import { questionsAPI } from "@/lib/api/questions";
import { QuestionType } from "@/types";

interface QuestionFormProps {
  onQuestionCreated: () => void;
}

const questionTypeOptions: { value: QuestionType; label: string }[] = [
  { value: QuestionType.BOOLEAN, label: "Boolean (Yes/No)" },
  { value: QuestionType.TEXT, label: "Text Input" },
  { value: QuestionType.RATING, label: "Rating (1-5)" },
  { value: QuestionType.CHOICES, label: "Multiple Choice (Select One)" },
];

export default function QuestionForm({ onQuestionCreated }: QuestionFormProps) {
  const [question, setQuestion] = useState("");
  const [type, setType] = useState<QuestionType>(QuestionType.BOOLEAN);
  const [options, setOptions] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);
  const [questionError, setQuestionError] = useState<string | undefined>(
    undefined
  );
  const [optionsError, setOptionsError] = useState<string | undefined>(
    undefined
  );

  const validateForm = () => {
    if (question.trim() === "") {
      setQuestionError("Question is required");
      return false;
    }

    setQuestionError(undefined);

    if (type === QuestionType.CHOICES && options.length < 2) {
      setOptionsError("At least 2 options are required");
      return false;
    }

    if (
      type === QuestionType.CHOICES &&
      options.some((option) => option.trim() === "")
    ) {
      setOptionsError("All options must be filled");
      return false;
    }

    setOptionsError(undefined);

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await questionsAPI.createQuestion({
        text: question.trim(),
        type: type,
        options: options.filter((option) => option.trim() !== ""),
      });

      setQuestion("");
      setType(QuestionType.BOOLEAN);
      setOptions([""]);
      onQuestionCreated();
    } catch (error) {
      console.error("Error creating question:", error);
    } finally {
      setLoading(false);
    }
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Create New Question
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* question */}
        <Textarea
          label="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          rows={3}
          placeholder="Enter your question here..."
          error={questionError}
        />

        {/* question type */}
        <Select
          label="Question Type"
          value={type}
          onChange={(e) => setType(e.target.value as QuestionType)}
          options={questionTypeOptions}
        />
        {/* options */}
        {type === QuestionType.CHOICES && (
          <MultipleChoiceOptions
            options={options}
            updateOption={updateOption}
            removeOption={removeOption}
            addOption={addOption}
            error={optionsError}
          />
        )}
        {/* submit button */}
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Creating..." : "Create Question"}
        </Button>
      </form>
    </div>
  );
}

interface MultipleChoiceOptionsProps {
  options: string[];
  updateOption: (index: number, value: string) => void;
  removeOption: (index: number) => void;
  addOption: () => void;
  error: string | undefined;
}

const MultipleChoiceOptions = ({
  options,
  updateOption,
  removeOption,
  addOption,
  error,
}: MultipleChoiceOptionsProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Options
      </label>
      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={index} className="flex gap-2">
            <Input
              type="text"
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              className="flex-1"
            />
            {options.length > 1 && (
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="px-3 py-2 text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addOption}
          className="text-indigo-600 hover:text-indigo-800 text-sm"
        >
          + Add Option
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};
