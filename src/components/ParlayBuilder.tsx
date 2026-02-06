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
  borderHighlight: "#22c55e",
  textPrimary: "#ffffff",
  textSecondary: "#d1d5db",
  textTertiary: "#9ca3af",
  textPositive: "#4ade80",
  textNegative: "#f87171",
  highlightGreen: "#22c55e",
};

interface PickData {
  id: string;
  teams: string;
  league: string;
  market: string;
  selection: string;
  odds: number;
  stake: number;
  profit: number;
}

interface ParlayData {
  combinedOdds: number;
  parlayEV: number;
  stake: number;
  potentialProfit: number;
  rating: string;
}

interface ParlayBuilderProps {
  picks?: PickData[];
  parlay?: ParlayData;
}

const PickCard: React.FC<{ pick: PickData; delay: number }> = ({
  pick,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const slideX = interpolate(frame, [delay, delay + 25], [-50, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const scale = spring({
    frame: frame - delay,
    fps,
    from: 0.95,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  return (
    <div
      style={{
        backgroundColor: COLORS.bgCard,
        borderRadius: 12,
        border: `1px solid ${COLORS.borderDefault}`,
        padding: 24,
        opacity,
        transform: `translateX(${slideX}px) scale(${scale})`,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div>
          <div
            style={{
              color: COLORS.textPrimary,
              fontWeight: 600,
              fontSize: 24,
              fontFamily: "Montserrat, sans-serif",
              marginBottom: 4,
            }}
          >
            {pick.teams}
          </div>
          <div
            style={{
              fontSize: 18,
              color: COLORS.textTertiary,
              fontFamily: "Open Sans, sans-serif",
            }}
          >
            {pick.league}
          </div>
        </div>
        <div
          style={{
            color: COLORS.textNegative,
            fontSize: 28,
            fontWeight: 300,
            cursor: "pointer",
          }}
        >
          ×
        </div>
      </div>

      {/* Market Section */}
      <div
        style={{
          backgroundColor: COLORS.bgSection,
          borderRadius: 10,
          padding: 16,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: COLORS.textTertiary,
            fontFamily: "Open Sans, sans-serif",
            marginBottom: 4,
          }}
        >
          Mercado: {pick.market}
        </div>
        <div
          style={{
            color: COLORS.textPositive,
            fontWeight: 500,
            fontSize: 22,
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          {pick.selection}
        </div>
      </div>

      {/* Metrics Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 14,
              color: COLORS.textTertiary,
              fontFamily: "Open Sans, sans-serif",
              marginBottom: 4,
            }}
          >
            Momio
          </div>
          <div
            style={{
              color: COLORS.textPrimary,
              fontWeight: 500,
              fontSize: 22,
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            {pick.odds.toFixed(2)}
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: 14,
              color: COLORS.textTertiary,
              fontFamily: "Open Sans, sans-serif",
              marginBottom: 4,
            }}
          >
            Stake
          </div>
          <div
            style={{
              color: COLORS.textPrimary,
              fontWeight: 500,
              fontSize: 22,
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            ${pick.stake}
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: 14,
              color: COLORS.textTertiary,
              fontFamily: "Open Sans, sans-serif",
              marginBottom: 4,
            }}
          >
            Profit
          </div>
          <div
            style={{
              color: COLORS.textPositive,
              fontWeight: 700,
              fontSize: 22,
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            ${pick.profit.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ParlayBuilder: React.FC<ParlayBuilderProps> = ({
  picks = [
    {
      id: "1",
      teams: "América vs Guadalajara",
      league: "Liga MX",
      market: "Ganador",
      selection: "América",
      odds: 1.91,
      stake: 50,
      profit: 45.5,
    },
    {
      id: "2",
      teams: "Barcelona vs Real Madrid",
      league: "La Liga",
      market: "Ambos Anotan",
      selection: "Sí",
      odds: 1.87,
      stake: 50,
      profit: 43.5,
    },
  ],
  parlay = {
    combinedOdds: 3.57,
    parlayEV: 9.9,
    stake: 100,
    potentialProfit: 257.0,
    rating: "A",
  },
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Parlay summary entrance
  const summaryDelay = 50;
  const summaryOpacity = interpolate(
    frame,
    [summaryDelay, summaryDelay + 25],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  const summaryScale = spring({
    frame: frame - summaryDelay,
    fps,
    from: 0.9,
    to: 1,
    config: { damping: 12, stiffness: 80 },
  });

  const summaryY = interpolate(
    frame,
    [summaryDelay, summaryDelay + 30],
    [40, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // Animate profit number
  const animatedProfit = interpolate(
    frame,
    [summaryDelay + 20, summaryDelay + 60],
    [0, parlay.potentialProfit],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1020,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* Pick Cards */}
      {picks.map((pick, index) => (
        <PickCard key={pick.id} pick={pick} delay={10 + index * 15} />
      ))}

      {/* Parlay Summary Card */}
      <div
        style={{
          backgroundColor: COLORS.bgCard,
          borderRadius: 12,
          border: `2px solid ${COLORS.borderHighlight}`,
          padding: 28,
          opacity: summaryOpacity,
          transform: `scale(${summaryScale}) translateY(${summaryY}px)`,
        }}
      >
        <h3
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: COLORS.highlightGreen,
            fontFamily: "Montserrat, sans-serif",
            margin: 0,
            marginBottom: 24,
          }}
        >
          Parlay Combinado
        </h3>

        {/* Stats Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.bgSection,
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div
              style={{
                fontSize: 18,
                color: COLORS.textTertiary,
                fontFamily: "Open Sans, sans-serif",
                marginBottom: 8,
              }}
            >
              Momios Combinados
            </div>
            <div
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: COLORS.textPrimary,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              {parlay.combinedOdds.toFixed(2)}
            </div>
          </div>
          <div
            style={{
              backgroundColor: COLORS.bgSection,
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div
              style={{
                fontSize: 18,
                color: COLORS.textTertiary,
                fontFamily: "Open Sans, sans-serif",
                marginBottom: 8,
              }}
            >
              EV Parlay
            </div>
            <div
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: COLORS.highlightGreen,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              +{parlay.parlayEV}%
            </div>
          </div>
        </div>

        {/* Stake and Profit Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
            marginBottom: 24,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 18,
                color: COLORS.textTertiary,
                fontFamily: "Open Sans, sans-serif",
                marginBottom: 12,
              }}
            >
              Stake
            </div>
            <div
              style={{
                backgroundColor: COLORS.bgSection,
                color: COLORS.textPrimary,
                borderRadius: 10,
                padding: 16,
                fontSize: 24,
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
              }}
            >
              ${parlay.stake}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 18,
                color: COLORS.textTertiary,
                fontFamily: "Open Sans, sans-serif",
                marginBottom: 12,
              }}
            >
              Profit Potencial
            </div>
            <div
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: COLORS.highlightGreen,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              ${animatedProfit.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Rating Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.highlightGreen,
              color: COLORS.textPrimary,
              padding: "12px 28px",
              borderRadius: 10,
              fontSize: 22,
              fontWeight: 700,
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Rating: {parlay.rating}
          </div>
        </div>
      </div>
    </div>
  );
};
