import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadJetBrains } from "@remotion/google-fonts/JetBrainsMono";

import { Title } from "./sections/Title";
import { Overview } from "./sections/Overview";
import { OAuth } from "./sections/OAuth";
import { PinCreation } from "./sections/PinCreation";
import { Analytics } from "./sections/Analytics";
import { Closing } from "./sections/Closing";
import { brand } from "./brand";

loadInter();
loadJetBrains();

// Section durations (frames). 30 fps base. Total = 90 seconds.
const T = {
  title: 150, //  0:00 -> 0:05
  overview: 240, //  0:05 -> 0:13
  oauth: 720, //  0:13 -> 0:37
  pinCreation: 720, //  0:37 -> 1:01
  analytics: 540, //  1:01 -> 1:19
  closing: 330, //  1:19 -> 1:30
};

export const FPS = 30;
export const DEMO_DURATION_FRAMES =
  T.title + T.overview + T.oauth + T.pinCreation + T.analytics + T.closing;

const cum = {
  title: 0,
  overview: T.title,
  oauth: T.title + T.overview,
  pinCreation: T.title + T.overview + T.oauth,
  analytics: T.title + T.overview + T.oauth + T.pinCreation,
  closing: T.title + T.overview + T.oauth + T.pinCreation + T.analytics,
};

export const Demo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: brand.blueBlack }}>
      <Sequence from={cum.title} durationInFrames={T.title}>
        <Title />
      </Sequence>
      <Sequence from={cum.overview} durationInFrames={T.overview}>
        <Overview />
      </Sequence>
      <Sequence from={cum.oauth} durationInFrames={T.oauth}>
        <OAuth />
      </Sequence>
      <Sequence from={cum.pinCreation} durationInFrames={T.pinCreation}>
        <PinCreation />
      </Sequence>
      <Sequence from={cum.analytics} durationInFrames={T.analytics}>
        <Analytics />
      </Sequence>
      <Sequence from={cum.closing} durationInFrames={T.closing}>
        <Closing />
      </Sequence>
    </AbsoluteFill>
  );
};
