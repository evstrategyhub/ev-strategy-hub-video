import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

interface EVPickCardProps {
  homeTeam?: string;
  awayTeam?: string;
  league?: string;
  date?: string;
  time?: string;
  market?: string;
  selection?: string;
  odds?: string;
  probIA?: string;
  ev?: string;
  rating?: string;
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

export const EVPickCard: React.FC<EVPickCardProps> = ({
  homeTeam = 'América',
  awayTeam = 'Guadalajara',
  league = 'Liga MX',
  date = 'Vie, 7 Feb',
  time = '19:00',
  market = 'Ganador',
  selection = 'Local',
  odds = '1.91',
  probIA = '54.2%',
  ev = '+8.3%',
  rating = 'B',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card entrance animation
  const cardOpacity = interpolate(frame, [0, fps * 0.4], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  const cardScale = interpolate(frame, [0, fps * 0.4], [0.95, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  // Header animation
  const headerOpacity = interpolate(frame, [fps * 0.2, fps * 0.5], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Badges animation
  const badgeOpacity = interpolate(frame, [fps * 0.4, fps * 0.7], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const badgeScale = interpolate(frame, [fps * 0.4, fps * 0.7], [0.8, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  // Content sections animation
  const contentOpacity = interpolate(frame, [fps * 0.6, fps * 1], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const contentTranslate = interpolate(frame, [fps * 0.6, fps * 1], [20, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  // Button animation
  const buttonOpacity = interpolate(frame, [fps * 1.2, fps * 1.5], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const buttonScale = interpolate(frame, [fps * 1.2, fps * 1.5], [0.9, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#111827',
        padding: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Card Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          backgroundColor: COLORS.bgCard,
          borderRadius: '12px',
          border: `1px solid ${COLORS.borderCard}`,
          overflow: 'hidden',
          opacity: cardOpacity,
          transform: `scale(${cardScale})`,
        }}
      >
        {/* Header con gradiente */}
        <div
          style={{
            background: COLORS.bgHeaderGradient,
            padding: '24px 32px',
            borderBottom: `1px solid ${COLORS.borderSection}`,
            opacity: headerOpacity,
          }}
        >
          {/* Línea 1: Icono + Equipos */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '8px',
            }}
          >
            <span style={{ fontSize: '28px' }}>⚽</span>
            <h3
              style={{
                color: COLORS.textPrimary,
                fontSize: '28px',
                fontWeight: 'bold',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              {homeTeam} vs {awayTeam}
            </h3>
          </div>

          {/* Línea 2: Liga + Fecha/Hora */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '18px',
              color: COLORS.textTertiary,
              marginBottom: '16px',
              fontFamily: 'Open Sans, sans-serif',
            }}
          >
            <span>{league}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🕐</span>
              <span>
                {date} • {time}
              </span>
            </div>
          </div>

          {/* Línea 3: Badges EV + Rating + Prob IA */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: badgeOpacity,
              transform: `scale(${badgeScale})`,
            }}
          >
            {/* Badges izquierda */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {/* Badge EV */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: COLORS.bgEvBadge,
                  color: COLORS.textPrimary,
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                <span>🔥</span>
                <span>EV {ev}</span>
              </div>

              {/* Badge Rating */}
              <div
                style={{
                  backgroundColor: COLORS.bgRatingBadge,
                  color: getRatingColor(rating),
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                {rating}
              </div>
            </div>

            {/* Prob IA derecha */}
            <span
              style={{
                color: COLORS.textPositive,
                fontSize: '18px',
                fontWeight: 'bold',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              Prob. IA {probIA}
            </span>
          </div>
        </div>

        {/* Sección de detalles del pick */}
        <div
          style={{
            padding: '32px',
            opacity: contentOpacity,
            transform: `translateY(${contentTranslate}px)`,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Fila: Mercado | Selección */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <div
                  style={{
                    fontSize: '16px',
                    color: COLORS.textTertiary,
                    marginBottom: '6px',
                    fontFamily: 'Open Sans, sans-serif',
                  }}
                >
                  Mercado
                </div>
                <div
                  style={{
                    fontSize: '22px',
                    color: COLORS.textPrimary,
                    fontWeight: '600',
                    fontFamily: 'Open Sans, sans-serif',
                  }}
                >
                  {market}
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: '16px',
                    color: COLORS.textTertiary,
                    marginBottom: '6px',
                    fontFamily: 'Open Sans, sans-serif',
                  }}
                >
                  Selección
                </div>
                <div
                  style={{
                    fontSize: '22px',
                    color: COLORS.textPrimary,
                    fontWeight: '600',
                    fontFamily: 'Open Sans, sans-serif',
                  }}
                >
                  {selection}
                </div>
              </div>
            </div>

            {/* Stats en filas */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Momio */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '16px',
                    color: COLORS.textTertiary,
                    fontFamily: 'Open Sans, sans-serif',
                  }}
                >
                  Momio
                </span>
                <span
                  style={{
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: COLORS.textPrimary,
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >
                  {odds}
                </span>
              </div>

              {/* Prob IA */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '16px',
                    color: COLORS.textTertiary,
                    fontFamily: 'Open Sans, sans-serif',
                  }}
                >
                  Prob. IA
                </span>
                <span
                  style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    color: COLORS.textPositive,
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >
                  {probIA}
                </span>
              </div>

              {/* Valor Esperado */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '16px',
                    color: COLORS.textTertiary,
                    fontFamily: 'Open Sans, sans-serif',
                  }}
                >
                  Valor Esperado (EV)
                </span>
                <span
                  style={{
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: COLORS.textPositive,
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >
                  {ev}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Botón CTA */}
        <div
          style={{
            padding: '0 32px 32px 32px',
            borderTop: `1px solid ${COLORS.borderSection}`,
            paddingTop: '24px',
            opacity: buttonOpacity,
            transform: `scale(${buttonScale})`,
          }}
        >
          <button
            style={{
              width: '100%',
              backgroundColor: COLORS.buttonGreen,
              color: COLORS.textPrimary,
              padding: '20px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '22px',
              fontWeight: 'bold',
              fontFamily: 'Montserrat, sans-serif',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              boxShadow: '0 4px 12px rgba(22, 163, 74, 0.4)',
            }}
          >
            <span style={{ fontSize: '28px' }}>+</span>
            <span>Agregar a Estrategia</span>
          </button>
        </div>
      </div>
    </AbsoluteFill>
  );
};