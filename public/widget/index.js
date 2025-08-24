import { FeedbackWidget } from "./FeedbackWidget.js";
// Hook the widget into the global window object
function hookWidget() {
    // Global widget instance
    var globalWidget = null;
    // Global initialization function
    function init(config) {
        if (config === void 0) { config = {}; }
        if (globalWidget) {
            globalWidget.destroy();
        }
        globalWidget = new FeedbackWidget(config);
        return globalWidget;
    }
    // Global destroy function
    function destroy() {
        if (globalWidget) {
            globalWidget.destroy();
            globalWidget = null;
        }
    }
    // Make available globally for script tag usage
    if (typeof window !== "undefined") {
        window.FeedbackWidget = {
            init: init,
            destroy: destroy,
        };
        // Auto-initialize if config is provided
        if (window.FeedbackWidgetConfig) {
            init(window.FeedbackWidgetConfig);
        }
    }
}
hookWidget();
