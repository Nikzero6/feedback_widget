import { FeedbackWidget } from "./FeedbackWidget.js";
import { WidgetConfig } from "./types.js";

declare global {
  interface Window {
    FeedbackWidget: {
      init: (config: Partial<WidgetConfig>) => FeedbackWidget;
      destroy: () => void;
    };
    FeedbackWidgetConfig: Partial<WidgetConfig>;
  }
}

// Hook the widget into the global window object
function hookWidget() {
  // Global widget instance
  let globalWidget: FeedbackWidget | null = null;

  // Global initialization function
  function init(config: Partial<WidgetConfig> = {}): FeedbackWidget {
    if (globalWidget) {
      globalWidget.destroy();
    }

    globalWidget = new FeedbackWidget(config);
    return globalWidget;
  }

  // Global destroy function
  function destroy(): void {
    if (globalWidget) {
      globalWidget.destroy();
      globalWidget = null;
    }
  }

  // Make available globally for script tag usage
  if (typeof window !== "undefined") {
    window.FeedbackWidget = {
      init,
      destroy,
    };

    // Auto-initialize if config is provided
    if (window.FeedbackWidgetConfig) {
      init(window.FeedbackWidgetConfig);
    }
  }
}

hookWidget();
