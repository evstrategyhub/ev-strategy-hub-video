import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing, spring } from 'remotion';

interface Pick {
  id: string;
  teams: string;
  league: string;
  market: string;
  selection: string;
  odds: number;
  ev: number;
}

interface ParlayStats {
  combinedOdds: number;
  parlayEV: number;
  stake: number;
  potentialProfit: number;
  rating: string;
}

interface ParlayValidatorProps {
  picks?: Pick[];
  parlay?: ParlayStats;
}

const COLORS = {
  bgCard: '#1f2937',
  bgSection: '#374151',
  borderDefault: '#4b5563',
  borderHighlight: '#22c55e',
  textPrimary: '#ffffff',
  textSecondary: '#d1d5db',
  textTertiary: '#9ca3af',
  textPositive: '#4ade80',
  ratingA: '#22c55e',
};

const PickCard: React.FC<{ pick: Pick; delay: number }> = ({ pick, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(frame, [delay, delay + 20], [30, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  return (
    <div
      style={{
        backgroundColor: COLORS.bgCard,
        borderRadius: 12,
        border: `1px solid ${COLORS.borderDefault}`,
        padding: 20,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: COLORS.textPrimary,
              fontFamily: 'Montserrat, sans-serif',
              marginBottom: 4,
            }}
          >
            {pick.teams}
          </div>
          <div
            style={{
              fontSize: 12,
              color: COLORS.textTertiary,
              fontFamily: 'Open Sans, sans-serif',
            }}
          >
            {pick.league}
          </div>
        </div>
      </div>

      {/* Market section */}
      <div
        style={{
          backgroundColor: COLORS.bgSection,
          borderRadius: 8,
          padding: 12,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: COLORS.textTertiary,
            fontFamily: 'Open Sans, sans-serif',
            marginBottom: 2,
          }}
        >
          {pick.league} · {pick.market}
        </div>
        <div
          style={{
            fontSize: 14,
            color: COLORS.textSecondary,
            fontFamily: 'Open Sans, sans-serif',
          }}
        >
          {pick.selection}
        </div>
      </div>

      {/* Stats */}
      <div style={{ textAlign: 'right' }}>
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: COLORS.textPrimary,
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          {pick.odds.toFixed(2)}
        </div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: COLORS.textPositive,
            fontFamily: 'Montserrat, sans-serif',
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
    {
      id: '1',
      teams: 'América vs Guadalajara',
      league: 'Liga MX',
      market: 'Ganador',
      selection: 'América',
      odds: 1.91,
      ev: 9.7,
    },
    {
      id: '2',
      teams: 'Barcelona vs Real Madrid',
      league: 'La Liga',
      market: 'Ambos Anotan',
      selection: 'Sí',
      odds: 1.87,
      ev: 8.2,
    },
    {
      id: '3',
      teams: 'Liverpool vs Arsenal',
      league: 'Premier League',
      market: 'Total Goles +2.5',
      selection: 'Over 2.5',
      odds: 1.72,
      ev: 7.1,
    },
  ],
  parlay = {
    combinedOdds: 6.12,
    parlayEV: 12.8,
    stake: 100,
    potentialProfit: 512,
    rating: 'A',
  },
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Parlay summary entrance
  const summaryDelay = 50;
  const summaryOpacity = interpolate(frame, [summaryDelay, summaryDelay + 25], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const summaryScale = spring({
    frame: frame - summaryDelay,
    fps,
    from: 0.9,
    to: 1,
    config: { damping: 12, stiffness: 80 },
  });

  const summaryY = interpolate(frame, [summaryDelay, summaryDelay + 30], [40, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Animate profit number
  const animatedProfit = interpolate(
    frame,
    [summaryDelay + 20, summaryDelay + 60],
    [0, parlay.potentialProfit],
    {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    }
  );

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 1020,
        display: 'flex',
        flexDirection: 'column',
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
          transform: `translateY(${summaryY}px) scale(${summaryScale})`,
        }}
      >
        <h3
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: COLORS.textPositive,
            fontFamily: 'Montserrat, sans-serif',
            marginBottom: 20,
          }}
        >
          📊 Parlay Combinado
        </h3>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
            marginBottom: 20,
          }}
        >
          {/* Odds Combinadas */}
          <div
            style={{
              backgroundColor: COLORS.bgSection,
              borderRadius: 8,
              padding: 16,
            }}
          >
            <div
              style={{
                fontSize: 14,
                color: COLORS.textTertiary,
                fontFamily: 'Open Sans, sans-serif',
                marginBottom: 6,
              }}
            >
              Odds Combinadas
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: COLORS.textPrimary,
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              {parlay.combinedOdds.toFixed(2)}
            </div>
          </div>

          {/* EV Parlay */}
          <div
            style={{
              backgroundColor: COLORS.bgSection,
              borderRadius: 8,
              padding: 16,
            }}
          >
            <div
              style={{
                fontSize: 14,
                color: COLORS.textTertiary,
                fontFamily: 'Open Sans, sans-serif',
                marginBottom: 6,
              }}
            >
              EV Parlay
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: COLORS.textPositive,
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              +{parlay.parlayEV}%
            </div>
          </div>
        </div>

        {/* Stake & Profit */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
          }}
        >
          {/* Stake */}
          <div>
            <div
              style={{
                fontSize: 14,
                color: COLORS.textTertiary,
                fontFamily: 'Open Sans, sans-serif',
                marginBottom: 8,
              }}
            >
              Stake
            </div>
            <div
              style={{
                padding: '12px 16px',
                borderRadius: 8,
                backgroundColor: COLORS.bgSection,
                fontSize: 18,
                fontWeight: 600,
                color: COLORS.textPrimary,
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              ${parlay.stake}
            </div>
          </div>

          {/* Profit Potencial */}
          <div>
            <div
              style={{
                fontSize: 14,
                color: COLORS.textTertiary,
                fontFamily: 'Open Sans, sans-serif',
                marginBottom: 8,
              }}
            >
              Profit Potencial
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: COLORS.textPositive,
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              ${Math.round(animatedProfit)}
            </div>
          </div>
        </div>

        {/* Rating */}
        <div
          style={{
            marginTop: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.ratingA,
              color: COLORS.textPrimary,
              padding: '12px 24px',
              borderRadius: 8,
              fontSize: 18,
              fontWeight: 700,
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            Rating: {parlay.rating}
          </div>
        </div>
      </div>
    </div>
  );
};