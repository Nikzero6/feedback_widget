// Shared SSE Manager for handling client connections across API routes
declare global {
  var sseClients: Set<ReadableStreamDefaultController> | undefined;
}

interface SSEMessage {
  type: string;
  data?: unknown;
  timestamp?: number;
  [key: string]: unknown;
}

class SSEManager {
  private static instance: SSEManager;

  private constructor() {}

  static getInstance() {
    if (!SSEManager.instance) {
      SSEManager.instance = new SSEManager();
    }

    return SSEManager.instance;
  }

  private get clients(): Set<ReadableStreamDefaultController> {
    if (!global.sseClients) {
      global.sseClients = new Set();
      console.log("Initialized global SSE clients set");
    }
    return global.sseClients;
  }

  addClient(controller: ReadableStreamDefaultController) {
    this.clients.add(controller);
    console.log(`SSE Client added. Total clients: ${this.clients.size}`);
  }

  removeClient(controller: ReadableStreamDefaultController) {
    this.clients.delete(controller);
    console.log(`SSE Client removed. Total clients: ${this.clients.size}`);
  }

  broadcast(data: SSEMessage) {
    const eventData = JSON.stringify(data);
    console.log(`Broadcasting to ${this.clients.size} clients:`, eventData);

    let successCount = 0;
    let errorCount = 0;

    this.clients.forEach((client) => {
      try {
        client.enqueue(`data: ${eventData}\n\n`);
        successCount++;
      } catch (error) {
        console.error("Error broadcasting to client:", error);
        errorCount++;
        // Remove disconnected clients
        this.clients.delete(client);
      }
    });

    console.log(
      `Broadcast complete: ${successCount} successful, ${errorCount} errors, ${this.clients.size} remaining clients`
    );
  }

  getClientCount(): number {
    const count = this.clients.size;
    console.log(`Current SSE client count: ${count}`);
    return count;
  }

  // Clean up disconnected clients
  cleanup() {
    const initialCount = this.clients.size;
    console.log(`Starting SSE cleanup. Initial client count: ${initialCount}`);

    this.clients.forEach((client) => {
      try {
        // Test if client is still connected by trying to enqueue a test message
        client.enqueue(
          `data: ${JSON.stringify({ type: "ping", timestamp: Date.now() })}\n\n`
        );
      } catch (error) {
        console.error("Error cleaning up client:", error);
        this.clients.delete(client);
      }
    });

    const removedCount = initialCount - this.clients.size;
    if (removedCount > 0) {
      console.log(
        `Cleaned up ${removedCount} disconnected clients. Total clients: ${this.clients.size}`
      );
    } else {
      console.log(
        `No disconnected clients found. Total clients: ${this.clients.size}`
      );
    }
  }
}

// Export singleton instance
export const sseManager = SSEManager.getInstance();

// Convenience functions
export const addSSEClient = (controller: ReadableStreamDefaultController) =>
  sseManager.addClient(controller);
export const removeSSEClient = (controller: ReadableStreamDefaultController) =>
  sseManager.removeClient(controller);
export const broadcastSSE = (data: SSEMessage) => sseManager.broadcast(data);
export const getSSEClientCount = () => sseManager.getClientCount();
