import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import { ParlayBuilder } from "../components/ParlayBuilder";

// Scene duration: frames 450-600 (relative frame 0-150)
// 5 seconds at 30fps

const COLORS = {
  bgPrimary: "#111827",
  bgGradientMid: "#1f2937",
  textPrimary: "#ffffff",
  textSecondary: "#9ca3af",
  accentGreen: "#10b981",
  accentBlue: "#3b82f6",
};

export const Scene4_Parlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background animation
  const bgPulse = interpolate(frame, [0, 75, 150], [0, 0.03, 0], {
    extrapolateRight: "clamp",
  });

  // Scene title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 20], [-30, 0], {
    extrapolateRight: "clamp",
  });
  const titleScale = spring({
    frame,
    fps,
    from: 0.9,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // Decorative line animation
  const lineWidth = interpolate(frame, [15, 40], [0, 160], {
    extrapolateRight: "clamp",
  });

  // Exit animation
  const exitOpacity = interpolate(frame, [130, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${COLORS.bgPrimary} 0%, ${COLORS.bgGradientMid} ${45 + bgPulse * 100}%, ${COLORS.bgPrimary} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 60,
        paddingLeft: 40,
        paddingRight: 40,
        opacity: exitOpacity,
      }}
    >
      {/* Decorative gradients */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)",
          top: "5%",
          left: "-5%",
          opacity: titleOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          bottom: "10%",
          right: "-5%",
          opacity: titleOpacity,
        }}
      />

      {/* Scene Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 30,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px) scale(${titleScale})`,
        }}
      >
        <h1
          style={{
            fontSize: 46,
            fontWeight: 800,
            color: COLORS.textPrimary,
            fontFamily: "Montserrat, sans-serif",
            margin: 0,
            marginBottom: 8,
          }}
        >
          Construye{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.accentGreen}, ${COLORS.accentBlue})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Parlays Inteligentes
          </span>
        </h1>
      </div>

      {/* Decorative line */}
      <div
        style={{
          width: lineWidth,
          height: 3,
          background: `linear-gradient(90deg, ${COLORS.accentGreen}, ${COLORS.accentBlue})`,
          borderRadius: 2,
          marginBottom: 14,
        }}
      />

      {/* Subtitle */}
      <p
        style={{
          fontSize: 22,
          color: COLORS.textSecondary,
          fontFamily: "Open Sans, sans-serif",
          textAlign: "center",
          marginBottom: 30,
          opacity: interpolate(frame, [10, 30], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        Combina picks EV+ y maximiza tus ganancias potenciales
      </p>

      {/* Parlay Builder Component */}
      <ParlayBuilder
        picks={[
          {
            id: "1",
            teams: "Chiefs vs 49ers",
            league: "NFL",
            market: "Spread",
            selection: "Chiefs -3.5",
            odds: 1.91,
            stake: 50,
            profit: 45.5,
          },
          {
            id: "2",
            teams: "Lakers vs Celtics",
            league: "NBA",
            market: "Over/Under",
            selection: "Over 218.5",
            odds: 1.87,
            stake: 50,
            profit: 43.5,
          },
        ]}
        parlay={{
          combinedOdds: 3.57,
          parlayEV: 9.9,
          stake: 100,
          potentialProfit: 257.0,
          rating: "A",
        }}
      />
    </AbsoluteFill>
  );
};
