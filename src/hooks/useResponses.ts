import { useState, useCallback, useEffect, useRef } from "react";
import { responsesAPI } from "@/lib/api/responses";
import { Response } from "@/types";
import { API_ENDPOINTS } from "@/constants/config";

export interface ResponseWithNew extends Response {
  isNew: boolean;
}

export const useResponses = () => {
  const [responses, setResponses] = useState<ResponseWithNew[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const fetchResponses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await responsesAPI.fetchResponses();
      setResponses(data.map((r) => ({ ...r, isNew: false })));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch responses"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResponses();
  }, [fetchResponses]);

  // Subscribe to SSE for real-time updates
  useEffect(() => {
    const connectSSE = () => {
      try {
        const eventSource = new EventSource(API_ENDPOINTS.sse);
        eventSourceRef.current = eventSource;

        eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            if (data.type === "new_response") {
              // Add new response to the beginning of the list
              setResponses((prev) => {
                const newResponse = { ...data.data, isNew: true };

                return [newResponse, ...prev];
              });
            }
          } catch (err) {
            console.error("Error parsing SSE message:", err);
          }
        };

        eventSource.onerror = (error) => {
          console.error("SSE connection error:", error);
          eventSource.close();
          // Attempt to reconnect after a delay
          setTimeout(connectSSE, 5000);
        };

        eventSource.onopen = () => {
          console.log("SSE connection established");
        };
      } catch (err) {
        console.error("Failed to establish SSE connection:", err);
      }
    };

    connectSSE();

    // Cleanup on unmount
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, []);

  return {
    responses,
    loading,
    error,
  };
};
