var WidgetStorage = /** @class */ (function () {
    function WidgetStorage() {
    }
    WidgetStorage.getSubmittedQuestions = function () {
        try {
            var stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                var questionIds = JSON.parse(stored);
                return new Set(Array.isArray(questionIds) ? questionIds : []);
            }
        }
        catch (error) {
            console.warn("Failed to parse submitted questions from localStorage:", error);
        }
        return new Set();
    };
    WidgetStorage.addSubmittedQuestion = function (questionId) {
        try {
            var submitted = this.getSubmittedQuestions();
            submitted.add(questionId);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(Array.from(submitted)));
        }
        catch (error) {
            console.warn("Failed to save submitted question to localStorage:", error);
        }
    };
    WidgetStorage.addSubmittedQuestions = function (questionIds) {
        try {
            var submitted_1 = this.getSubmittedQuestions();
            questionIds.forEach(function (id) { return submitted_1.add(id); });
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(Array.from(submitted_1)));
        }
        catch (error) {
            console.warn("Failed to save submitted questions to localStorage:", error);
        }
    };
    WidgetStorage.isQuestionSubmitted = function (questionId) {
        return this.getSubmittedQuestions().has(questionId);
    };
    WidgetStorage.clearSubmittedQuestions = function () {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
        }
        catch (error) {
            console.warn("Failed to clear submitted questions from localStorage:", error);
        }
    };
    WidgetStorage.getSubmittedCount = function () {
        return this.getSubmittedQuestions().size;
    };
    WidgetStorage.STORAGE_KEY = "feedback_widget_submitted_questions";
    return WidgetStorage;
}());
export { WidgetStorage };
