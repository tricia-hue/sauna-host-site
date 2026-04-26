import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand, fonts } from "../brand";
import { BrandPattern } from "../components/BrandPattern";

export const Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headline = spring({ frame, fps, config: { damping: 18 } });
  const subline = spring({ frame: frame - 18, fps, config: { damping: 18 } });
  const url = spring({ frame: frame - 36, fps, config: { damping: 18 } });
  const tag = spring({ frame: frame - 60, fps, config: { damping: 18 } });
  const fadeOut = interpolate(frame, [300, 330], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ background: brand.blueBlack, opacity: fadeOut, fontFamily: fonts.display }}>
      <BrandPattern side="left" opacity={0.15} />
      <BrandPattern side="right" opacity={0.15} />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 28,
          padding: "0 200px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: brand.gold,
            fontSize: 22,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            opacity: headline,
            transform: `translateY(${(1 - headline) * 24}px)`,
          }}
        >
          Requesting Standard access
        </div>
        <div
          style={{
            color: brand.peach,
            fontSize: 64,
            fontWeight: 500,
            letterSpacing: "0.02em",
            lineHeight: 1.15,
            maxWidth: 1300,
            opacity: subline,
            transform: `translateY(${(1 - subline) * 24}px)`,
          }}
        >
          Automated brand-owned content to our own Pinterest account.
        </div>
        <div
          style={{
            color: brand.peach,
            opacity: url * 0.75,
            fontSize: 28,
            marginTop: 18,
            letterSpacing: "0.04em",
            transform: `translateY(${(1 - url) * 16}px)`,
          }}
        >
          thesaunahost.com · revivery.com
        </div>
        <div
          style={{
            color: brand.gold,
            fontSize: 20,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            marginTop: 60,
            opacity: tag * 0.9,
            transform: `translateY(${(1 - tag) * 16}px)`,
          }}
        >
          Heat · Ice · Repeat
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
