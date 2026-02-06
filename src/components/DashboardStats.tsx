import React from "react";
import {
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

// Design system colors from real app
const COLORS = {
  bgCard: "#1f2937", // bg-gray-800
  borderDefault: "#374151", // border-gray-700
  textPrimary: "#ffffff",
  textTertiary: "#9ca3af", // text-gray-400
  textPositive: "#22c55e", // text-green-500
};

interface StatCardProps {
  label: string;
  value: number;
  valueColor: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  valueColor,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const translateY = interpolate(frame, [delay, delay + 25], [30, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const scale = spring({
    frame: frame - delay,
    fps,
    from: 0.85,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // Animate the number counting up
  const animatedValue = Math.round(
    interpolate(frame, [delay + 5, delay + 35], [0, value], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    })
  );

  return (
    <div
      style={{
        backgroundColor: COLORS.bgCard,
        borderRadius: 12,
        border: `1px solid ${COLORS.borderDefault}`,
        padding: 24,
        textAlign: "center",
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: valueColor,
          fontFamily: "Montserrat, sans-serif",
          marginBottom: 8,
        }}
      >
        {animatedValue}
      </div>
      <div
        style={{
          fontSize: 18,
          color: COLORS.textTertiary,
          fontFamily: "Open Sans, sans-serif",
        }}
      >
        {label}
      </div>
    </div>
  );
};

interface DashboardStatsProps {
  stats?: {
    partidos: number;
    mercados: number;
    evPlus: number;
  };
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  stats = {
    partidos: 12,
    mercados: 84,
    evPlus: 23,
  },
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Container animation
  const containerOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 20], [-20, 0], {
    extrapolateRight: "clamp",
  });

  const titleScale = spring({
    frame,
    fps,
    from: 0.9,
    to: 1,
    config: { damping: 15, stiffness: 80 },
  });

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1020,
        opacity: containerOpacity,
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: COLORS.textPrimary,
          fontFamily: "Montserrat, sans-serif",
          marginBottom: 24,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px) scale(${titleScale})`,
        }}
      >
        Dashboard en Tiempo Real
      </h2>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        <StatCard
          label="Total Partidos"
          value={stats.partidos}
          valueColor={COLORS.textPrimary}
          delay={10}
        />
        <StatCard
          label="Total Mercados"
          value={stats.mercados}
          valueColor={COLORS.textPrimary}
          delay={20}
        />
        <StatCard
          label="Total EV+"
          value={stats.evPlus}
          valueColor={COLORS.textPositive}
          delay={30}
        />
      </div>
    </div>
  );
};
