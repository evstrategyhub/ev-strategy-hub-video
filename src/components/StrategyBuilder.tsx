import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing, spring } from 'remotion';

interface Pick {
  id: string;
  teams: string;
  market: string;
  selection: string;
  odds: number;
  ev: number;
  kellyStake: number;
}

interface StrategyBuilderProps {
  bankroll?: number;
  method?: 'straight' | 'kelly';
  picks?: Pick[];
}

const COLORS = {
  bgCard: '#1f2937',
  bgSection: '#374151',
  borderDefault: '#4b5563',
  borderActive: '#22c55e',
  textPrimary: '#ffffff',
  textSecondary: '#d1d5db',
  textTertiary: '#9ca3af',
  textPositive: '#4ade80',
};

const PickRow: React.FC<{ pick: Pick; index: number; checkDelay: number }> = ({
  pick,
  index,
  checkDelay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [checkDelay, checkDelay + 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const slideX = interpolate(frame, [checkDelay, checkDelay + 15], [-30, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  // Animate stake number
  const animatedStake = interpolate(
    frame,
    [checkDelay + 10, checkDelay + 30],
    [0, pick.kellyStake],
    {
      extrapolateRight: 'clamp',
    }
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 0',
        borderBottom: `1px solid ${COLORS.borderDefault}`,
        opacity,
        transform: `translateX(${slideX}px)`,
      }}
    >
      <span
        style={{
          fontSize: 14,
          color: COLORS.textSecondary,
          fontFamily: 'Open Sans, sans-serif',
        }}
      >
        {pick.market}: {pick.selection}
      </span>
      <span
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: COLORS.textPositive,
          fontFamily: 'Montserrat, sans-serif',
        }}
      >
        ${Math.round(animatedStake)}
      </span>
    </div>
  );
};

export const StrategyBuilder: React.FC<StrategyBuilderProps> = ({
  bankroll = 5000,
  method = 'kelly',
  picks = [
    {
      id: '1',
      teams: 'América vs Guadalajara',
      market: 'Ganador',
      selection: 'América',
      odds: 1.91,
      ev: 9.7,
      kellyStake: 87,
    },
    {
      id: '2',
      teams: 'Barcelona vs Real Madrid',
      market: 'Ambos Anotan',
      selection: 'Sí',
      odds: 1.87,
      ev: 8.2,
      kellyStake: 91,
    },
    {
      id: '3',
      teams: 'Liverpool vs Arsenal',
      market: 'Total Goles +2.5',
      selection: 'Over 2.5',
      odds: 1.72,
      ev: 7.1,
      kellyStake: 73,
    },
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate totals
  const totalStake = picks.reduce((sum, p) => sum + p.kellyStake, 0);
  const potentialProfit = 387; // Mock value

  // Container animation
  const containerOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Strategy panel animation
  const panelDelay = 50;
  const panelOpacity = interpolate(frame, [panelDelay, panelDelay + 25], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const panelY = interpolate(frame, [panelDelay, panelDelay + 30], [40, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const panelScale = spring({
    frame: frame - panelDelay,
    fps,
    from: 0.9,
    to: 1,
    config: { damping: 12, stiffness: 80 },
  });

  // Toggle animation
  const toggleActive = interpolate(frame, [35, 45], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 1020,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        opacity: containerOpacity,
      }}
    >
      {/* Picks list card */}
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
            fontFamily: 'Montserrat, sans-serif',
            marginBottom: 20,
          }}
        >
          Selecciona Picks
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {picks.map((pick, index) => (
            <PickRow key={pick.id} pick={pick} index={index} checkDelay={40 + index * 10} />
          ))}
        </div>
      </div>

      {/* Strategy panel */}
      <div
        style={{
          backgroundColor: COLORS.bgCard,
          borderRadius: 16,
          border: `1px solid ${COLORS.borderDefault}`,
          padding: 24,
          opacity: panelOpacity,
          transform: `translateY(${panelY}px) scale(${panelScale})`,
        }}
      >
        <h3
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: COLORS.textPrimary,
            fontFamily: 'Montserrat, sans-serif',
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
              fontFamily: 'Open Sans, sans-serif',
              marginBottom: 8,
            }}
          >
            Método
          </div>
          <div
            style={{
              display: 'flex',
              gap: 8,
            }}
          >
            <div
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: 8,
                backgroundColor: method === 'straight' ? COLORS.bgSection : 'transparent',
                border: `1px solid ${method === 'straight' ? COLORS.borderActive : COLORS.borderDefault}`,
                textAlign: 'center',
                fontSize: 14,
                fontWeight: 600,
                color: method === 'straight' ? COLORS.textPrimary : COLORS.textTertiary,
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              Straight
            </div>
            <div
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: 8,
                backgroundColor: method === 'kelly' ? COLORS.bgSection : 'transparent',
                border: `1px solid ${method === 'kelly' ? COLORS.borderActive : COLORS.borderDefault}`,
                textAlign: 'center',
                fontSize: 14,
                fontWeight: 600,
                color: method === 'kelly' ? COLORS.textPrimary : COLORS.textTertiary,
                fontFamily: 'Montserrat, sans-serif',
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
              fontFamily: 'Open Sans, sans-serif',
              marginBottom: 8,
            }}
          >
            Bankroll
          </div>
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 8,
              backgroundColor: COLORS.bgSection,
              border: `1px solid ${COLORS.borderDefault}`,
              fontSize: 20,
              fontWeight: 700,
              color: COLORS.textPrimary,
              fontFamily: 'Montserrat, sans-serif',
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
              fontFamily: 'Open Sans, sans-serif',
              marginBottom: 8,
            }}
          >
            Stake Total
          </div>
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 8,
              backgroundColor: COLORS.bgSection,
              border: `1px solid ${COLORS.borderDefault}`,
              fontSize: 20,
              fontWeight: 700,
              color: COLORS.textPositive,
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            ${totalStake}
          </div>
        </div>

        {/* Potential profit */}
        <div>
          <div
            style={{
              fontSize: 14,
              color: COLORS.textTertiary,
              fontFamily: 'Open Sans, sans-serif',
              marginBottom: 8,
            }}
          >
            Ganancia Potencial
          </div>
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 8,
              backgroundColor: COLORS.bgSection,
              border: `1px solid ${COLORS.borderDefault}`,
              fontSize: 28,
              fontWeight: 700,
              color: COLORS.textPositive,
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            ${potentialProfit}
          </div>
        </div>
      </div>
    </div>
  );
};