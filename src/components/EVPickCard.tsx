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
  bgHeader: "#111827", // bg-gray-900
  bgRow: "rgba(55, 65, 81, 0.5)", // bg-gray-700/50
  bgTab: "#374151", // bg-gray-700
  bgEvBadge: "rgba(20, 83, 45, 0.3)", // bg-green-900/30
  borderDefault: "#374151",
  textPrimary: "#ffffff",
  textSecondary: "#d1d5db", // text-gray-300
  textTertiary: "#9ca3af", // text-gray-400
  textPositive: "#4ade80", // text-green-400
  ratingA: "#22c55e", // bg-green-500
  ratingB: "#22c55e",
  ratingC: "#86efac", // bg-green-300
  ratingD: "#facc15", // bg-yellow-400
  ratingF: "#ef4444", // bg-red-500
  buttonGreen: "#16a34a", // bg-green-600
};

const getRatingColor = (rating: string): string => {
  const colors: Record<string, string> = {
    A: COLORS.ratingA,
    B: COLORS.ratingB,
    C: COLORS.ratingC,
    D: COLORS.ratingD,
    F: COLORS.ratingF,
  };
  return colors[rating] || COLORS.ratingC;
};

interface MarketRow {
  bookmaker: string;
  market: string;
  odds: string;
  probIA: string;
  ev: string;
  rating: string;
}

interface EVPickCardProps {
  matchTitle?: string;
  league?: string;
  date?: string;
  mainEV?: string;
  mainRating?: string;
  markets?: MarketRow[];
}

export const EVPickCard: React.FC<EVPickCardProps> = ({
  matchTitle = "Chiefs vs 49ers",
  league = "NFL",
  date = "09 Feb 2026",
  mainEV = "+9.2%",
  mainRating = "B",
  markets = [
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
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Count high EV picks (EV > 8%)
  const highEvCount = markets.filter(
    (m) => parseFloat(m.ev.replace("+", "").replace("%", "")) > 8
  ).length;
  const totalEvPicks = 23; // Mock total for the badge

  // Simulated scroll animation
  const scrollY = interpolate(frame, [60, 150], [0, -60], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Helper to check if EV > 8%
  const isHighEV = (ev: string) => {
    const value = parseFloat(ev.replace("+", "").replace("%", ""));
    return value > 8;
  };

  // Card entrance animation
  const cardOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const cardScale = spring({
    frame,
    fps,
    from: 0.9,
    to: 1,
    config: { damping: 15, stiffness: 100 },
  });

  // Header animation
  const headerOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Tabs animation
  const tabsOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Badge animation
  const badgeOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateRight: "clamp",
  });

  const badgeScale = spring({
    frame: frame - 20,
    fps,
    from: 0.5,
    to: 1,
    config: { damping: 10, stiffness: 150 },
  });

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 950,
        opacity: cardOpacity,
        transform: `scale(${cardScale})`,
        position: "relative",
      }}
    >
      {/* Floating Badge - Top Right */}
      <div
        style={{
          position: "absolute",
          top: -12,
          right: 20,
          backgroundColor: COLORS.ratingA,
          color: COLORS.textPrimary,
          padding: "10px 20px",
          borderRadius: 24,
          fontSize: 16,
          fontWeight: 700,
          fontFamily: "Montserrat, sans-serif",
          boxShadow: "0 4px 12px rgba(34, 197, 94, 0.4)",
          opacity: badgeOpacity,
          transform: `scale(${badgeScale})`,
          zIndex: 10,
        }}
      >
        🎯 {totalEvPicks} picks EV+ hoy
      </div>

      {/* Main Card Container */}
      <div
        style={{
          backgroundColor: COLORS.bgCard,
          borderRadius: 12,
          border: `1px solid ${COLORS.borderDefault}`,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: COLORS.bgHeader,
            padding: "20px 32px",
            borderBottom: `1px solid ${COLORS.borderDefault}`,
            opacity: headerOpacity,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  color: COLORS.textPrimary,
                  fontWeight: 600,
                  fontSize: 28,
                  fontFamily: "Montserrat, sans-serif",
                  marginBottom: 4,
                }}
              >
                {matchTitle}
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: COLORS.textTertiary,
                  fontFamily: "Open Sans, sans-serif",
                }}
              >
                {league} • {date}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* EV Badge */}
              <div
                style={{
                  backgroundColor: COLORS.bgEvBadge,
                  color: COLORS.textPositive,
                  padding: "8px 16px",
                  borderRadius: 8,
                  fontSize: 20,
                  fontWeight: 500,
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                EV: {mainEV}
              </div>
              {/* Rating Badge */}
              <div
                style={{
                  backgroundColor: getRatingColor(mainRating),
                  color: COLORS.textPrimary,
                  padding: "8px 16px",
                  borderRadius: 8,
                  fontSize: 20,
                  fontWeight: 700,
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                {mainRating}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: `1px solid ${COLORS.borderDefault}`,
            opacity: tabsOpacity,
          }}
        >
          {["Mercados", "Tendencias", "H2H"].map((tab, i) => (
            <div
              key={tab}
              style={{
                flex: 1,
                padding: "16px 0",
                textAlign: "center",
                backgroundColor: i === 0 ? COLORS.bgTab : "transparent",
                color: i === 0 ? COLORS.textPrimary : COLORS.textTertiary,
                fontWeight: i === 0 ? 500 : 400,
                fontSize: 20,
                fontFamily: "Open Sans, sans-serif",
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Table Content with scroll animation */}
        <div
          style={{
            padding: 32,
            transform: `translateY(${scrollY}px)`,
          }}
        >
          {/* Table Headers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr 0.8fr 1fr 0.8fr 0.8fr 1fr",
              gap: 16,
              marginBottom: 16,
              padding: "0 16px",
              opacity: interpolate(frame, [35, 50], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            {["CASA", "MERCADO", "MOMIO", "PROB. IA", "EV", "RATING", ""].map(
              (header) => (
                <div
                  key={header}
                  style={{
                    fontSize: 14,
                    color: COLORS.textTertiary,
                    fontFamily: "Open Sans, sans-serif",
                    fontWeight: 600,
                    letterSpacing: 1,
                    textAlign: header === "PROB. IA" || header === "EV" || header === "RATING" ? "center" : "left",
                  }}
                >
                  {header}
                </div>
              )
            )}
          </div>

          {/* Market Rows */}
          {markets.map((market, index) => {
            const rowDelay = 45 + index * 15;
            const rowOpacity = interpolate(
              frame,
              [rowDelay, rowDelay + 15],
              [0, 1],
              { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
            );
            const rowX = interpolate(
              frame,
              [rowDelay, rowDelay + 20],
              [30, 0],
              { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
            );

            // Check if this market has high EV
            const hasHighEV = isHighEV(market.ev);

            // Glow animation for high EV rows
            const glowIntensity = hasHighEV
              ? interpolate(
                  frame,
                  [rowDelay + 15, rowDelay + 30, rowDelay + 45, rowDelay + 60],
                  [0.3, 0.6, 0.3, 0.6],
                  { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
                )
              : 0;

            return (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr 0.8fr 1fr 0.8fr 0.8fr 1fr",
                  gap: 16,
                  alignItems: "center",
                  backgroundColor: COLORS.bgRow,
                  borderRadius: 10,
                  padding: 16,
                  marginBottom: 12,
                  opacity: rowOpacity,
                  transform: `translateX(${rowX}px)`,
                  border: hasHighEV
                    ? `2px solid ${COLORS.ratingA}`
                    : "2px solid transparent",
                  boxShadow: hasHighEV
                    ? `0 0 20px rgba(34, 197, 94, ${glowIntensity})`
                    : "none",
                }}
              >
                <div
                  style={{
                    color: COLORS.textPrimary,
                    fontSize: 20,
                    fontFamily: "Open Sans, sans-serif",
                  }}
                >
                  {market.bookmaker}
                </div>
                <div
                  style={{
                    color: COLORS.textSecondary,
                    fontSize: 20,
                    fontFamily: "Open Sans, sans-serif",
                  }}
                >
                  {market.market}
                </div>
                <div
                  style={{
                    color: COLORS.textPrimary,
                    fontSize: 20,
                    fontWeight: 500,
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  {market.odds}
                </div>
                <div
                  style={{
                    color: COLORS.textPositive,
                    fontSize: 20,
                    fontWeight: 500,
                    fontFamily: "Montserrat, sans-serif",
                    textAlign: "center",
                  }}
                >
                  {market.probIA}
                </div>
                <div
                  style={{
                    color: COLORS.textPositive,
                    fontSize: 20,
                    fontWeight: 700,
                    fontFamily: "Montserrat, sans-serif",
                    textAlign: "center",
                  }}
                >
                  {market.ev}
                </div>
                <div style={{ textAlign: "center" }}>
                  <span
                    style={{
                      backgroundColor: getRatingColor(market.rating),
                      color: COLORS.textPrimary,
                      padding: "6px 14px",
                      borderRadius: 6,
                      fontSize: 16,
                      fontWeight: 700,
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {market.rating}
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      backgroundColor: COLORS.buttonGreen,
                      color: COLORS.textPrimary,
                      padding: "10px 16px",
                      borderRadius: 8,
                      fontSize: 18,
                      fontFamily: "Open Sans, sans-serif",
                      textAlign: "center",
                    }}
                  >
                    + Agregar
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
