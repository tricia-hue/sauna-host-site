import { Composition } from "remotion";
import { Demo, DEMO_DURATION_FRAMES, FPS } from "./Demo";

export const Root: React.FC = () => {
  return (
    <Composition
      id="Demo"
      component={Demo}
      durationInFrames={DEMO_DURATION_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
