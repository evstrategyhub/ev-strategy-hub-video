import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { StrategyBuilder } from "../components/StrategyBuilder";

// Design system colors
const COLORS = {
  bgPrimary: "#111827",
  bgCard: "#1f2937",
  textPrimary: "#ffffff",
  textPositive: "#22c55e",
};

export const Scene4Strategy: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene duration: 150 frames (420-570 in video = 0-150 local)
  const sceneDuration = 150;

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

  // Title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleTranslateY = interpolate(frame, [0, 25], [30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.bgPrimary} 0%, ${COLORS.bgCard} 100%)`,
        padding: 40,
        opacity: finalOpacity,
        transform: `translateY(${entryTranslateY}px)`,
      }}
    >
      {/* Title */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 40,
          opacity: titleOpacity,
          transform: `translateY(${titleTranslateY}px)`,
        }}
      >
        <h1
          style={{
            fontSize: 42,
            fontWeight: 800,
            color: COLORS.textPrimary,
            fontFamily: "Montserrat, sans-serif",
            margin: 0,
            marginBottom: 12,
          }}
        >
          📊 Strategy Builder
        </h1>
        <p
          style={{
            fontSize: 22,
            color: COLORS.textPositive,
            fontFamily: "Open Sans, sans-serif",
            margin: 0,
          }}
        >
          Criterio Kelly para stakes óptimos
        </p>
      </div>

      {/* StrategyBuilder - Centered */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <StrategyBuilder
          bankroll={5000}
          method="kelly"
          picks={[
            {
              id: "1",
              teams: "Chiefs vs 49ers",
              market: "Spread",
              selection: "Chiefs -3.5",
              odds: 1.91,
              ev: 9.7,
              kellyStake: 87,
            },
            {
              id: "2",
              teams: "Lakers vs Celtics",
              market: "Over/Under",
              selection: "Over 218.5",
              odds: 1.87,
              ev: 8.2,
              kellyStake: 91,
            },
            {
              id: "3",
              teams: "Liverpool vs Arsenal",
              market: "Both Teams Score",
              selection: "Yes",
              odds: 1.72,
              ev: 7.1,
              kellyStake: 73,
            },
          ]}
        />
      </div>
    </AbsoluteFill>
  );
};
