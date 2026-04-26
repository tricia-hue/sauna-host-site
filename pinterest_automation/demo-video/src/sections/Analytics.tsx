import React from "react";
import { AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand, fonts } from "../brand";
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

const StatCard: React.FC<{ label: string; value: string; appearAt: number }> = ({
  label,
  value,
  appearAt,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({ frame: frame - appearAt, fps, config: { damping: 16 } });
  return (
    <div
      style={{
        background: brand.teal,
        color: brand.peach,
        padding: "32px 44px",
        borderRadius: 14,
        textAlign: "center",
        minWidth: 280,
        boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
        opacity: reveal,
        transform: `translateY(${(1 - reveal) * 20}px)`,
        fontFamily: fonts.display,
      }}
    >
      <div style={{ color: brand.gold, fontSize: 16, letterSpacing: "0.3em", textTransform: "uppercase" }}>
        {label}
      </div>
      <div style={{ fontSize: 64, fontWeight: 600, marginTop: 12 }}>{value}</div>
    </div>
  );
};

export const Analytics: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [510, 540], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ background: brand.blueBlack, opacity: fadeOut, fontFamily: fonts.display }}>
      <div style={{ position: "absolute", top: 80, left: 120 }}>
        <SectionHeader step="Step 3 of 3" title="Analytics for measurement" />
      </div>

      {/* Frames 0-260: terminal running pull_analytics.py */}
      <Sequence from={0} durationInFrames={260}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 80 }}>
          <Terminal
            title="pull_analytics.py — weekly run"
            totalFrames={260}
            width={1200}
            fontSize={22}
            lines={[
              { type: "prompt", text: "python pull_analytics.py" },
              { type: "output", text: "Pulling user_account analytics 2026-03-27 to 2026-04-26..." },
              { type: "output", text: "Wrote analytics_user_2026-04-26.csv", color: "green" },
              { type: "output", text: "Pulling per-pin analytics for 2 pins..." },
              { type: "output", text: "Wrote analytics_pins_2026-04-26.csv", color: "green" },
              { type: "output", text: "Done.", color: "muted" },
            ]}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Frames 260-540: stat cards illustrating the analytics metrics */}
      <Sequence from={260} durationInFrames={280}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 100 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 50, alignItems: "center" }}>
            <div style={{ color: brand.peach, fontSize: 32, opacity: 0.85, letterSpacing: "0.02em" }}>
              Tracked weekly across the 20-day rollout
            </div>
            <div style={{ display: "flex", gap: 36 }}>
              <StatCard label="Impressions" value="—" appearAt={20} />
              <StatCard label="Saves" value="—" appearAt={45} />
              <StatCard label="Outbound clicks" value="—" appearAt={70} />
              <StatCard label="CTR" value="—" appearAt={95} />
            </div>
            <div
              style={{
                color: brand.codeMuted,
                fontSize: 22,
                marginTop: 32,
                opacity: 0.8,
                fontStyle: "italic",
                letterSpacing: "0.02em",
              }}
            >
              Filled in once Standard access is granted and the schedule begins.
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
