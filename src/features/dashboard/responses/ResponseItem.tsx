import { ResponseWithNew } from "@/hooks/useResponses";

interface ResponseItemProps {
  response: ResponseWithNew;
}

export default function ResponseItem({ response }: ResponseItemProps) {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow ${
        response.isNew ? "ring-2 ring-green-500 ring-opacity-50" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium text-gray-900">
              {response.question.text}
            </h3>
            {response.isNew && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                New
              </span>
            )}
          </div>
          <p className="text-gray-700 mb-3">{response.answer}</p>
          <div className="flex flex-col gap-2 text-sm text-gray-500">
            <div>Date: {new Date(response.createdAt).toLocaleDateString()}</div>
            {response.metadata && (
              <div className="flex flex-col gap-1">
                <div>IP: {response.metadata.ip}</div>
                <div>User Agent: {response.metadata.userAgent}</div>
                <div>Timestamp: {response.metadata.timestamp}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
