import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { BankrollGraph } from "../components/BankrollGraph";
import { CalendarHeatmap } from "../components/CalendarHeatmap";

// Design system colors
const COLORS = {
  bgPrimary: "#111827",
  bgCard: "#1f2937",
  textPrimary: "#ffffff",
  textPositive: "#22c55e",
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entry animation (frames 0-30)
  const entryOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const entryTranslateY = interpolate(frame, [0, 30], [50, 0], {
    extrapolateRight: "clamp",
  });

  // Exit animation (frames 70-90)
  const exitOpacity = interpolate(frame, [70, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const finalOpacity = Math.min(entryOpacity, exitOpacity);

  // CalendarHeatmap overlay animation
  const calendarDelay = 20;
  const calendarOpacity = interpolate(frame, [calendarDelay, calendarDelay + 25], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const calendarScale = spring({
    frame: frame - calendarDelay,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 12, stiffness: 80 },
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
      {/* BankrollGraph - Main content */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          paddingBottom: 200, // Space for calendar overlay
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

      {/* CalendarHeatmap - Overlay bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          maxWidth: 350,
          opacity: calendarOpacity,
          transform: `scale(${calendarScale})`,
        }}
      >
        <CalendarHeatmap
          title="30 DÍAS APOSTANDO"
          winDays={[0, 2, 3, 5, 6, 7, 9, 10, 12, 14, 15, 17, 19, 20, 21, 23, 25]}
        />
      </div>
    </AbsoluteFill>
  );
};
