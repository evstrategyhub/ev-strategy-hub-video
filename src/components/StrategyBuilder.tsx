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
  borderActive: "#22c55e",
  textPrimary: "#ffffff",
  textSecondary: "#d1d5db",
  textTertiary: "#9ca3af",
  textPositive: "#22c55e",
  textYellow: "#facc15",
  accentBlue: "#3b82f6",
};

interface PickItem {
  id: string;
  match: string;
  selection: string;
  odds: number;
  ev: number;
}

interface StakeCalculation {
  pickId: string;
  amount: number;
}

interface StrategyBuilderProps {
  bankroll?: number;
  method?: "straight" | "kelly";
  picks?: PickItem[];
  stakes?: StakeCalculation[];
}

// Checkbox with animation
const AnimatedCheckbox: React.FC<{ delay: number; checked: boolean }> = ({
  delay,
  checked,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const checkOpacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const checkScale = spring({
    frame: frame - delay,
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 150 },
  });

  return (
    <div
      style={{
        width: 24,
        height: 24,
        borderRadius: 6,
        border: `2px solid ${checked ? COLORS.textPositive : COLORS.borderDefault}`,
        backgroundColor: checked ? COLORS.textPositive : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {checked && (
        <span
          style={{
            color: COLORS.textPrimary,
            fontSize: 16,
            fontWeight: 700,
            opacity: checkOpacity,
            transform: `scale(${checkScale})`,
          }}
        >
          ✓
        </span>
      )}
    </div>
  );
};

// Pick row component
const PickRow: React.FC<{
  pick: PickItem;
  index: number;
  checkDelay: number;
}> = ({ pick, index, checkDelay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = 5 + index * 12;

  const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const slideX = interpolate(frame, [delay, delay + 25], [-40, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const scale = spring({
    frame: frame - delay,
    fps,
    from: 0.9,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  const isChecked = frame >= checkDelay;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: 16,
        backgroundColor: COLORS.bgSection,
        borderRadius: 12,
        opacity,
        transform: `translateX(${slideX}px) scale(${scale})`,
        border: isChecked
          ? `1px solid ${COLORS.borderActive}`
          : `1px solid transparent`,
      }}
    >
      <AnimatedCheckbox delay={checkDelay} checked={isChecked} />

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: COLORS.textPrimary,
            fontFamily: "Open Sans, sans-serif",
            marginBottom: 4,
          }}
        >
          {pick.match}
        </div>
        <div
          style={{
            fontSize: 14,
            color: COLORS.textTertiary,
            fontFamily: "Open Sans, sans-serif",
          }}
        >
          {pick.selection}
        </div>
      </div>

      <div style={{ textAlign: "right" }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: COLORS.textPrimary,
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          {pick.odds > 0 ? `+${pick.odds}` : pick.odds}
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

// Stake row with typing animation
const StakeRow: React.FC<{
  pick: PickItem;
  stake: number;
  index: number;
  delay: number;
}> = ({ pick, stake, index, delay }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const slideX = interpolate(frame, [delay, delay + 20], [30, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Animated stake value
  const animatedStake = Math.round(
    interpolate(frame, [delay, delay + 25], [0, stake], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    })
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 0",
        borderBottom: `1px solid ${COLORS.borderDefault}`,
        opacity,
        transform: `translateX(${slideX}px)`,
      }}
    >
      <span
        style={{
          fontSize: 14,
          color: COLORS.textSecondary,
          fontFamily: "Open Sans, sans-serif",
        }}
      >
        {pick.selection}
      </span>
      <span
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: COLORS.textPositive,
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        ${animatedStake}
      </span>
    </div>
  );
};

export const StrategyBuilder: React.FC<StrategyBuilderProps> = ({
  bankroll = 5000,
  method = "kelly",
  picks = [
    { id: "1", match: "Chiefs vs 49ers", selection: "Chiefs ML", odds: -150, ev: 9.7 },
    { id: "2", match: "Liverpool vs Arsenal", selection: "Over 2.5", odds: -105, ev: 9.2 },
    { id: "3", match: "Lakers vs Celtics", selection: "LeBron 25.5p", odds: -115, ev: 7.1 },
  ],
  stakes = [
    { pickId: "1", amount: 87 },
    { pickId: "2", amount: 91 },
    { pickId: "3", amount: 73 },
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate totals
  const totalStake = stakes.reduce((sum, s) => sum + s.amount, 0);
  const potentialProfit = 387; // Mock value

  // Container animation
  const containerOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Strategy panel animation
  const panelDelay = 50;
  const panelOpacity = interpolate(frame, [panelDelay, panelDelay + 25], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const panelX = interpolate(frame, [panelDelay, panelDelay + 30], [50, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const panelScale = spring({
    frame: frame - panelDelay,
    fps,
    from: 0.9,
    to: 1,
    config: { damping: 15, stiffness: 80 },
  });

  // Toggle animation
  const toggleDelay = 70;
  const toggleActive = frame >= toggleDelay;

  // Stakes delay
  const stakesBaseDelay = 85;

  // Totals animation
  const totalsDelay = 115;
  const totalsOpacity = interpolate(frame, [totalsDelay, totalsDelay + 20], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const animatedTotal = Math.round(
    interpolate(frame, [totalsDelay, totalsDelay + 25], [0, totalStake], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    })
  );

  const animatedProfit = Math.round(
    interpolate(frame, [totalsDelay + 10, totalsDelay + 35], [0, potentialProfit], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    })
  );

  // Profit pulse
  const profitPulse = interpolate(
    frame,
    [totalsDelay + 30, totalsDelay + 45, totalsDelay + 60],
    [1, 1.08, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 900,
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
          marginBottom: 24,
          textAlign: "center",
        }}
      >
        Construye tu Estrategia
      </h2>

      {/* Two column layout */}
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
            Selecciona Picks
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {picks.map((pick, index) => (
              <PickRow
                key={pick.id}
                pick={pick}
                index={index}
                checkDelay={40 + index * 10}
              />
            ))}
          </div>
        </div>

        {/* Right column - Strategy */}
        <div
          style={{
            backgroundColor: COLORS.bgCard,
            borderRadius: 16,
            border: `1px solid ${COLORS.borderDefault}`,
            padding: 24,
            opacity: panelOpacity,
            transform: `translateX(${panelX}px) scale(${panelScale})`,
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
            Estrategia
          </h3>

          {/* Method toggle */}
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontSize: 14,
                color: COLORS.textTertiary,
                fontFamily: "Open Sans, sans-serif",
                marginBottom: 8,
              }}
            >
              Método
            </div>
            <div
              style={{
                display: "flex",
                gap: 8,
              }}
            >
              <div
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  borderRadius: 8,
                  backgroundColor:
                    !toggleActive || method === "straight"
                      ? COLORS.bgSection
                      : "transparent",
                  border: `1px solid ${!toggleActive || method === "straight" ? COLORS.borderActive : COLORS.borderDefault}`,
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: 600,
                  color:
                    !toggleActive || method === "straight"
                      ? COLORS.textPrimary
                      : COLORS.textTertiary,
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Straight
              </div>
              <div
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  borderRadius: 8,
                  backgroundColor:
                    toggleActive && method === "kelly"
                      ? COLORS.bgSection
                      : "transparent",
                  border: `1px solid ${toggleActive && method === "kelly" ? COLORS.borderActive : COLORS.borderDefault}`,
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: 600,
                  color:
                    toggleActive && method === "kelly"
                      ? COLORS.textPrimary
                      : COLORS.textTertiary,
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Kelly
              </div>
            </div>
          </div>

          {/* Bankroll */}
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontSize: 14,
                color: COLORS.textTertiary,
                fontFamily: "Open Sans, sans-serif",
                marginBottom: 8,
              }}
            >
              Bankroll
            </div>
            <div
              style={{
                padding: "12px 16px",
                borderRadius: 8,
                backgroundColor: COLORS.bgSection,
                border: `1px solid ${COLORS.borderDefault}`,
                fontSize: 20,
                fontWeight: 700,
                color: COLORS.textPrimary,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              ${bankroll.toLocaleString()}
            </div>
          </div>

          {/* Stakes */}
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontSize: 14,
                color: COLORS.textTertiary,
                fontFamily: "Open Sans, sans-serif",
                marginBottom: 12,
              }}
            >
              Stakes Calculados (2% Kelly)
            </div>
            {picks.map((pick, index) => (
              <StakeRow
                key={pick.id}
                pick={pick}
                stake={stakes[index]?.amount || 0}
                index={index}
                delay={stakesBaseDelay + index * 10}
              />
            ))}
          </div>

          {/* Totals */}
          <div
            style={{
              padding: 16,
              backgroundColor: COLORS.bgSection,
              borderRadius: 12,
              opacity: totalsOpacity,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  color: COLORS.textSecondary,
                  fontFamily: "Open Sans, sans-serif",
                }}
              >
                Total Riesgo
              </span>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: COLORS.textPrimary,
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                ${animatedTotal}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                transform: `scale(${profitPulse})`,
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  color: COLORS.textSecondary,
                  fontFamily: "Open Sans, sans-serif",
                }}
              >
                Profit Potencial
              </span>
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: COLORS.textPositive,
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                +${animatedProfit} 📈
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
