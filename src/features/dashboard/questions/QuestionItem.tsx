import { Question } from "@/types";
import QuestionTypeBadge from "./QuestionTypeBadge";
import PublishStatusBadge from "./PublishStatusBadge";
import QuestionActions from "./QuestionActions";

interface QuestionItemProps {
  question: Question;
  onUpdated: () => void;
  onDeleted: () => void;
}

export default function QuestionItem({
  question,
  onUpdated,
  onDeleted,
}: QuestionItemProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <QuestionTypeBadge type={question.type} />
            <PublishStatusBadge published={question.isPublished} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2 truncate">
            {question.text}
          </h3>
          {question.options && question.options.length > 0 && (
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-1">Options:</p>
              <div className="flex flex-wrap gap-2">
                {question.options.map((option, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
          )}
          <p className="text-sm text-gray-500">
            Updated: {new Date(question.updatedAt).toLocaleDateString()}
          </p>
        </div>
        <QuestionActions
          question={question}
          onUpdated={onUpdated}
          onDeleted={onDeleted}
        />
      </div>
    </div>
  );
}
