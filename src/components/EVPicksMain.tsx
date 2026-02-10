import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

interface Pick {
  id: string;
  teams: string;
  league: string;
  date: string;
  time: string;
  market: string;
  selection: string;
  odds: string;
  probIA: string;
  ev: string;
  rating: string;
}

interface EVPicksMainProps {
  picks?: Pick[];
}

const COLORS = {
  bgCard: '#1f2937',
  bgHeader: '#374151',
  bgHeaderGradient: 'linear-gradient(90deg, #374151, #4b5563)',
  borderCard: '#4b5563',
  borderSection: '#4b5563',
  textPrimary: '#ffffff',
  textSecondary: '#d1d5db',
  textTertiary: '#9ca3af',
  textPositive: '#4ade80',
  bgEvBadge: '#16a34a',
  bgRatingBadge: '#1f2937',
  buttonGreen: '#16a34a',
};

const getRatingColor = (rating: string): string => {
  const colors: Record<string, string> = {
    A: '#22c55e',
    B: '#22c55e',
    C: '#86efac',
  };
  return colors[rating] || '#86efac';
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
        border: `1px solid ${COLORS.borderCard}`,
        overflow: 'hidden',
        marginBottom: 16,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {/* Header */}
      <div
        style={{
          background: COLORS.bgHeaderGradient,
          padding: '16px 20px',
          borderBottom: `1px solid ${COLORS.borderSection}`,
        }}
      >
        {/* Línea 1: Icono + Equipos */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 6,
          }}
        >
          <span style={{ fontSize: 22 }}>⚽</span>
          <h3
            style={{
              color: COLORS.textPrimary,
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            {pick.teams}
          </h3>
        </div>

        {/* Línea 2: Liga + Fecha/Hora */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 14,
            color: COLORS.textTertiary,
            marginBottom: 10,
            fontFamily: 'Open Sans, sans-serif',
          }}
        >
          <span>{pick.league}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>🕐</span>
            <span>
              {pick.date} • {pick.time}
            </span>
          </div>
        </div>

        {/* Línea 3: Badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            {/* Badge EV */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                backgroundColor: COLORS.bgEvBadge,
                color: COLORS.textPrimary,
                padding: '6px 12px',
                borderRadius: 16,
                fontSize: 14,
                fontWeight: 'bold',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              <span>🔥</span>
              <span>EV {pick.ev}</span>
            </div>

            {/* Badge Rating */}
            <div
              style={{
                backgroundColor: COLORS.bgRatingBadge,
                color: getRatingColor(pick.rating),
                padding: '6px 12px',
                borderRadius: 16,
                fontSize: 14,
                fontWeight: 'bold',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              {pick.rating}
            </div>
          </div>

          {/* Prob IA */}
          <span
            style={{
              color: COLORS.textPositive,
              fontSize: 14,
              fontWeight: 'bold',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            IA {pick.probIA}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '16px 20px' }}>
        {/* Mercado */}
        <div style={{ marginBottom: 12 }}>
          <div
            style={{
              fontSize: 12,
              color: COLORS.textTertiary,
              marginBottom: 4,
              fontFamily: 'Open Sans, sans-serif',
            }}
          >
            {pick.market}
          </div>
          <div
            style={{
              fontSize: 16,
              color: COLORS.textPrimary,
              fontWeight: '600',
              fontFamily: 'Open Sans, sans-serif',
            }}
          >
            {pick.selection}
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: COLORS.textPrimary,
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            {pick.odds}
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: COLORS.textPositive,
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            {pick.ev} EV
          </div>
        </div>
      </div>

      {/* Button */}
      <div style={{ padding: '0 20px 16px 20px' }}>
        <button
          style={{
            width: '100%',
            backgroundColor: COLORS.buttonGreen,
            color: COLORS.textPrimary,
            padding: '14px',
            borderRadius: 8,
            border: 'none',
            fontSize: 16,
            fontWeight: 'bold',
            fontFamily: 'Montserrat, sans-serif',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 20 }}>+</span>
          <span>Agregar a Estrategia</span>
        </button>
      </div>
    </div>
  );
};

export const EVPicksMain: React.FC<EVPicksMainProps> = ({
  picks = [
    {
      id: '1',
      teams: 'América vs Guadalajara',
      league: 'Liga MX',
      date: 'Vie, 7 Feb',
      time: '19:00',
      market: 'Ganador',
      selection: 'Local',
      odds: '1.91',
      probIA: '54.2%',
      ev: '+8.3%',
      rating: 'B',
    },
    {
      id: '2',
      teams: 'Barcelona vs Real Madrid',
      league: 'La Liga',
      date: 'Sáb, 8 Feb',
      time: '15:00',
      market: 'Ambos Anotan',
      selection: 'Sí',
      odds: '2.45',
      probIA: '52.8%',
      ev: '+5.7%',
      rating: 'C',
    },
    {
      id: '3',
      teams: 'Liverpool vs Arsenal',
      league: 'Premier League',
      date: 'Dom, 9 Feb',
      time: '12:30',
      market: 'Total Goles +2.5',
      selection: 'Over 2.5',
      odds: '1.95',
      probIA: '58.1%',
      ev: '+12.4%',
      rating: 'A',
    },
  ],
}) => {
  const frame = useCurrentFrame();

  // Header animation
  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 1020,
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: 24,
          opacity: headerOpacity,
        }}
      >
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: COLORS.textPrimary,
            fontFamily: 'Montserrat, sans-serif',
            marginBottom: 8,
          }}
        >
          🔥 EV Picks
        </h2>
        <p
          style={{
            fontSize: 16,
            color: COLORS.textSecondary,
            fontFamily: 'Open Sans, sans-serif',
          }}
        >
          Solo picks con valor esperado positivo real
        </p>
      </div>

      {/* Picks List */}
      {picks.map((pick, index) => (
        <PickCard key={pick.id} pick={pick} delay={25 + index * 12} />
      ))}
    </div>
  );
};