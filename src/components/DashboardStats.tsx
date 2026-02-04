import React from "react";
import {
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
  Easing,
} from "remotion";
import { Plus, ChevronDown } from "lucide-react";

// Design system colors from real app
const COLORS = {
  bgCard: "#1f2937", // bg-gray-800
  bgHeader: "#111827", // bg-gray-900
  bgRow: "rgba(55, 65, 81, 0.5)", // bg-gray-700/50
  borderDefault: "#374151", // border-gray-700
  borderActive: "#22c55e", // border-green-500
  textPrimary: "#ffffff",
  textSecondary: "#9ca3af", // text-gray-400
  textTertiary: "#6b7280", // text-gray-500
  textPositive: "#22c55e", // text-green-500
  textWarning: "#fbbf24", // text-yellow-400
  bgButton: "#16a34a", // bg-green-600
  bgButtonHover: "#15803d", // bg-green-700
};

interface Market {
  bookmaker: string;
  market: string;
  odds: string;
  probIA: string;
  ev: string;
  rating: "A" | "B" | "C" | "D" | "F";
}

interface EVPickCardProProps {
  homeTeam?: string;
  awayTeam?: string;
  league?: string;
  date?: string;
  markets?: Market[];
}

const getRatingColor = (rating: string) => {
  switch (rating) {
    case "A":
      return { bg: COLORS.textPositive, text: "#ffffff" };
    case "B":
      return { bg: COLORS.textPositive, text: "#ffffff" };
    case "C":
      return { bg: "#10b981", text: "#ffffff" }; // green-500
    case "D":
      return { bg: COLORS.textWarning, text: "#ffffff" };
    case "F":
      return { bg: "#ef4444", text: "#ffffff" }; // red-500
    default:
      return { bg: COLORS.textSecondary, text: "#ffffff" };
  }
};

export const EVPickCardPro: React.FC<EVPickCardProProps> = ({
  homeTeam = "Kansas City Chiefs",
  awayTeam = "San Francisco 49ers",
  league = "NFL",
  date = "09 Feb 2026",
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
      market: "Total",
      odds: "-105",
      probIA: "58.1%",
      ev: "+12.4%",
      rating: "A",
    },
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header animation
  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headerY = interpolate(frame, [0, 25], [-30, 0], {
    extrapolateRight: "clamp",
  });

  // Table headers animation
  const tableHeaderOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Rows stagger animation
  const getRowAnimation = (index: number) => {
    const delay = 25 + index * 8;

    const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    });

    const translateX = interpolate(frame, [delay, delay + 20], [50, 0], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.out(Easing.cubic),
    });

    const scale = spring({
      frame: frame - delay,
      fps,
      from: 0.95,
      to: 1,
      config: { damping: 15, stiffness: 120 },
    });

    return { opacity, translateX, scale };
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1000,
        backgroundColor: COLORS.bgCard,
        borderRadius: 16,
        border: `1px solid ${COLORS.borderDefault}`,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: COLORS.bgHeader,
          padding: "24px 32px",
          borderBottom: `1px solid ${COLORS.borderDefault}`,
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
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
                fontSize: 28,
                fontWeight: 600,
                color: COLORS.textPrimary,
                fontFamily: "Montserrat, sans-serif",
                marginBottom: 6,
              }}
            >
              {homeTeam} vs {awayTeam}
            </div>
            <div
              style={{
                fontSize: 16,
                color: COLORS.textSecondary,
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
                backgroundColor: "rgba(34, 197, 94, 0.2)",
                color: COLORS.textPositive,
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 500,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              EV: +8.3%
            </div>
            {/* Rating Badge */}
            <div
              style={{
                backgroundColor: COLORS.textPositive,
                color: "#ffffff",
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              B
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: `1px solid ${COLORS.borderDefault}`,
          opacity: headerOpacity,
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "16px 0",
            textAlign: "center",
            fontSize: 16,
            fontWeight: 500,
            color: COLORS.textPrimary,
            backgroundColor: COLORS.bgRow,
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Mercados
        </div>
        <div
          style={{
            flex: 1,
            padding: "16px 0",
            textAlign: "center",
            fontSize: 16,
            color: COLORS.textSecondary,
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Tendencias
        </div>
        <div
          style={{
            flex: 1,
            padding: "16px 0",
            textAlign: "center",
            fontSize: 16,
            color: COLORS.textSecondary,
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          H2H
        </div>
      </div>

      {/* Markets Table */}
      <div style={{ padding: 32 }}>
        {/* Table Headers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr 0.8fr 1fr 1fr 0.8fr 1fr",
            gap: 16,
            paddingLeft: 16,
            paddingRight: 16,
            marginBottom: 16,
            opacity: tableHeaderOpacity,
          }}
        >
          {["Casa", "Mercado", "Momio", "Prob. IA", "EV", "Rating", ""].map(
            (header, idx) => (
              <div
                key={idx}
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: COLORS.textSecondary,
                  textTransform: "uppercase",
                  fontFamily: "Montserrat, sans-serif",
                  textAlign: idx >= 2 ? "center" : "left",
                }}
              >
                {header}
              </div>
            )
          )}
        </div>

        {/* Market Rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {markets.map((market, index) => {
            const { opacity, translateX, scale } = getRowAnimation(index);
            const ratingStyle = getRatingColor(market.rating);

            return (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1.2fr 0.8fr 1fr 1fr 0.8fr 1fr",
                  gap: 16,
                  alignItems: "center",
                  backgroundColor: COLORS.bgRow,
                  borderRadius: 12,
                  padding: "16px",
                  opacity,
                  transform: `translateX(${translateX}px) scale(${scale})`,
                }}
              >
                {/* Bookmaker */}
                <div
                  style={{
                    fontSize: 16,
                    color: COLORS.textPrimary,
                    fontFamily: "Open Sans, sans-serif",
                  }}
                >
                  {market.bookmaker}
                </div>

                {/* Market */}
                <div
                  style={{
                    fontSize: 16,
                    color: COLORS.textSecondary,
                    fontFamily: "Open Sans, sans-serif",
                  }}
                >
                  {market.market}
                </div>

                {/* Odds */}
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: COLORS.textPrimary,
                    textAlign: "center",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  {market.odds}
                </div>

                {/* Prob IA */}
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: COLORS.textPositive,
                    textAlign: "center",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  {market.probIA}
                </div>

                {/* EV */}
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: COLORS.textPositive,
                    textAlign: "center",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  {market.ev}
                </div>

                {/* Rating Badge */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: ratingStyle.bg,
                      color: ratingStyle.text,
                      padding: "6px 12px",
                      borderRadius: 6,
                      fontSize: 14,
                      fontWeight: 700,
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {market.rating}
                  </div>
                </div>

                {/* Add Button */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: COLORS.bgButton,
                      color: "#ffffff",
                      padding: "8px 16px",
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    <Plus size={16} />
                    Agregar
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