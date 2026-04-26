import React from "react";
import { brand, fonts } from "../brand";

type Token =
  | { kind: "plain"; text: string }
  | { kind: "muted"; text: string }
  | { kind: "accent"; text: string }
  | { kind: "green"; text: string }
  | { kind: "red"; text: string };

export type CodeLine = Token[];

const colorFor = (kind: Token["kind"]) => {
  switch (kind) {
    case "muted":
      return brand.codeMuted;
    case "accent":
      return brand.codeAccent;
    case "green":
      return brand.codeGreen;
    case "red":
      return brand.codeRed;
    default:
      return brand.codeText;
  }
};

export const CodeBlock: React.FC<{
  title?: string;
  lines: CodeLine[];
  highlight?: number; // line index to subtly accent
  width?: number | string;
  fontSize?: number;
}> = ({ title, lines, highlight, width = 1100, fontSize = 26 }) => {
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
        {title && (
          <div
            style={{
              marginLeft: 18,
              color: brand.codeMuted,
              fontSize: 18,
              letterSpacing: 0.5,
            }}
          >
            {title}
          </div>
        )}
      </div>
      <div style={{ padding: "26px 30px", lineHeight: 1.55 }}>
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              fontSize,
              color: brand.codeText,
              background: i === highlight ? "rgba(173,141,76,0.12)" : "transparent",
              padding: i === highlight ? "2px 6px" : "0 6px",
              margin: "0 -6px",
              borderRadius: 4,
              whiteSpace: "pre",
            }}
          >
            {line.map((token, j) => (
              <span key={j} style={{ color: colorFor(token.kind) }}>
                {token.text}
              </span>
            ))}
            {line.length === 0 && <span>&nbsp;</span>}
          </div>
        ))}
      </div>
    </div>
  );
};
