import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand, fonts } from "../brand";
import { BrandPattern } from "../components/BrandPattern";

export const Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagline = spring({ frame, fps, config: { damping: 18, mass: 0.8 } });
  const wordmark = spring({ frame: frame - 12, fps, config: { damping: 18, mass: 0.8 } });
  const subline = spring({ frame: frame - 24, fps, config: { damping: 18, mass: 0.8 } });
  const fadeOut = interpolate(frame, [120, 150], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: brand.blueBlack,
        fontFamily: fonts.display,
        opacity: fadeOut,
      }}
    >
      <BrandPattern side="left" opacity={0.18} />
      <BrandPattern side="right" opacity={0.18} />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div
          style={{
            color: brand.gold,
            fontSize: 24,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            fontWeight: 500,
            opacity: tagline,
            transform: `translateY(${(1 - tagline) * 30}px)`,
          }}
        >
          Heat · Ice · Repeat
        </div>
        <div
          style={{
            color: brand.peach,
            fontSize: 110,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 500,
            opacity: wordmark,
            transform: `translateY(${(1 - wordmark) * 30}px)`,
          }}
        >
          The Sauna Host
        </div>
        <div
          style={{
            color: brand.peach,
            fontSize: 36,
            letterSpacing: "0.05em",
            opacity: subline * 0.85,
            transform: `translateY(${(1 - subline) * 24}px)`,
          }}
        >
          Pinterest API · Auto Pin & Analytics
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
