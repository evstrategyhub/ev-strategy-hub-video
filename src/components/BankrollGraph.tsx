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
  textMuted: "#6b7280",
  textPositive: "#22c55e",
  textBlue: "#60a5fa",
  textYellow: "#facc15",
  lineGreen: "#10b981",
  gridLine: "#374151",
};

interface MetricCardProps {
  label: string;
  value: string | number;
  valueColor?: string;
  labelColor: string;
  subtext?: string;
  subtextColor?: string;
  delay: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  valueColor = COLORS.textPrimary,
  labelColor,
  subtext,
  subtextColor = COLORS.textMuted,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
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

  const translateY = interpolate(frame, [delay, delay + 25], [20, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <div
      style={{
        backgroundColor: COLORS.bgCard,
        borderRadius: 12,
        border: `1px solid ${COLORS.borderDefault}`,
        padding: 20,
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: labelColor,
            fontFamily: "Montserrat, sans-serif",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {label}
        </span>
      </div>
      <div
        style={{
          fontSize: 36,
          fontWeight: 700,
          color: valueColor,
          fontFamily: "Montserrat, sans-serif",
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      {subtext && (
        <div
          style={{
            fontSize: 16,
            color: subtextColor,
            fontFamily: "Open Sans, sans-serif",
            marginTop: 6,
          }}
        >
          {subtext}
        </div>
      )}
    </div>
  );
};

interface ChartDataPoint {
  date: string;
  profit: number;
}

interface BankrollGraphProps {
  currentBankroll?: number;
  metrics?: {
    winRate: number;
    breakEven: number;
    roi: number;
    activeBets: number;
    totalBets: number;
    bestMonth: { name: string; profit: number };
    bestLeague: { name: string; profit: number };
  };
  chartData?: ChartDataPoint[];
}

export const BankrollGraph: React.FC<BankrollGraphProps> = ({
  currentBankroll = 3247.5,
  metrics = {
    winRate: 61.5,
    breakEven: 45.9,
    roi: 62.4,
    activeBets: 7,
    totalBets: 52,
    bestMonth: { name: "Enero 2026", profit: 487.3 },
    bestLeague: { name: "Liga MX", profit: 425.8 },
  },
  chartData = [
    { date: "01", profit: 0 },
    { date: "05", profit: 325.8 },
    { date: "10", profit: 587.5 },
    { date: "15", profit: 865.9 },
    { date: "20", profit: 1232.5 },
    { date: "25", profit: 1800.8 },
    { date: "31", profit: 2247.5 },
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Chart container animation
  const chartDelay = 70;
  const chartOpacity = interpolate(frame, [chartDelay, chartDelay + 25], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const chartScale = spring({
    frame: frame - chartDelay,
    fps,
    from: 0.95,
    to: 1,
    config: { damping: 15, stiffness: 80 },
  });

  // Animate the bankroll value
  const animatedBankroll = interpolate(
    frame,
    [chartDelay + 10, chartDelay + 50],
    [2000, currentBankroll],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // Chart dimensions
  const chartWidth = 800;
  const chartHeight = 280;
  const padding = { top: 20, right: 30, bottom: 40, left: 60 };
  const graphWidth = chartWidth - padding.left - padding.right;
  const graphHeight = chartHeight - padding.top - padding.bottom;

  // Calculate scales
  const maxProfit = Math.max(...chartData.map((d) => d.profit));
  const xStep = graphWidth / (chartData.length - 1);

  // Generate path
  const points = chartData.map((d, i) => ({
    x: padding.left + i * xStep,
    y:
      padding.top +
      graphHeight -
      (d.profit / maxProfit) * graphHeight,
    profit: d.profit,
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  // Calculate approximate path length for strokeDashoffset animation
  const calculatePathLength = () => {
    let length = 0;
    for (let i = 1; i < points.length; i++) {
      const dx = points[i].x - points[i - 1].x;
      const dy = points[i].y - points[i - 1].y;
      length += Math.sqrt(dx * dx + dy * dy);
    }
    return length;
  };

  const pathLength = calculatePathLength();

  // Animate stroke using dashoffset for smooth drawing effect
  const strokeDashoffset = interpolate(
    frame,
    [chartDelay + 20, chartDelay + 80],
    [pathLength, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // Check if a point is a milestone ($500 increments)
  const isMilestone = (profit: number) => profit >= 500 && profit % 500 < 100;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 900,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* Metrics Grid - 2 columns, 3 rows */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 16,
        }}
      >
        <MetricCard
          labelColor={COLORS.textPositive}
          label="Win Rate"
          value={`${metrics.winRate}%`}
          valueColor={COLORS.textPrimary}
          subtext={`Break-even: ${metrics.breakEven}%`}
          subtextColor={COLORS.textMuted}
          delay={5}
        />
        <MetricCard
          labelColor={COLORS.textPositive}
          label="ROI"
          value={`+${metrics.roi}%`}
          valueColor={COLORS.textPositive}
          delay={12}
        />
        <MetricCard
          labelColor={COLORS.textBlue}
          label="Apuestas Activas"
          value={metrics.activeBets}
          delay={19}
        />
        <MetricCard
          labelColor={COLORS.textBlue}
          label="Total Apuestas"
          value={metrics.totalBets}
          delay={26}
        />
        <MetricCard
          labelColor={COLORS.textYellow}
          label="Mejor Mes"
          value={metrics.bestMonth.name}
          valueColor={COLORS.textPrimary}
          subtext={`+$${metrics.bestMonth.profit.toFixed(2)}`}
          subtextColor={COLORS.textPositive}
          delay={33}
        />
        <MetricCard
          labelColor={COLORS.textYellow}
          label="Mejor Liga"
          value={metrics.bestLeague.name}
          valueColor={COLORS.textPrimary}
          subtext={`+$${metrics.bestLeague.profit.toFixed(2)}`}
          subtextColor={COLORS.textPositive}
          delay={40}
        />
      </div>

      {/* Chart Container */}
      <div
        style={{
          backgroundColor: COLORS.bgCard,
          borderRadius: 12,
          border: `1px solid ${COLORS.borderDefault}`,
          padding: 28,
          opacity: chartOpacity,
          transform: `scale(${chartScale})`,
        }}
      >
        {/* Chart Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <h3
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: COLORS.textPrimary,
              fontFamily: "Montserrat, sans-serif",
              margin: 0,
            }}
          >
            Evolución de Bankroll
          </h3>
          <div
            style={{
              fontSize: 42,
              fontWeight: 700,
              color: COLORS.textPositive,
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            ${animatedBankroll.toFixed(2)}
          </div>
        </div>

        {/* SVG Chart */}
        <svg
          width={chartWidth}
          height={chartHeight}
          style={{ display: "block", margin: "0 auto" }}
        >
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
            <line
              key={i}
              x1={padding.left}
              y1={padding.top + graphHeight * (1 - ratio)}
              x2={padding.left + graphWidth}
              y2={padding.top + graphHeight * (1 - ratio)}
              stroke={COLORS.gridLine}
              strokeDasharray="4 4"
              strokeWidth={1}
            />
          ))}

          {/* Y-axis labels */}
          {[0, 0.5, 1].map((ratio, i) => (
            <text
              key={i}
              x={padding.left - 10}
              y={padding.top + graphHeight * (1 - ratio) + 4}
              fill={COLORS.textTertiary}
              fontSize={14}
              textAnchor="end"
              fontFamily="Open Sans, sans-serif"
            >
              ${Math.round(maxProfit * ratio)}
            </text>
          ))}

          {/* X-axis labels */}
          {chartData.map((d, i) => (
            <text
              key={i}
              x={padding.left + i * xStep}
              y={chartHeight - 10}
              fill={COLORS.textTertiary}
              fontSize={14}
              textAnchor="middle"
              fontFamily="Open Sans, sans-serif"
            >
              {d.date}
            </text>
          ))}

          {/* Animated Line with strokeDashoffset */}
          <path
            d={linePath}
            fill="none"
            stroke={COLORS.lineGreen}
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={pathLength}
            strokeDashoffset={strokeDashoffset}
          />

          {/* Animated Dots - larger for milestones */}
          {points.map((point, i) => {
            const dotDelay = chartDelay + 20 + i * 8;
            const dotOpacity = interpolate(
              frame,
              [dotDelay, dotDelay + 10],
              [0, 1],
              { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
            );

            const dotScale = spring({
              frame: frame - dotDelay,
              fps,
              from: 0,
              to: 1,
              config: { damping: 10, stiffness: 150 },
            });

            const baseRadius = isMilestone(point.profit) ? 10 : 6;
            const radius = baseRadius * dotScale;

            return (
              <g key={i}>
                {isMilestone(point.profit) && (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={radius + 4}
                    fill="none"
                    stroke={COLORS.lineGreen}
                    strokeWidth={2}
                    opacity={dotOpacity * 0.4}
                  />
                )}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={radius}
                  fill={COLORS.lineGreen}
                  opacity={dotOpacity}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
