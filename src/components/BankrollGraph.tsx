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
  textMuted: "#6b7280", // text-gray-500
  textPositive: "#22c55e",
  textBlue: "#60a5fa", // text-blue-400
  textYellow: "#facc15", // text-yellow-400
  lineGreen: "#10b981",
  gridLine: "#374151",
};

interface MetricCardProps {
  icon: string;
  iconColor: string;
  label: string;
  value: string | number;
  valueColor?: string;
  subtext?: string;
  subtextColor?: string;
  delay: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  iconColor,
  label,
  value,
  valueColor = COLORS.textPrimary,
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
        <span style={{ fontSize: 24, color: iconColor }}>{icon}</span>
        <span
          style={{
            fontSize: 18,
            color: COLORS.textTertiary,
            fontFamily: "Open Sans, sans-serif",
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
    bestLeague: { name: "Premier League", profit: 425.8 },
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

  // Line drawing animation
  const lineProgress = interpolate(
    frame,
    [chartDelay + 20, chartDelay + 80],
    [0, 1],
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
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  // Create animated path (showing only portion based on lineProgress)
  const visiblePointCount = Math.ceil(lineProgress * (points.length - 1)) + 1;
  const visiblePoints = points.slice(0, visiblePointCount);
  const animatedLinePath = visiblePoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

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
          icon="📈"
          iconColor={COLORS.textPositive}
          label="Win Rate"
          value={`${metrics.winRate}%`}
          valueColor={COLORS.textPrimary}
          subtext={`Break-even: ${metrics.breakEven}%`}
          subtextColor={COLORS.textMuted}
          delay={5}
        />
        <MetricCard
          icon="💰"
          iconColor={COLORS.textPositive}
          label="ROI"
          value={`+${metrics.roi}%`}
          valueColor={COLORS.textPositive}
          delay={12}
        />
        <MetricCard
          icon="🎯"
          iconColor={COLORS.textBlue}
          label="Active Bets"
          value={metrics.activeBets}
          delay={19}
        />
        <MetricCard
          icon="📊"
          iconColor={COLORS.textBlue}
          label="Total Bets"
          value={metrics.totalBets}
          delay={26}
        />
        <MetricCard
          icon="📅"
          iconColor={COLORS.textYellow}
          label="Best Month"
          value={metrics.bestMonth.name}
          valueColor={COLORS.textPrimary}
          subtext={`+$${metrics.bestMonth.profit.toFixed(2)}`}
          subtextColor={COLORS.textPositive}
          delay={33}
        />
        <MetricCard
          icon="🏆"
          iconColor={COLORS.textYellow}
          label="Best League"
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

          {/* Animated Line */}
          <path
            d={animatedLinePath}
            fill="none"
            stroke={COLORS.lineGreen}
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Animated Dots */}
          {visiblePoints.map((point, i) => {
            const dotOpacity = interpolate(
              frame,
              [chartDelay + 20 + i * 8, chartDelay + 30 + i * 8],
              [0, 1],
              { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
            );
            return (
              <circle
                key={i}
                cx={point.x}
                cy={point.y}
                r={6}
                fill={COLORS.lineGreen}
                opacity={dotOpacity}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};
