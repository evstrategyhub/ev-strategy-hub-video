import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CommunityShowcase } from "../components/CommunityShowcase";

// Design system colors
const COLORS = {
  bgPrimary: "#111827",
  bgCard: "#1f2937",
  textPrimary: "#ffffff",
  textPositive: "#22c55e",
};

export const Scene6Community: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene duration: 120 frames (690-810 in video = 0-120 local)
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
          marginBottom: 30,
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
          🏆 Comunidad EV
        </h1>
        <p
          style={{
            fontSize: 22,
            color: COLORS.textPositive,
            fontFamily: "Open Sans, sans-serif",
            margin: 0,
          }}
        >
          Únete a los mejores apostadores
        </p>
      </div>

      {/* CommunityShowcase - Centered */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <CommunityShowcase
          prizePool={5000}
          leaderboard={[
            { rank: 1, username: "ElProMX", profit: 687, isHighlighted: false },
            { rank: 2, username: "ValueHunter", profit: 598, isHighlighted: false },
            { rank: 3, username: "RodrigoEV", profit: 512, isHighlighted: true },
            { rank: 4, username: "SharpBettor", profit: 487, isHighlighted: false },
          ]}
          discordMembers={2847}
          discordMessages={[
            { username: "Carlos", message: "¿Análisis del Chiefs?" },
            { username: "Maria", message: "Yo veo value en Over..." },
          ]}
        />
      </div>
    </AbsoluteFill>
  );
};
