import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing, spring } from 'remotion';

interface Market {
  bookmaker: string;
  market: string;
  selection: string;
  odds: string;
  probIA: string;
  ev: string;
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
      probIA: '54.2',
      ev: '8.3',
    },
    {
      bookmaker: 'Betway',
      market: 'Ambos Anotan',
      selection: 'Sí',
      odds: '2.45',
      probIA: '52.8',
      ev: '5.7',
    },
    {
      bookmaker: 'bet365',
      market: 'Total Goles',
      selection: 'Más 2.5',
      odds: '1.95',
      probIA: '58.1',
      ev: '12.4',
    },
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animación de entrada del CARD COMPLETO
  const cardFadeIn = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  const cardSlideUp = interpolate(frame, [0, fps * 0.5], [50, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  // Animación de SCALE para Prob IA y EV (LO IMPORTANTE - EL HIGHLIGHT)
  const getValueScale = (index: number) => {
    const startFrame = fps * 0.6 + index * 8;
    return spring({
      frame: frame - startFrame,
      fps,
      config: {
        damping: 10,
        stiffness: 120,
        mass: 0.5,
      },
    });
  };

  // Pulso sutil en Prob IA y EV
  const getPulse = (index: number) => {
    const delay = fps * 1.2 + index * 8;
    if (frame < delay) return 1;
    
    return interpolate(
      (frame - delay) % 30,
      [0, 15, 30],
      [1, 1.08, 1],
      {
        easing: Easing.inOut(Easing.ease),
      }
    );
  };

  return (
    <div
      style={{
        padding: '40px',
        opacity: cardFadeIn,
        transform: `translateY(${cardSlideUp}px)`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Card Container */}
      <div
        style={{
          backgroundColor: COLORS.bgCard,
          borderRadius: '12px',
          border: `1px solid ${COLORS.borderDefault}`,
          overflow: 'hidden',
          width: '980px',
          maxWidth: '980px',
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: COLORS.bgHeader,
            borderBottom: `1px solid ${COLORS.borderDefault}`,
            padding: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                color: COLORS.textPrimary,
                fontSize: '30px',
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
                fontSize: '20px',
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
            gridTemplateColumns: '1.2fr 1.5fr 1.2fr 0.9fr 1fr 1fr 1fr',
            gap: '0',
            fontSize: '18px',
            color: COLORS.textSecondary,
            backgroundColor: COLORS.bgHeader,
            padding: '20px 32px',
            fontFamily: 'Open Sans, sans-serif',
            fontWeight: '500',
          }}
        >
          <div style={{ textAlign: 'center' }}>Mercado</div>
          <div style={{ textAlign: 'center' }}>Bookmaker</div>
          <div style={{ textAlign: 'center' }}>Selección</div>
          <div style={{ textAlign: 'center' }}>Momio</div>
          <div style={{ textAlign: 'center' }}>Prob. M</div>
          {/* PROB IA - HEADER EN VERDE Y MÁS GRANDE */}
          <div 
            style={{ 
              textAlign: 'center', 
              fontWeight: 'bold', 
              color: COLORS.textPositive,
              fontSize: '22px',
            }}
          >
            Prob. IA
          </div>
          {/* EV - HEADER EN VERDE Y MÁS GRANDE */}
          <div 
            style={{ 
              textAlign: 'center', 
              fontWeight: 'bold', 
              color: COLORS.textPositive,
              fontSize: '22px',
            }}
          >
            EV (%)
          </div>
        </div>

        {/* Table Rows */}
        {markets.map((market, index) => {
          const scale = getValueScale(index);
          const pulse = getPulse(index);
          
          return (
            <div
              key={index}
              style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1.5fr 1.2fr 0.9fr 1fr 1fr 1fr',
                gap: '0',
                fontSize: '18px',
                borderBottom: `1px solid ${COLORS.borderDefault}`,
                backgroundColor: COLORS.bgRow,
                padding: '20px 32px',
                alignItems: 'center',
                minHeight: '80px',
                fontFamily: 'Open Sans, sans-serif',
              }}
            >
              {/* Mercado */}
              <div
                style={{
                  color: COLORS.textPrimary,
                  textAlign: 'center',
                  fontSize: '22px',
                  fontWeight: '500',
                }}
              >
                {market.market}
              </div>

              {/* Bookmaker */}
              <div
                style={{
                  color: COLORS.textSecondary,
                  textAlign: 'center',
                  fontSize: '18px',
                }}
              >
                {market.bookmaker}
              </div>

              {/* Selección */}
              <div
                style={{
                  color: COLORS.textPrimary,
                  textAlign: 'center',
                  fontSize: '20px',
                }}
              >
                {market.selection}
              </div>

              {/* Momio (odds) - NORMAL */}
              <div
                style={{
                  color: COLORS.textPrimary,
                  fontWeight: '600',
                  textAlign: 'center',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '24px',
                }}
              >
                {market.odds}
              </div>

              {/* Prob. M - NORMAL */}
              <div
                style={{
                  color: COLORS.textSecondary,
                  textAlign: 'center',
                  fontSize: '18px',
                  fontWeight: '600',
                }}
              >
                {((1 / parseFloat(market.odds)) * 100).toFixed(1)}%
              </div>

              {/* ⭐ PROB. IA - HIGHLIGHT CON ANIMACIÓN ⭐ */}
              <div
                style={{
                  color: COLORS.textPositive,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '40px', // MÁS GRANDE
                  transform: `scale(${scale * pulse})`,
                  transition: 'transform 0.3s ease',
                }}
              >
                {market.probIA}%
              </div>

              {/* ⭐ EV - HIGHLIGHT CON ANIMACIÓN ⭐ */}
              <div
                style={{
                  color: COLORS.textPositive,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '40px', // MÁS GRANDE
                  transform: `scale(${scale * pulse})`,
                  transition: 'transform 0.3s ease',
                }}
              >
                +{market.ev}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};