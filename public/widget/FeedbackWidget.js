var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { DEFAULT_CONFIG } from "./config.js";
import { WidgetStyles } from "./styles.js";
import { PositionManager } from "./position.js";
import { QuestionRenderer } from "./questionRenderer.js";
import { WidgetAPI } from "./api.js";
import { WidgetStorage } from "./storage.js";
var FeedbackWidget = /** @class */ (function () {
    function FeedbackWidget(config) {
        if (config === void 0) { config = {}; }
        this.isOpen = false;
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.answers = new Map();
        this.config = __assign(__assign({}, DEFAULT_CONFIG), config);
        this.api = new WidgetAPI("/api/public");
        this.init();
    }
    FeedbackWidget.prototype.init = function () {
        this.injectStyles();
        this.createWidget();
        this.setupEventListeners();
        this.applyTheme();
    };
    FeedbackWidget.prototype.injectStyles = function () {
        WidgetStyles.getInstance().inject();
    };
    FeedbackWidget.prototype.createWidget = function () {
        // Create floating button
        this.elements = {
            button: document.createElement("div"),
            popup: document.createElement("div"),
        };
        this.elements.button.className = "feedback-widget feedback-widget-button";
        this.elements.button.innerHTML = "💬";
        var buttonStyles = PositionManager.getPositionStyles(this.config.position, this.config.offsetX, this.config.offsetY);
        this.elements.button.style.cssText = "\n      background: linear-gradient(135deg, ".concat(this.config.primaryColor, ", ").concat(this.config.secondaryColor, ");\n      ").concat(PositionManager.positionStylesToString(buttonStyles), "\n    ");
        // Create popup
        this.elements.popup.className = "feedback-widget feedback-widget-popup";
        this.elements.popup.style.cssText = "\n      min-width: min(".concat(this.config.width, ", 90vw);\n      min-height: min(").concat(this.config.height, ", 90vh);\n    ");
        // Create popup content
        this.elements.popup.innerHTML = "\n      <button class=\"feedback-widget-close\" aria-label=\"Close\">\u00D7</button>\n      <div class=\"feedback-widget-header\">\n        <h3 class=\"feedback-widget-title\">".concat(this.config.feedbackTitle, "</h3>\n      </div>\n      <div class=\"feedback-widget-body\">\n        ").concat(QuestionRenderer.renderLoading(), "\n      </div>\n    ");
        // Add to DOM
        document.body.appendChild(this.elements.button);
        document.body.appendChild(this.elements.popup);
    };
    FeedbackWidget.prototype.applyTheme = function () {
        var root = document.documentElement;
        root.style.setProperty("--primary-color", this.config.primaryColor);
        root.style.setProperty("--secondary-color", this.config.secondaryColor);
        root.style.setProperty("--background-color", this.config.backgroundColor);
        root.style.setProperty("--text-color", this.config.textColor);
    };
    FeedbackWidget.prototype.loadQuestions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, this.api.fetchPublishedQuestions()];
                    case 1:
                        _a.questions = _b.sent();
                        // Filter out already submitted questions
                        this.questions = this.questions.filter(function (q) { return !WidgetStorage.isQuestionSubmitted(q.id); });
                        this.updatePopupContent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.error("Failed to load questions:", error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FeedbackWidget.prototype.updatePopupContent = function () {
        var body = this.elements.popup.querySelector(".feedback-widget-body");
        if (body) {
            body.innerHTML = QuestionRenderer.renderQuestionsList(this.questions, this.currentQuestionIndex);
        }
    };
    FeedbackWidget.prototype.setupEventListeners = function () {
        var _this = this;
        // Button click
        this.elements.button.addEventListener("click", function () { return _this.togglePopup(); });
        // Close button
        this.elements.popup.addEventListener("click", function (e) {
            if (e.target.classList.contains("feedback-widget-close")) {
                _this.closePopup();
            }
        });
        // Navigation buttons
        this.elements.popup.addEventListener("click", function (e) {
            var target = e.target;
            if (target.classList.contains("feedback-widget-nav-btn")) {
                e.preventDefault();
                e.stopPropagation();
                var action = target.getAttribute("data-action");
                if (action === "prev") {
                    _this.previousQuestion();
                }
                else if (action === "next") {
                    _this.nextQuestion();
                }
            }
        });
        // Submit button
        this.elements.popup.addEventListener("click", function (e) {
            if (e.target.classList.contains("feedback-widget-submit")) {
                e.preventDefault();
                e.stopPropagation();
                _this.handleSubmit();
            }
        });
        // Option selection
        this.elements.popup.addEventListener("click", function (e) {
            if (e.target.classList.contains("feedback-widget-option")) {
                e.preventDefault();
                e.stopPropagation();
                _this.selectOption(e.target);
            }
        });
        // Star rating
        this.elements.popup.addEventListener("click", function (e) {
            if (e.target.classList.contains("feedback-widget-star")) {
                e.preventDefault();
                e.stopPropagation();
                _this.selectRating(e.target);
            }
        });
        // Text input changes
        this.elements.popup.addEventListener("input", function (e) {
            var target = e.target;
            if (target.classList.contains("feedback-widget-textarea")) {
                _this.handleTextInput(target);
            }
        });
        // Close on outside click - but not when clicking inside the popup
        document.addEventListener("click", function (e) {
            if (!_this.elements.popup.contains(e.target) &&
                !_this.elements.button.contains(e.target) &&
                _this.isOpen) {
                _this.closePopup();
            }
        });
    };
    FeedbackWidget.prototype.togglePopup = function () {
        if (this.isOpen) {
            this.closePopup();
        }
        else {
            this.openPopup();
        }
    };
    FeedbackWidget.prototype.openPopup = function () {
        this.isOpen = true;
        this.elements.popup.classList.add("open");
        this.elements.button.style.display = "none";
        this.loadQuestions();
    };
    FeedbackWidget.prototype.closePopup = function () {
        var _this = this;
        this.isOpen = false;
        this.elements.popup.classList.remove("open");
        this.elements.button.style.display = "flex";
        // Reset the widget state
        setTimeout(function () {
            _this.reset();
        }, this.config.hideDelay);
    };
    FeedbackWidget.prototype.selectOption = function (optionElement) {
        // Remove previous selection for current question
        this.elements.popup
            .querySelectorAll(".feedback-widget-option")
            .forEach(function (opt) {
            opt.classList.remove("selected");
        });
        // Select current option
        optionElement.classList.add("selected");
        // Store the answer
        var currentQuestion = this.questions[this.currentQuestionIndex];
        if (currentQuestion) {
            this.answers.set(currentQuestion.id, optionElement.dataset.value || "");
        }
        // Enable navigation or submit button
        this.updateNavigationState();
    };
    FeedbackWidget.prototype.selectRating = function (starElement) {
        var rating = parseInt(starElement.dataset.value || "0");
        // Update star display
        this.elements.popup
            .querySelectorAll(".feedback-widget-star")
            .forEach(function (star, index) {
            if (index < rating) {
                star.classList.add("active");
            }
            else {
                star.classList.remove("active");
            }
        });
        // Store the answer
        var currentQuestion = this.questions[this.currentQuestionIndex];
        if (currentQuestion) {
            this.answers.set(currentQuestion.id, rating.toString());
        }
        // Enable navigation or submit button
        this.updateNavigationState();
    };
    FeedbackWidget.prototype.handleTextInput = function (textareaElement) {
        var currentQuestion = this.questions[this.currentQuestionIndex];
        if (currentQuestion) {
            var textValue = textareaElement.value.trim();
            if (textValue) {
                this.answers.set(currentQuestion.id, textValue);
            }
            else {
                this.answers.delete(currentQuestion.id);
            }
            this.updateNavigationState();
        }
    };
    FeedbackWidget.prototype.updateNavigationState = function () {
        var currentQuestion = this.questions[this.currentQuestionIndex];
        if (!currentQuestion)
            return;
        var hasAnswer = this.answers.has(currentQuestion.id);
        var nextBtn = this.elements.popup.querySelector(".feedback-widget-nav-btn[data-action='next']");
        var submitBtn = this.elements.popup.querySelector(".feedback-widget-submit");
        if (nextBtn) {
            nextBtn.disabled = !hasAnswer;
        }
        if (submitBtn) {
            submitBtn.disabled = !hasAnswer;
        }
    };
    FeedbackWidget.prototype.previousQuestion = function () {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.updatePopupContent();
            this.updateNavigationState();
        }
    };
    FeedbackWidget.prototype.nextQuestion = function () {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.updatePopupContent();
            this.updateNavigationState();
        }
    };
    FeedbackWidget.prototype.handleSubmit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var responses, submittedQuestionIds, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.answers.size === 0)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        responses = Array.from(this.answers.entries()).map(function (_a) {
                            var questionId = _a[0], answer = _a[1];
                            return ({
                                questionId: questionId,
                                answer: answer,
                            });
                        });
                        return [4 /*yield*/, this.api.submitResponses(responses)];
                    case 2:
                        _a.sent();
                        submittedQuestionIds = Array.from(this.answers.keys());
                        WidgetStorage.addSubmittedQuestions(submittedQuestionIds);
                        this.showThankYou();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error("Failed to submit responses:", error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FeedbackWidget.prototype.showThankYou = function () {
        var _this = this;
        var body = this.elements.popup.querySelector(".feedback-widget-body");
        if (body) {
            body.innerHTML = QuestionRenderer.renderThankYou(this.config.thankYouMessage);
        }
        if (this.config.autoHide) {
            setTimeout(function () {
                _this.closePopup();
            }, this.config.hideDelay);
        }
    };
    // Public methods for external control
    FeedbackWidget.prototype.open = function () {
        this.openPopup();
    };
    FeedbackWidget.prototype.close = function () {
        this.closePopup();
    };
    FeedbackWidget.prototype.destroy = function () {
        if (this.elements.button.parentNode) {
            this.elements.button.parentNode.removeChild(this.elements.button);
        }
        if (this.elements.popup.parentNode) {
            this.elements.popup.parentNode.removeChild(this.elements.popup);
        }
    };
    FeedbackWidget.prototype.updateConfig = function (newConfig) {
        this.config = __assign(__assign({}, this.config), newConfig);
        this.applyTheme();
        // Update header title if feedbackTitle changed
        var header = this.elements.popup.querySelector(".feedback-widget-header h3");
        if (header) {
            header.textContent = this.config.feedbackTitle;
        }
        // Update button position if position changed
        var buttonStyles = PositionManager.getPositionStyles(this.config.position, this.config.offsetX, this.config.offsetY);
        this.elements.button.style.cssText = "\n      background: linear-gradient(135deg, ".concat(this.config.primaryColor, ", ").concat(this.config.secondaryColor, ");\n      ").concat(PositionManager.positionStylesToString(buttonStyles), "\n    ");
    };
    // Method to get current answers (useful for debugging or external access)
    FeedbackWidget.prototype.getAnswers = function () {
        return new Map(this.answers);
    };
    // Method to reset the widget state
    FeedbackWidget.prototype.reset = function () {
        this.currentQuestionIndex = 0;
        this.answers.clear();
        this.updatePopupContent();
        this.updateNavigationState();
    };
    // Method to check if questions are available
    FeedbackWidget.prototype.hasQuestions = function () {
        return this.questions.length > 0;
    };
    // Method to get submitted questions count
    FeedbackWidget.prototype.getSubmittedCount = function () {
        return WidgetStorage.getSubmittedCount();
    };
    // Method to get submitted questions (for testing purposes)
    FeedbackWidget.prototype.getSubmittedQuestions = function () {
        return WidgetStorage.getSubmittedQuestions();
    };
    // Method to clear submitted questions (useful for testing or admin purposes)
    FeedbackWidget.prototype.clearSubmittedQuestions = function () {
        WidgetStorage.clearSubmittedQuestions();
        // Reload questions to show previously submitted ones
        this.loadQuestions();
    };
    return FeedbackWidget;
}());
export { FeedbackWidget };
