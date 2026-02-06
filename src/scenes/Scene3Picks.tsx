import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { EVPickCard } from "../components/EVPickCard";

// Design system colors
const COLORS = {
  bgPrimary: "#111827",
  bgCard: "#1f2937",
  textPrimary: "#ffffff",
  textPositive: "#22c55e",
};

export const Scene3Picks: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene duration: 150 frames (270-420 in video = 0-150 local)
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
          🎯 Picks del Día
        </h1>
        <p
          style={{
            fontSize: 22,
            color: COLORS.textPositive,
            fontFamily: "Open Sans, sans-serif",
            margin: 0,
          }}
        >
          Análisis en tiempo real con IA
        </p>
      </div>

      {/* EVPickCard - Centered */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <EVPickCard
          matchTitle="Chiefs vs 49ers"
          league="NFL"
          date="09 Feb 2026"
          mainEV="+9.2%"
          mainRating="B"
          markets={[
            {
              bookmaker: "FanDuel",
              market: "Spread",
              odds: "-110",
              probIA: "54.2%",
              ev: "+8.3%",
              rating: "B",
            },
            {
              bookmaker: "DraftKings",
              market: "Moneyline",
              odds: "+145",
              probIA: "52.8%",
              ev: "+5.7%",
              rating: "C",
            },
            {
              bookmaker: "BetMGM",
              market: "Total O/U",
              odds: "-105",
              probIA: "58.1%",
              ev: "+12.4%",
              rating: "A",
            },
          ]}
        />
      </div>
    </AbsoluteFill>
  );
};
