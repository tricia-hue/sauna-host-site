import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { brand, fonts } from "../brand";

export type TerminalLine =
  | { type: "prompt"; text: string }
  | { type: "output"; text: string; color?: "green" | "muted" | "accent" };

const lineColor = (line: TerminalLine) => {
  if (line.type === "prompt") return brand.codeText;
  if (line.color === "green") return brand.codeGreen;
  if (line.color === "muted") return brand.codeMuted;
  if (line.color === "accent") return brand.codeAccent;
  return brand.codeText;
};

/**
 * Animated terminal — types out lines progressively as the frame advances.
 * Each line gets a chunk of the local frame range.
 */
export const Terminal: React.FC<{
  title?: string;
  lines: TerminalLine[];
  width?: number | string;
  fontSize?: number;
  totalFrames: number; // duration this terminal animation should fill
}> = ({ title = "Terminal — pinterest_automation", lines, width = 1100, fontSize = 24, totalFrames }) => {
  const frame = useCurrentFrame();
  const perLine = totalFrames / Math.max(lines.length, 1);

  return (
    <div
      style={{
        width,
        background: brand.codeBg,
        border: `1px solid ${brand.codeMuted}33`,
        borderRadius: 14,
        boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
        overflow: "hidden",
        fontFamily: fonts.mono,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "14px 22px",
          background: "rgba(255,255,255,0.03)",
          borderBottom: `1px solid ${brand.codeMuted}22`,
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: 6, background: "#ff5f56" }} />
        <div style={{ width: 12, height: 12, borderRadius: 6, background: "#ffbd2e" }} />
        <div style={{ width: 12, height: 12, borderRadius: 6, background: "#27c93f" }} />
        <div style={{ marginLeft: 18, color: brand.codeMuted, fontSize: 18 }}>{title}</div>
      </div>
      <div style={{ padding: "26px 30px", lineHeight: 1.6, minHeight: 360 }}>
        {lines.map((line, i) => {
          const start = i * perLine;
          const charsToShow = Math.max(
            0,
            Math.floor(
              interpolate(frame, [start, start + perLine * 0.7], [0, line.text.length], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            ),
          );
          const visible = line.text.slice(0, charsToShow);
          const showCursor = frame >= start && frame < start + perLine * 0.7;
          return (
            <div
              key={i}
              style={{
                fontSize,
                color: lineColor(line),
                whiteSpace: "pre-wrap",
                opacity: frame < start ? 0 : 1,
              }}
            >
              {line.type === "prompt" && (
                <span style={{ color: brand.gold, marginRight: 10 }}>$</span>
              )}
              {visible}
              {showCursor && (
                <span
                  style={{
                    display: "inline-block",
                    width: 10,
                    height: fontSize,
                    background: brand.codeAccent,
                    marginLeft: 2,
                    verticalAlign: "text-bottom",
                    opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
