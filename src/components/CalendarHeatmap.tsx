import React from "react";
import {
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

// Design system colors
const COLORS = {
  bgCard: "#1f2937",
  bgSection: "#374151",
  borderDefault: "#374151",
  textPrimary: "#ffffff",
  textSecondary: "#d1d5db",
  textTertiary: "#9ca3af",
  textPositive: "#22c55e",
  dayWin: "#22c55e",
  dayEmpty: "#374151",
};

interface CalendarHeatmapProps {
  title?: string;
  totalDays?: number;
  winDays?: number[];
}

interface DayCellProps {
  index: number;
  isWin: boolean;
  delay: number;
}

const DayCell: React.FC<DayCellProps> = ({ index, isWin, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const scale = spring({
    frame: frame - delay,
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 200 },
  });

  return (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: 6,
        backgroundColor: isWin ? COLORS.dayWin : COLORS.dayEmpty,
        opacity,
        transform: `scale(${scale})`,
      }}
    />
  );
};

export const CalendarHeatmap: React.FC<CalendarHeatmapProps> = ({
  title = "30 DÍAS APOSTANDO",
  totalDays = 30,
  winDays = [0, 2, 3, 5, 6, 7, 8, 10, 11, 12, 14, 15, 17, 18, 20, 22, 24],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header animation
  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const headerY = interpolate(frame, [0, 20], [-20, 0], {
    extrapolateRight: "clamp",
  });

  const headerScale = spring({
    frame,
    fps,
    from: 0.9,
    to: 1,
    config: { damping: 15, stiffness: 100 },
  });

  // Footer animation
  const footerDelay = 70;
  const footerOpacity = interpolate(
    frame,
    [footerDelay, footerDelay + 20],
    [0, 1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  const footerY = interpolate(
    frame,
    [footerDelay, footerDelay + 25],
    [20, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  // Animated counter for winning days
  const animatedWinCount = Math.round(
    interpolate(
      frame,
      [footerDelay, footerDelay + 30],
      [0, winDays.length],
      {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      }
    )
  );

  // Create days array with 35 cells (7x5 grid)
  const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];
  const cells = Array.from({ length: 35 }, (_, i) => ({
    index: i,
    isWin: i < totalDays && winDays.includes(i),
    isActive: i < totalDays,
  }));

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 400,
        backgroundColor: COLORS.bgCard,
        borderRadius: 16,
        border: `1px solid ${COLORS.borderDefault}`,
        padding: 28,
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 24,
          opacity: headerOpacity,
          transform: `translateY(${headerY}px) scale(${headerScale})`,
        }}
      >
        <h2
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: COLORS.textPrimary,
            fontFamily: "Montserrat, sans-serif",
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>

      {/* Days of week header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 8,
          marginBottom: 12,
          opacity: headerOpacity,
        }}
      >
        {daysOfWeek.map((day, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              fontSize: 12,
              fontWeight: 600,
              color: COLORS.textTertiary,
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 8,
          marginBottom: 24,
        }}
      >
        {cells.map((cell, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {cell.isActive ? (
              <DayCell
                index={cell.index}
                isWin={cell.isWin}
                delay={10 + i * 2}
              />
            ) : (
              <div style={{ width: 36, height: 36 }} />
            )}
          </div>
        ))}
      </div>

      {/* Footer with counter */}
      <div
        style={{
          textAlign: "center",
          opacity: footerOpacity,
          transform: `translateY(${footerY}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: COLORS.textPositive,
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            {animatedWinCount}
          </span>
          <span
            style={{
              fontSize: 18,
              color: COLORS.textSecondary,
              fontFamily: "Open Sans, sans-serif",
            }}
          >
            días con ganancias
          </span>
          <span style={{ fontSize: 24 }}>🎯</span>
        </div>
      </div>
    </div>
  );
};
