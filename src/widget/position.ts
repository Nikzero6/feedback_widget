import { WidgetPosition, PositionStyles } from "./types.js";

export class PositionManager {
  static getPositionStyles(
    position: WidgetPosition,
    offsetX: number = 0,
    offsetY: number = 0
  ): PositionStyles {
    const basePositions: Record<WidgetPosition, PositionStyles> = {
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

    const basePosition = basePositions[position];
    const adjustedPosition = { ...basePosition };

    // Apply offsets
    if (offsetX !== 0) {
      if (position.includes("left")) {
        const currentLeft = parseInt(basePosition.left || "20");
        adjustedPosition.left = `${currentLeft + offsetX}px`;
      } else if (position.includes("right")) {
        const currentRight = parseInt(basePosition.right || "20");
        adjustedPosition.right = `${currentRight + offsetX}px`;
      }
    }

    if (offsetY !== 0) {
      if (position.includes("top")) {
        const currentTop = parseInt(basePosition.top || "20");
        adjustedPosition.top = `${currentTop + offsetY}px`;
      } else if (position.includes("bottom")) {
        const currentBottom = parseInt(basePosition.bottom || "20");
        adjustedPosition.bottom = `${currentBottom + offsetY}px`;
      }
    }

    return adjustedPosition;
  }

  static positionStylesToString(styles: PositionStyles): string {
    return Object.entries(styles)
      .filter(([, value]) => value !== undefined)
      .map(([property, value]) => `${property}: ${value};`)
      .join(" ");
  }
}
