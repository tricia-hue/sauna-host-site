import React from "react";
import { brand } from "../brand";

/**
 * A subtle vertical column of gold dots — riff on Revivery's brand pattern.
 * The brand guideline says: gold pattern, never centered, off-page edges.
 */
export const BrandPattern: React.FC<{
  side?: "left" | "right";
  opacity?: number;
}> = ({ side = "right", opacity = 0.25 }) => {
  const dots = Array.from({ length: 14 });
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        [side]: -30,
        width: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        opacity,
        pointerEvents: "none",
      }}
    >
      {dots.map((_, i) => (
        <div
          key={i}
          style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            background: brand.gold,
            opacity: 0.4 + (i % 3) * 0.2,
          }}
        />
      ))}
    </div>
  );
};
