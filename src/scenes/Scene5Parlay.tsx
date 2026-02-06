import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ParlayValidator } from "../components/ParlayValidator";

// Design system colors
const COLORS = {
  bgPrimary: "#111827",
  bgCard: "#1f2937",
  textPrimary: "#ffffff",
  textPositive: "#22c55e",
};

export const Scene5Parlay: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene duration: 120 frames (570-690 in video = 0-120 local)
  const sceneDuration = 120;

  // Entry animation (frames 0-30)
  const entryOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const entryTranslateY = interpolate(frame, [0, 30], [50, 0], {
    extrapolateRight: "clamp",
  });

  // Exit animation (last 20 frames)
  const exitOpacity = interpolate(frame, [sceneDuration - 20, sceneDuration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const finalOpacity = Math.min(entryOpacity, exitOpacity);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.bgPrimary} 0%, ${COLORS.bgCard} 100%)`,
        padding: 40,
        opacity: finalOpacity,
        transform: `translateY(${entryTranslateY}px)`,
      }}
    >
      {/* ParlayValidator - Centered */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <ParlayValidator
          picks={[
            {
              id: "1",
              teams: "Chiefs vs 49ers",
              league: "NFL",
              market: "Spread",
              selection: "Chiefs -3.5",
              odds: 1.91,
              ev: 9.7,
            },
            {
              id: "2",
              teams: "Lakers vs Celtics",
              league: "NBA",
              market: "Over/Under",
              selection: "Over 218.5",
              odds: 1.87,
              ev: 8.2,
            },
            {
              id: "3",
              teams: "Liverpool vs Arsenal",
              league: "EPL",
              market: "Both Score",
              selection: "Yes",
              odds: 1.72,
              ev: 7.1,
            },
          ]}
          parlay={{
            combinedOdds: 6.12,
            parlayEV: 12.8,
            stake: 100,
            potentialProfit: 512,
            rating: "A",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
