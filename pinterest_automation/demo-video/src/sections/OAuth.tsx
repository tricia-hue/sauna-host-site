import React from "react";
import { AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand, fonts } from "../brand";
import { CodeBlock } from "../components/CodeBlock";
import { Terminal } from "../components/Terminal";

const SectionHeader: React.FC<{ step: string; title: string }> = ({ step, title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({ frame, fps, config: { damping: 18 } });
  return (
    <div style={{ opacity: reveal, transform: `translateY(${(1 - reveal) * 16}px)` }}>
      <div
        style={{
          color: brand.gold,
          fontSize: 22,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          marginBottom: 8,
          fontFamily: fonts.display,
        }}
      >
        {step}
      </div>
      <div
        style={{
          color: brand.peach,
          fontSize: 56,
          fontWeight: 500,
          letterSpacing: "0.02em",
          fontFamily: fonts.display,
        }}
      >
        {title}
      </div>
    </div>
  );
};

const ConsentScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({ frame, fps, config: { damping: 16 } });
  const scopes = [
    "pins:read",
    "pins:write",
    "boards:read",
    "boards:write",
    "user_accounts:read",
  ];
  return (
    <div
      style={{
        width: 720,
        background: "white",
        borderRadius: 18,
        boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        padding: 48,
        opacity: reveal,
        transform: `translateY(${(1 - reveal) * 30}px) scale(${0.96 + reveal * 0.04})`,
        fontFamily: fonts.display,
      }}
    >
      <div
        style={{
          color: "#e60023",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "0.04em",
          marginBottom: 24,
        }}
      >
        Pinterest
      </div>
      <div style={{ color: "#222", fontSize: 28, fontWeight: 600, marginBottom: 14 }}>
        The Sauna Host - Auto Pin & Analytics wants access to your account
      </div>
      <div style={{ color: "#666", fontSize: 18, marginBottom: 28 }}>
        This app is requesting permission to:
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 20, color: "#222" }}>
        {scopes.map((scope, i) => {
          const localFrame = frame - 18 - i * 6;
          const itemReveal = spring({ frame: localFrame, fps, config: { damping: 18 } });
          return (
            <li
              key={scope}
              style={{
                padding: "12px 0",
                borderBottom: "1px solid #f0f0f0",
                opacity: itemReveal,
                transform: `translateX(${(1 - itemReveal) * 12}px)`,
              }}
            >
              <span style={{ color: "#27c93f", marginRight: 12, fontWeight: 700 }}>✓</span>
              <code style={{ fontFamily: fonts.mono, fontSize: 18, background: "#f5f5f5", padding: "2px 8px", borderRadius: 4 }}>{scope}</code>
            </li>
          );
        })}
      </ul>
      <div
        style={{
          display: "flex",
          gap: 12,
          marginTop: 36,
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            padding: "14px 32px",
            border: "1px solid #ddd",
            borderRadius: 24,
            color: "#444",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Cancel
        </div>
        <div
          style={{
            padding: "14px 36px",
            background: "#e60023",
            color: "white",
            borderRadius: 24,
            fontSize: 18,
            fontWeight: 700,
            boxShadow: frame > 90 ? "0 0 0 6px rgba(230,0,35,0.25)" : "none",
            transform: frame > 90 && frame < 110 ? "scale(0.96)" : "scale(1)",
          }}
        >
          Allow
        </div>
      </div>
    </div>
  );
};

export const OAuth: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [690, 720], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ background: brand.blueBlack, opacity: fadeOut, fontFamily: fonts.display }}>
      <div style={{ position: "absolute", top: 80, left: 120 }}>
        <SectionHeader step="Step 1 of 3" title="OAuth authentication" />
      </div>

      {/* Frames 0-180: show oauth_helper.py snippet */}
      <Sequence from={0} durationInFrames={180}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 80 }}>
          <CodeBlock
            title="oauth_helper.py · scopes"
            width={1100}
            fontSize={28}
            highlight={4}
            lines={[
              [{ kind: "muted", text: "# Scopes the app requests during OAuth" }],
              [{ kind: "plain", text: "SCOPES = [" }],
              [{ kind: "plain", text: "    " }, { kind: "accent", text: '"pins:read"' }, { kind: "plain", text: "," }],
              [{ kind: "plain", text: "    " }, { kind: "accent", text: '"pins:write"' }, { kind: "plain", text: "," }],
              [{ kind: "plain", text: "    " }, { kind: "accent", text: '"boards:read"' }, { kind: "plain", text: "," }],
              [{ kind: "plain", text: "    " }, { kind: "accent", text: '"boards:write"' }, { kind: "plain", text: "," }],
              [{ kind: "plain", text: "    " }, { kind: "accent", text: '"user_accounts:read"' }, { kind: "plain", text: "," }],
              [{ kind: "plain", text: "]" }],
            ]}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Frames 180-420: show consent screen */}
      <Sequence from={180} durationInFrames={240}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 80 }}>
          <ConsentScreen />
        </AbsoluteFill>
      </Sequence>

      {/* Frames 420-720: terminal showing token saved */}
      <Sequence from={420} durationInFrames={300}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 80 }}>
          <Terminal
            title="oauth_helper.py — running"
            totalFrames={300}
            width={1100}
            fontSize={24}
            lines={[
              { type: "prompt", text: "python oauth_helper.py" },
              { type: "output", text: "Opening browser for Pinterest authorization...", color: "muted" },
              { type: "output", text: "Waiting for redirect (after you click Allow in the browser)..." },
              { type: "output", text: "Got authorization code — exchanging for tokens..." },
              { type: "output", text: "Saved access_token + refresh_token to .env", color: "green" },
              { type: "output", text: "Done. The client auto-refreshes from here.", color: "muted" },
            ]}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
