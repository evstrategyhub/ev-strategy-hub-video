import { Composition } from "remotion";
import { VideoPromo } from "./VideoPromo";
import { BankrollOverviewComposition } from "./compositions/BankrollOverviewComposition";
import { MonthlyProfitsComposition } from "./compositions/MonthlyProfitsComposition";
import { MatchCardComposition } from "./compositions/MatchCardComposition";
import { MatchCardNBAComposition } from "./compositions/MatchCardNBAComposition";
import { EVPickCardComposition } from "./compositions/EVPickCardComposition";
import { StrategyBuilderComposition } from "./compositions/StrategyBuilderComposition";
import { ParlayValidatorComposition } from "./compositions/ParlayValidatorComposition";
import { CommunityLeaderboardComposition } from "./compositions/CommunityLeaderboardComposition";
import { EVPicksMainComposition } from "./compositions/EVPicksMainComposition";
import { CTAFinalComposition } from "./compositions/CTAFinalComposition";
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
        id="BankrollOverview"
        component={BankrollOverviewComposition}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="MonthlyProfits"
        component={MonthlyProfitsComposition}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="MatchCard"
        component={MatchCardComposition}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="MatchCardNBA"
        component={MatchCardNBAComposition}
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
        id="StrategyBuilder"
        component={StrategyBuilderComposition}
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
      <Composition
        id="CommunityLeaderboard"
        component={CommunityLeaderboardComposition}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="EVPicksMain"
        component={EVPicksMainComposition}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CTAFinal"
        component={CTAFinalComposition}
        durationInFrames={120}
        fps={30}
        width={1080}
        height={1920}
      />
    </> 
  );
};
