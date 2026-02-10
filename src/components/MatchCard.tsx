import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

interface Market {
  bookmaker: string;
  market: string;
  selection: string;
  odds: string;
  probIA: string;
  ev: string;
  rating: string;
}

interface MatchCardProps {
  team1?: string;
  team2?: string;
  league?: string;
  time?: string;
  markets?: Market[];
}

const COLORS = {
  bgCard: '#1f2937',
  bgHeader: '#111827',
  bgRow: 'rgba(55, 65, 81, 0.5)',
  borderDefault: '#374151',
  textPrimary: '#ffffff',
  textSecondary: '#9ca3af',
  textPositive: '#22c55e',
  ratingA: '#22c55e',
  ratingB: '#22c55e',
  ratingC: '#86efac',
  buttonGreen: '#16a34a',
};

const getRatingColor = (rating: string): string => {
  const colors: Record<string, string> = {
    A: COLORS.ratingA,
    B: COLORS.ratingB,
    C: COLORS.ratingC,
  };
  return colors[rating] || COLORS.ratingC;
};

export const MatchCard: React.FC<MatchCardProps> = ({
  team1 = 'América',
  team2 = 'Guadalajara',
  league = 'Liga MX',
  time = '19:00',
  markets = [
    {
      bookmaker: 'Caliente',
      market: 'Ganador',
      selection: 'Local',
      odds: '1.91',
      probIA: '54.2%',
      ev: '+8.3%',
      rating: 'B',
    },
    {
      bookmaker: 'Betway',
      market: 'Ambos Anotan',
      selection: 'Sí',
      odds: '2.45',
      probIA: '52.8%',
      ev: '+5.7%',
      rating: 'C',
    },
    {
      bookmaker: 'bet365',
      market: 'Total Goles',
      selection: 'Más 2.5',
      odds: '1.95',
      probIA: '58.1%',
      ev: '+12.4%',
      rating: 'A',
    },
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animación de entrada
  const fadeIn = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  const slideUp = interpolate(frame, [0, fps * 0.5], [50, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  // Animación de filas (aparecen una por una)
  const getRowOpacity = (index: number) => {
    return interpolate(
      frame,
      [fps * 0.5 + index * 10, fps * 0.5 + index * 10 + 15],
      [0, 1],
      {
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.ease),
      }
    );
  };

  return (
    <div
      style={{
        padding: '40px',
        opacity: fadeIn,
        transform: `translateY(${slideUp}px)`,
      }}
    >
      {/* Card Container */}
      <div
        style={{
          backgroundColor: COLORS.bgCard,
          borderRadius: '12px',
          border: `1px solid ${COLORS.borderDefault}`,
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: COLORS.bgHeader,
            borderBottom: `1px solid ${COLORS.borderDefault}`,
            padding: '24px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                color: COLORS.textPrimary,
                fontSize: '32px',
                fontWeight: 'bold',
                fontFamily: 'Montserrat, sans-serif',
                marginBottom: '8px',
              }}
            >
              {team1} vs {team2}
            </div>
            <div
              style={{
                color: COLORS.textSecondary,
                fontSize: '18px',
                fontFamily: 'Open Sans, sans-serif',
              }}
            >
              {league} • {time}
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1.2fr 1fr 0.8fr 1fr 0.8fr 0.6fr 0.7fr',
            gap: '0',
            fontSize: '16px',
            color: COLORS.textSecondary,
            backgroundColor: COLORS.bgHeader,
            padding: '16px 32px',
            fontFamily: 'Open Sans, sans-serif',
          }}
        >
          <div style={{ textAlign: 'center' }}>Bookmaker</div>
          <div style={{ textAlign: 'center' }}>Mercado</div>
          <div style={{ textAlign: 'center' }}>Selección</div>
          <div style={{ textAlign: 'center' }}>Cuota</div>
          <div style={{ textAlign: 'center' }}>Prob. M</div>
          <div style={{ textAlign: 'center', fontWeight: 'bold', color: COLORS.textPositive }}>
            Prob. IA
          </div>
          <div style={{ textAlign: 'center', fontWeight: 'bold', color: COLORS.textPositive }}>
            EV
          </div>
          <div style={{ textAlign: 'center' }}>Rating</div>
        </div>

        {/* Table Rows */}
        {markets.map((market, index) => (
          <div
            key={index}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 1.2fr 1fr 0.8fr 1fr 0.8fr 0.6fr 0.7fr',
              gap: '0',
              fontSize: '16px',
              borderBottom: `1px solid ${COLORS.borderDefault}`,
              backgroundColor: COLORS.bgRow,
              padding: '16px 32px',
              alignItems: 'center',
              minHeight: '60px',
              opacity: getRowOpacity(index),
              fontFamily: 'Open Sans, sans-serif',
            }}
          >
            {/* Bookmaker */}
            <div
              style={{
                color: COLORS.textPrimary,
                textAlign: 'center',
              }}
            >
              {market.bookmaker}
            </div>

            {/* Mercado */}
            <div
              style={{
                color: COLORS.textSecondary,
                textAlign: 'center',
              }}
            >
              {market.market}
            </div>

            {/* Selección */}
            <div
              style={{
                color: COLORS.textPrimary,
                textAlign: 'center',
              }}
            >
              {market.selection}
            </div>

            {/* Cuota */}
            <div
              style={{
                color: COLORS.textPrimary,
                fontWeight: 'bold',
                textAlign: 'center',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              {market.odds}
            </div>

            {/* Prob. M */}
            <div
              style={{
                color: COLORS.textSecondary,
                textAlign: 'center',
              }}
            >
              {((1 / parseFloat(market.odds)) * 100).toFixed(1)}%
            </div>

            {/* Prob. IA */}
            <div
              style={{
                color: COLORS.textPositive,
                fontWeight: 'bold',
                textAlign: 'center',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              {market.probIA}
            </div>

            {/* EV */}
            <div
              style={{
                color: COLORS.textPositive,
                fontWeight: 'bold',
                textAlign: 'center',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              {market.ev}
            </div>

            {/* Rating */}
            <div
              style={{
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  backgroundColor: getRatingColor(market.rating),
                  color: '#ffffff',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                {market.rating}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
