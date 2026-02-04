import { AbsoluteFill, Sequence } from "remotion";
import { Scene1Hero } from "./scenes/Scene1";
import { Scene2Dashboard } from "./scenes/Scene2";
import { Scene3EVPicks } from "./scenes/Scene3";
import { Scene4Parlay } from "./scenes/Scene4";
import { Scene5Bankroll } from "./scenes/Scene5";
import { Scene6Community } from "./scenes/Scene6";

const SCENE_DURATION = 150; // 5 seconds at 30fps

export const VideoPromo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#111827" }}>
      <Sequence from={0} durationInFrames={SCENE_DURATION}>
        <Scene1Hero />
      </Sequence>
      <Sequence from={SCENE_DURATION} durationInFrames={SCENE_DURATION}>
        <Scene2Dashboard />
      </Sequence>
      <Sequence from={SCENE_DURATION * 2} durationInFrames={SCENE_DURATION}>
        <Scene3EVPicks />
      </Sequence>
      <Sequence from={SCENE_DURATION * 3} durationInFrames={SCENE_DURATION}>
        <Scene4Parlay />
      </Sequence>
      <Sequence from={SCENE_DURATION * 4} durationInFrames={SCENE_DURATION}>
        <Scene5Bankroll />
      </Sequence>
      <Sequence from={SCENE_DURATION * 5} durationInFrames={SCENE_DURATION}>
        <Scene6Community />
      </Sequence>
    </AbsoluteFill>
  );
};
