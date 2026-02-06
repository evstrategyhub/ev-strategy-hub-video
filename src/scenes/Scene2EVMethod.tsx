import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { DashboardEVExplainer } from "../components/DashboardEVExplainer";

// Design system colors
const COLORS = {
  bgPrimary: "#111827",
  bgCard: "#1f2937",
  textPrimary: "#ffffff",
  textPositive: "#22c55e",
};

export const Scene2EVMethod: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene duration: 180 frames (90-270 in video = 0-180 local)
  const sceneDuration = 180;

  // Entry animation (frames 0-30)
  const entryOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const entryTranslateY = interpolate(frame, [0, 30], [50, 0], {
    extrapolateRight: "clamp",
  });

  // Exit animation (last 30 frames)
  const exitOpacity = interpolate(frame, [sceneDuration - 30, sceneDuration], [1, 0], {
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
          marginBottom: 60,
          opacity: titleOpacity,
          transform: `translateY(${titleTranslateY}px)`,
        }}
      >
        <h1
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: COLORS.textPrimary,
            fontFamily: "Montserrat, sans-serif",
            margin: 0,
            marginBottom: 16,
          }}
        >
          El Método EV
        </h1>
        <p
          style={{
            fontSize: 24,
            color: COLORS.textPositive,
            fontFamily: "Open Sans, sans-serif",
            margin: 0,
          }}
        >
          Apuestas basadas en datos, no en corazonadas
        </p>
      </div>

      {/* DashboardEVExplainer - Centered */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <DashboardEVExplainer />
      </div>
    </AbsoluteFill>
  );
};
