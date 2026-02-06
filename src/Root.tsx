import { Composition } from "remotion";
import { VideoPromo } from "./VideoPromo";
import { DashboardStatsComposition } from "./compositions/DashboardStatsComposition";
import { EVPickCardComposition } from "./compositions/EVPickCardComposition";
import { ParlayBuilderComposition } from "./compositions/ParlayBuilderComposition";
import { BankrollGraphComposition } from "./compositions/BankrollGraphComposition";
import { CommunityLeaderboardComposition } from "./compositions/CommunityLeaderboardComposition";
import { CalendarHeatmapComposition } from "./compositions/CalendarHeatmapComposition";
import { DashboardEVExplainerComposition } from "./compositions/DashboardEVExplainerComposition";
import { StrategyBuilderComposition } from "./compositions/StrategyBuilderComposition";
import { CommunityShowcaseComposition } from "./compositions/CommunityShowcaseComposition";
import { ParlayValidatorComposition } from "./compositions/ParlayValidatorComposition";
import "./style.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Main video composition (vertical 1080x1920) */}
      <Composition
        id="VideoPromo"
        component={VideoPromo}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Individual component previews (vertical 1080x1920, 150 frames) */}
      <Composition
        id="DashboardStats"
        component={DashboardStatsComposition}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="EVPickCard"
        component={EVPickCardComposition}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ParlayBuilder"
        component={ParlayBuilderComposition}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BankrollGraph"
        component={BankrollGraphComposition}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CommunityLeaderboard"
        component={CommunityLeaderboardComposition}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CalendarHeatmap"
        component={CalendarHeatmapComposition}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="DashboardEVExplainer"
        component={DashboardEVExplainerComposition}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="StrategyBuilder"
        component={StrategyBuilderComposition}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CommunityShowcase"
        component={CommunityShowcaseComposition}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ParlayValidator"
        component={ParlayValidatorComposition}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
