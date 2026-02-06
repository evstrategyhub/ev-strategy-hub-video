import { AbsoluteFill, Sequence } from "remotion";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2EVMethod } from "./scenes/Scene2EVMethod";
import { Scene3Picks } from "./scenes/Scene3Picks";
import { Scene4Strategy } from "./scenes/Scene4Strategy";
import { Scene5Parlay } from "./scenes/Scene5Parlay";
import { Scene6Community } from "./scenes/Scene6Community";
import { Scene7CTA } from "./scenes/Scene7CTA";

// Scene durations at 30fps
// Total: 900 frames = 30 seconds
const SCENE_DURATIONS = {
  scene1Hook: 90,       // 0-90: Hook with BankrollGraph + CalendarHeatmap
  scene2EVMethod: 180,  // 90-270: EV Methodology explanation
  scene3Picks: 150,     // 270-420: EV Picks showcase
  scene4Strategy: 150,  // 420-570: Strategy Builder with Kelly
  scene5Parlay: 120,    // 570-690: Parlay Validator
  scene6Community: 120, // 690-810: Community Showcase
  scene7CTA: 90,        // 810-900: Final CTA
};

export const VideoPromo: React.FC = () => {
  // Calculate start frames
  const scene1Start = 0;
  const scene2Start = scene1Start + SCENE_DURATIONS.scene1Hook;
  const scene3Start = scene2Start + SCENE_DURATIONS.scene2EVMethod;
  const scene4Start = scene3Start + SCENE_DURATIONS.scene3Picks;
  const scene5Start = scene4Start + SCENE_DURATIONS.scene4Strategy;
  const scene6Start = scene5Start + SCENE_DURATIONS.scene5Parlay;
  const scene7Start = scene6Start + SCENE_DURATIONS.scene6Community;

  return (
    <AbsoluteFill style={{ backgroundColor: "#111827" }}>
      {/* Scene 1: Hook - BankrollGraph + CalendarHeatmap overlay */}
      <Sequence from={scene1Start} durationInFrames={SCENE_DURATIONS.scene1Hook}>
        <Scene1Hook />
      </Sequence>

      {/* Scene 2: EV Method - DashboardEVExplainer */}
      <Sequence from={scene2Start} durationInFrames={SCENE_DURATIONS.scene2EVMethod}>
        <Scene2EVMethod />
      </Sequence>

      {/* Scene 3: Picks - EVPickCard */}
      <Sequence from={scene3Start} durationInFrames={SCENE_DURATIONS.scene3Picks}>
        <Scene3Picks />
      </Sequence>

      {/* Scene 4: Strategy - StrategyBuilder */}
      <Sequence from={scene4Start} durationInFrames={SCENE_DURATIONS.scene4Strategy}>
        <Scene4Strategy />
      </Sequence>

      {/* Scene 5: Parlay - ParlayValidator */}
      <Sequence from={scene5Start} durationInFrames={SCENE_DURATIONS.scene5Parlay}>
        <Scene5Parlay />
      </Sequence>

      {/* Scene 6: Community - CommunityShowcase */}
      <Sequence from={scene6Start} durationInFrames={SCENE_DURATIONS.scene6Community}>
        <Scene6Community />
      </Sequence>

      {/* Scene 7: CTA - Final call to action */}
      <Sequence from={scene7Start} durationInFrames={SCENE_DURATIONS.scene7CTA}>
        <Scene7CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
