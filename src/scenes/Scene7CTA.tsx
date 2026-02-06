import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { BankrollGraph } from "../components/BankrollGraph";

// Design system colors
const COLORS = {
  bgPrimary: "#111827",
  bgCard: "#1f2937",
  textPrimary: "#ffffff",
  textPositive: "#22c55e",
  textYellow: "#facc15",
};

export const Scene7CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene duration: 90 frames (810-900 in video = 0-90 local)

  // Entry animation (frames 0-20)
  const entryOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleScale = spring({
    frame,
    fps,
    from: 0.9,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // CTA button animation
  const ctaDelay = 30;
  const ctaOpacity = interpolate(frame, [ctaDelay, ctaDelay + 20], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const ctaScale = spring({
    frame: frame - ctaDelay,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 10, stiffness: 120 },
  });

  // Pulse effect for CTA button
  const pulseScale = interpolate(
    frame,
    [ctaDelay + 30, ctaDelay + 45, ctaDelay + 60, ctaDelay + 75],
    [1, 1.05, 1, 1.05],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // Background opacity (dimmed)
  const bgOpacity = 0.3;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.bgPrimary} 0%, ${COLORS.bgCard} 100%)`,
        opacity: entryOpacity,
      }}
    >
      {/* Background BankrollGraph - Dimmed */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: bgOpacity,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
        }}
      >
        <BankrollGraph
          currentBankroll={3247.5}
          metrics={{
            winRate: 61.5,
            breakEven: 45.9,
            roi: 62.4,
            activeBets: 7,
            totalBets: 52,
            bestMonth: { name: "Enero 2026", profit: 487.3 },
            bestLeague: { name: "Premier League", profit: 425.8 },
          }}
        />
      </div>

      {/* CTA Overlay */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 60,
        }}
      >
        {/* Main Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          <h1
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: COLORS.textPrimary,
              fontFamily: "Montserrat, sans-serif",
              margin: 0,
              marginBottom: 20,
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
            }}
          >
            Empieza a Ganar
          </h1>
          <h2
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: COLORS.textPositive,
              fontFamily: "Montserrat, sans-serif",
              margin: 0,
              textShadow: "0 4px 20px rgba(34, 197, 94, 0.4)",
            }}
          >
            Con Matemáticas
          </h2>
        </div>

        {/* CTA Button */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `scale(${ctaScale * pulseScale})`,
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.textPositive,
              color: COLORS.textPrimary,
              padding: "24px 60px",
              borderRadius: 16,
              fontSize: 28,
              fontWeight: 700,
              fontFamily: "Montserrat, sans-serif",
              boxShadow: "0 8px 32px rgba(34, 197, 94, 0.5)",
              textAlign: "center",
            }}
          >
            🚀 ÚNETE GRATIS
          </div>
        </div>

        {/* Subtext */}
        <div
          style={{
            marginTop: 30,
            opacity: ctaOpacity,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 22,
              color: COLORS.textYellow,
              fontFamily: "Open Sans, sans-serif",
              margin: 0,
            }}
          >
            ⚡ Acceso inmediato a picks EV+
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
