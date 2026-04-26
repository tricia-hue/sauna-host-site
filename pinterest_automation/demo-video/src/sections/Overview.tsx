import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand, fonts } from "../brand";

const Box: React.FC<{
  label: string;
  sub?: string;
  appearAt: number;
  active?: boolean;
}> = ({ label, sub, appearAt, active }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({ frame: frame - appearAt, fps, config: { damping: 16 } });
  return (
    <div
      style={{
        background: active ? brand.gold : brand.teal,
        color: active ? brand.blueBlack : brand.peach,
        padding: "32px 44px",
        borderRadius: 16,
        minWidth: 320,
        textAlign: "center",
        boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
        opacity: reveal,
        transform: `translateY(${(1 - reveal) * 24}px) scale(${0.94 + reveal * 0.06})`,
        fontFamily: fonts.display,
      }}
    >
      <div
        style={{
          fontSize: 32,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        {label}
      </div>
      {sub && (
        <div
          style={{
            fontSize: 20,
            marginTop: 10,
            opacity: 0.85,
            letterSpacing: "0.02em",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
};

const Arrow: React.FC<{ appearAt: number }> = ({ appearAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({ frame: frame - appearAt, fps, config: { damping: 18 } });
  return (
    <div style={{ width: 80, opacity: reveal, color: brand.gold, fontSize: 64 }}>→</div>
  );
};

export const Overview: React.FC = () => {
  const frame = useCurrentFrame();
  const heading = spring({ frame, fps: 30, config: { damping: 18 } });
  const fadeOut = interpolate(frame, [210, 240], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: brand.blueBlack,
        opacity: fadeOut,
        fontFamily: fonts.display,
      }}
    >
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 80,
        }}
      >
        <div
          style={{
            color: brand.peach,
            fontSize: 50,
            letterSpacing: "0.04em",
            opacity: heading,
            transform: `translateY(${(1 - heading) * 20}px)`,
            textAlign: "center",
          }}
        >
          What this app does
        </div>

        <div
          style={{
            color: brand.peach,
            fontSize: 26,
            opacity: heading * 0.7,
            maxWidth: 1000,
            textAlign: "center",
            lineHeight: 1.5,
            letterSpacing: "0.01em",
          }}
        >
          Two scheduled pins per day from a curated, brand-owned content
          library to our own Pinterest business account — The Sauna Host.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            marginTop: 40,
          }}
        >
          <Box label="pin_queue.csv" sub="40 curated rows" appearAt={20} />
          <Arrow appearAt={50} />
          <Box label="post_next.py" sub="time-aware runner" appearAt={70} active />
          <Arrow appearAt={100} />
          <Box label="Pinterest API v5" sub="POST /pins" appearAt={120} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
