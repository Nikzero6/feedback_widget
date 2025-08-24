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
var PositionManager = /** @class */ (function () {
    function PositionManager() {
    }
    PositionManager.getPositionStyles = function (position, offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var basePositions = {
            "top-left": { top: "20px", left: "20px" },
            "top-right": { top: "20px", right: "20px" },
            "bottom-left": { bottom: "20px", left: "20px" },
            "bottom-right": { bottom: "20px", right: "20px" },
            center: {
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            },
        };
        var basePosition = basePositions[position];
        var adjustedPosition = __assign({}, basePosition);
        // Apply offsets
        if (offsetX !== 0) {
            if (position.includes("left")) {
                var currentLeft = parseInt(basePosition.left || "20");
                adjustedPosition.left = "".concat(currentLeft + offsetX, "px");
            }
            else if (position.includes("right")) {
                var currentRight = parseInt(basePosition.right || "20");
                adjustedPosition.right = "".concat(currentRight + offsetX, "px");
            }
        }
        if (offsetY !== 0) {
            if (position.includes("top")) {
                var currentTop = parseInt(basePosition.top || "20");
                adjustedPosition.top = "".concat(currentTop + offsetY, "px");
            }
            else if (position.includes("bottom")) {
                var currentBottom = parseInt(basePosition.bottom || "20");
                adjustedPosition.bottom = "".concat(currentBottom + offsetY, "px");
            }
        }
        return adjustedPosition;
    };
    PositionManager.positionStylesToString = function (styles) {
        return Object.entries(styles)
            .filter(function (_a) {
            var value = _a[1];
            return value !== undefined;
        })
            .map(function (_a) {
            var property = _a[0], value = _a[1];
            return "".concat(property, ": ").concat(value, ";");
        })
            .join(" ");
    };
    return PositionManager;
}());
export { PositionManager };
