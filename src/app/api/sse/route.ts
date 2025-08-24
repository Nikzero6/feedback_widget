import { NextRequest } from "next/server";
import { addSSEClient, removeSSEClient } from "@/lib/sse-manager";

export async function GET(request: NextRequest) {
  try {
    const stream = new ReadableStream({
      start(controller) {
        // Add this client to the shared manager
        addSSEClient(controller);

        // Send initial connection message
        controller.enqueue(
          `data: ${JSON.stringify({
            type: "connected",
            message: "SSE connected",
          })}\n\n`
        );

        // Keep connection alive with periodic messages
        const interval = setInterval(() => {
          controller.enqueue(
            `data: ${JSON.stringify({
              type: "ping",
              timestamp: Date.now(),
            })}\n\n`
          );
        }, 30000); // Every 30 seconds

        // Clean up on close
        request.signal.addEventListener("abort", () => {
          clearInterval(interval);
          removeSSEClient(controller);
          controller.close();
        });
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Cache-Control",
      },
    });
  } catch (error) {
    console.error("SSE error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
