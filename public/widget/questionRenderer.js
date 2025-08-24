var QuestionRenderer = /** @class */ (function () {
    function QuestionRenderer() {
    }
    QuestionRenderer.renderQuestionsList = function (questions, currentIndex) {
        if (currentIndex === void 0) { currentIndex = 0; }
        if (questions.length === 0) {
            return this.renderNoQuestions();
        }
        var currentQuestion = questions[currentIndex];
        var totalQuestions = questions.length;
        var progress = ((currentIndex + 1) / totalQuestions) * 100;
        return "\n      <div class=\"feedback-widget-progress\">\n        <div class=\"feedback-widget-progress-bar\">\n          <div class=\"feedback-widget-progress-fill\" style=\"width: ".concat(progress, "%\"></div>\n        </div>\n        <div class=\"feedback-widget-progress-text\">Question ").concat(currentIndex + 1, " of ").concat(totalQuestions, "</div>\n      </div>\n      \n      <div class=\"feedback-widget-question\">\n        <h4 class=\"feedback-widget-question-title\">").concat(currentQuestion.text, "</h4>\n        ").concat(this.renderQuestionContent(currentQuestion), "\n      </div>\n      \n      <div class=\"feedback-widget-navigation\">\n        ").concat(currentIndex > 0
            ? '<button class="feedback-widget-nav-btn feedback-widget-prev" data-action="prev">← Previous</button>'
            : "", "\n        ").concat(currentIndex < totalQuestions - 1
            ? '<button class="feedback-widget-nav-btn feedback-widget-next" data-action="next" disabled>Next →</button>'
            : "", "\n        ").concat(currentIndex === totalQuestions - 1
            ? '<button class="feedback-widget-submit" disabled>Submit All</button>'
            : "", "\n      </div>\n    ");
    };
    QuestionRenderer.renderQuestionContent = function (question) {
        switch (question.type) {
            case "BOOLEAN":
                return this.renderBooleanQuestion();
            case "RATING":
                return this.renderRatingQuestion();
            case "TEXT":
                return this.renderTextQuestion();
            case "CHOICES":
                return this.renderChoicesQuestion(question.options || []);
            default:
                return "<p>Question type not supported</p>";
        }
    };
    QuestionRenderer.renderBooleanQuestion = function () {
        return "\n      <div class=\"feedback-widget-options\">\n        <button class=\"feedback-widget-option\" data-value=\"Yes\">Yes</button>\n        <button class=\"feedback-widget-option\" data-value=\"No\">No</button>\n      </div>\n    ";
    };
    QuestionRenderer.renderRatingQuestion = function () {
        var stars = [1, 2, 3, 4, 5]
            .map(function (num) {
            return "<span class=\"feedback-widget-star\" data-value=\"".concat(num, "\">\u2B50</span>");
        })
            .join("");
        return "\n      <div class=\"feedback-widget-rating\">\n        ".concat(stars, "\n      </div>\n    ");
    };
    QuestionRenderer.renderTextQuestion = function () {
        return "\n      <textarea class=\"feedback-widget-textarea\" placeholder=\"Please share your feedback...\" data-question-input=\"true\"></textarea>\n    ";
    };
    QuestionRenderer.renderChoicesQuestion = function (options) {
        var optionButtons = options
            .map(function (option) {
            return "<button class=\"feedback-widget-option\" data-value=\"".concat(option, "\">").concat(option, "</button>");
        })
            .join("");
        return "\n      <div class=\"feedback-widget-options\">\n        ".concat(optionButtons, "\n      </div>\n    ");
    };
    QuestionRenderer.renderThankYou = function (message) {
        return "\n      <div class=\"feedback-widget-thankyou\">\n        <h3>Thank you!</h3>\n        <p>".concat(message, "</p>\n      </div>\n    ");
    };
    QuestionRenderer.renderLoading = function () {
        return "\n      <div class=\"feedback-widget-loading\">\n        Loading questions...\n      </div>\n    ";
    };
    QuestionRenderer.renderNoQuestions = function () {
        return "\n      <div class=\"feedback-widget-no-questions\">\n        <p>No questions available at the moment.</p>\n        <p>Please check back later!</p>\n      </div>\n    ";
    };
    return QuestionRenderer;
}());
export { QuestionRenderer };
