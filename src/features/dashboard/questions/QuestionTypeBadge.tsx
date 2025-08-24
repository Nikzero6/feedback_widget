import { cn } from "@/lib/utils";
import { QuestionType } from "@/types";

interface QuestionTypeBadgeProps {
  type: QuestionType;
}

const getTypeConfig = (type: QuestionType) => {
  switch (type) {
    case QuestionType.BOOLEAN:
      return { label: "Boolean", color: "bg-red-100 text-red-800" };
    case QuestionType.TEXT:
      return { label: "Text", color: "bg-blue-100 text-blue-800" };
    case QuestionType.RATING:
      return { label: "Rating", color: "bg-green-100 text-green-800" };
    case QuestionType.CHOICES:
      return {
        label: "Multiple Choice",
        color: "bg-purple-100 text-purple-800",
      };
    default:
      return { label: "Unknown", color: "bg-gray-100 text-gray-800" };
  }
};

export default function QuestionTypeBadge({ type }: QuestionTypeBadgeProps) {
  const config = getTypeConfig(type);

  return (
    <span
      className={cn("px-2 py-1 text-xs font-medium rounded-full", config.color)}
    >
      {config.label}
    </span>
  );
}
