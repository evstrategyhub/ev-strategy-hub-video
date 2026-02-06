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
  textPositive: "#22c55e",
  textNegative: "#f87171",
  textYellow: "#facc15",
  ratingA: "#22c55e",
  ratingB: "#22c55e",
  ratingC: "#86efac",
  ratingF: "#ef4444",
};

// Get rating color and label
const getRatingStyle = (rating: string) => {
  switch (rating) {
    case "A":
      return { color: COLORS.ratingA, label: "EXCELENTE" };
    case "B":
      return { color: COLORS.ratingB, label: "BUENO" };
    case "C":
      return { color: COLORS.ratingC, label: "ACEPTABLE" };
    default:
      return { color: COLORS.ratingF, label: "EVITAR" };
  }
};

interface PickData {
  id: string;
  teams: string;
  league: string;
  market: string;
  selection: string;
  odds: number;
  ev: number;
}

interface ParlayData {
  combinedOdds: number;
  parlayEV: number;
  stake: number;
  potentialProfit: number;
  rating: string;
}

interface ParlayValidatorProps {
  picks?: PickData[];
  parlay?: ParlayData;
}

// Confetti particle component
const ConfettiParticle: React.FC<{
  index: number;
  delay: number;
}> = ({ index, delay }) => {
  const frame = useCurrentFrame();

  const startX = (index % 5) * 80 - 160 + Math.sin(index * 0.7) * 30;
  const startY = -50;
  const endY = 200;
  const rotation = index * 45;
  const colors = [COLORS.ratingA, COLORS.textYellow, COLORS.textPrimary, "#60a5fa"];
  const color = colors[index % colors.length];
  const size = 8 + (index % 3) * 4;

  const opacity = interpolate(frame, [delay, delay + 10, delay + 60, delay + 80], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const y = interpolate(frame, [delay, delay + 80], [startY, endY], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const x = startX + Math.sin((frame - delay) * 0.1 + index) * 20;

  const rotate = interpolate(frame, [delay, delay + 80], [0, rotation + 360], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: index % 2 === 0 ? "50%" : 2,
        opacity,
        transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
      }}
    />
  );
};

// Pick row for the validator
const PickRow: React.FC<{ pick: PickData; index: number; delay: number }> = ({
  pick,
  index,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const slideX = interpolate(frame, [delay, delay + 20], [-30, 0], {
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
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        backgroundColor: COLORS.bgSection,
        borderRadius: 10,
        opacity,
        transform: `translateX(${slideX}px) scale(${scale})`,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: COLORS.textPrimary,
            fontFamily: "Montserrat, sans-serif",
            marginBottom: 4,
          }}
        >
          {pick.teams}
        </div>
        <div
          style={{
            fontSize: 14,
            color: COLORS.textTertiary,
            fontFamily: "Open Sans, sans-serif",
            marginBottom: 2,
          }}
        >
          {pick.league} · {pick.market}
        </div>
        <div
          style={{
            fontSize: 14,
            color: COLORS.textSecondary,
            fontFamily: "Open Sans, sans-serif",
          }}
        >
          {pick.selection}
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: COLORS.textPrimary,
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          {pick.odds.toFixed(2)}
        </div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: COLORS.textPositive,
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          +{pick.ev}% EV
        </div>
      </div>
    </div>
  );
};

export const ParlayValidator: React.FC<ParlayValidatorProps> = ({
  picks = [
    { id: "1", teams: "América vs Guadalajara", league: "Liga MX", market: "Ganador", selection: "América", odds: 1.91, ev: 9.7 },
    { id: "2", teams: "Barcelona vs Real Madrid", league: "La Liga", market: "Ambos Anotan", selection: "Sí", odds: 1.87, ev: 8.2 },
    { id: "3", teams: "Liverpool vs Arsenal", league: "Premier League", market: "Total Goles +2.5", selection: "Over 2.5", odds: 1.72, ev: 7.1 },
  ],
  parlay = {
    combinedOdds: 6.12,
    parlayEV: 12.8,
    stake: 100,
    potentialProfit: 512,
    rating: "A",
  },
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ratingStyle = getRatingStyle(parlay.rating);
  const isRatingA = parlay.rating === "A";

  // Container animation
  const containerOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Odds multiplication animation
  const multiplyDelay = 50;
  const showMultiply = frame >= multiplyDelay;

  const odds1 = interpolate(frame, [multiplyDelay, multiplyDelay + 15], [0, picks[0]?.odds || 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const odds2 = interpolate(frame, [multiplyDelay + 15, multiplyDelay + 30], [0, picks[1]?.odds || 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const odds3 = interpolate(frame, [multiplyDelay + 30, multiplyDelay + 45], [0, picks[2]?.odds || 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const combinedOddsAnimated = interpolate(
    frame,
    [multiplyDelay + 45, multiplyDelay + 65],
    [0, parlay.combinedOdds],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // Rating badge animation
  const ratingDelay = 80;
  const ratingOpacity = interpolate(frame, [ratingDelay, ratingDelay + 20], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const ratingScale = spring({
    frame: frame - ratingDelay,
    fps,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 100 },
  });

  // Pulse for rating A
  const ratingPulse = isRatingA
    ? interpolate(
        frame,
        [ratingDelay + 20, ratingDelay + 35, ratingDelay + 50, ratingDelay + 65],
        [1, 1.1, 1, 1.1],
        { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
      )
    : 1;

  // Profit animation
  const profitDelay = 100;
  const animatedProfit = Math.round(
    interpolate(frame, [profitDelay, profitDelay + 30], [0, parlay.potentialProfit], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    })
  );

  const profitOpacity = interpolate(frame, [profitDelay, profitDelay + 15], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Confetti delay
  const confettiDelay = ratingDelay + 25;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 800,
        opacity: containerOpacity,
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: COLORS.textPrimary,
          fontFamily: "Montserrat, sans-serif",
          textAlign: "center",
          marginBottom: 24,
        }}
      >
        Validador de Parlay
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
        }}
      >
        {/* Left column - Picks */}
        <div
          style={{
            backgroundColor: COLORS.bgCard,
            borderRadius: 16,
            border: `1px solid ${COLORS.borderDefault}`,
            padding: 24,
          }}
        >
          <h3
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: COLORS.textPrimary,
              fontFamily: "Montserrat, sans-serif",
              marginBottom: 20,
            }}
          >
            Picks Seleccionados
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {picks.map((pick, index) => (
              <PickRow key={pick.id} pick={pick} index={index} delay={10 + index * 12} />
            ))}
          </div>

          {/* Odds multiplication display */}
          {showMultiply && (
            <div
              style={{
                marginTop: 20,
                padding: 16,
                backgroundColor: COLORS.bgSection,
                borderRadius: 10,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  color: COLORS.textTertiary,
                  fontFamily: "Open Sans, sans-serif",
                  marginBottom: 8,
                }}
              >
                Cálculo de Momios
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: COLORS.textPrimary,
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                {odds1.toFixed(2)} × {odds2.toFixed(2)} × {odds3.toFixed(2)} ={" "}
                <span style={{ color: COLORS.textPositive, fontWeight: 700 }}>
                  {combinedOddsAnimated.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right column - Rating and Results */}
        <div
          style={{
            backgroundColor: COLORS.bgCard,
            borderRadius: 16,
            border: `2px solid ${ratingStyle.color}`,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Confetti for rating A */}
          {isRatingA && frame >= confettiDelay && (
            <>
              {Array.from({ length: 15 }).map((_, i) => (
                <ConfettiParticle key={i} index={i} delay={confettiDelay + i * 2} />
              ))}
            </>
          )}

          {/* Large Rating Badge */}
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              backgroundColor: ratingStyle.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: ratingOpacity,
              transform: `scale(${ratingScale * ratingPulse})`,
              boxShadow: `0 0 40px ${ratingStyle.color}60`,
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontSize: 80,
                fontWeight: 800,
                color: COLORS.textPrimary,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              {parlay.rating}
            </span>
          </div>

          {/* Rating label */}
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: ratingStyle.color,
              fontFamily: "Montserrat, sans-serif",
              marginBottom: 24,
              opacity: ratingOpacity,
            }}
          >
            {ratingStyle.label}
          </div>

          {/* EV and Profit */}
          <div
            style={{
              textAlign: "center",
              opacity: profitOpacity,
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
              EV del Parlay
            </div>
            <div
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: COLORS.textPositive,
                fontFamily: "Montserrat, sans-serif",
                marginBottom: 20,
              }}
            >
              +{parlay.parlayEV}%
            </div>

            <div
              style={{
                fontSize: 18,
                color: COLORS.textTertiary,
                fontFamily: "Open Sans, sans-serif",
                marginBottom: 8,
              }}
            >
              Profit Potencial
            </div>
            <div
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: COLORS.textPositive,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              +${animatedProfit}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
