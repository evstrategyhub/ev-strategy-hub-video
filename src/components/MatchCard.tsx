import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing, spring } from 'remotion';

interface MarketOption {
  selection: string;
  bookmaker: string;
  odds: string;
  probM: string;
  probIA: string;
  evGrade: 'A' | 'D' | 'F';
}

interface MarketGroup {
  marketName: string;
  options: MarketOption[];
}

interface MatchCardProps {
  team1?: string;
  team2?: string;
  league?: string;
  datetime?: string;
  marketGroups?: MarketGroup[];
}

const COLORS = {
  bgCard: '#1f2937',
  bgHeader: '#111827',
  bgRow: 'rgba(55, 65, 81, 0.5)',
  bgSectionHeader: '#1f2937',
  borderDefault: '#374151',
  textPrimary: '#ffffff',
  textSecondary: '#9ca3af',
  textPositive: '#22c55e',
  gradeA: '#22c55e',
  gradeD: '#f59e0b',
  gradeF: '#ef4444',
};

export const MatchCard: React.FC<MatchCardProps> = ({
  team1 = 'Benfica (Local)',
  team2 = 'Real Madrid (Visita)',
  league = 'Champions League',
  datetime = '17/2/2026, 14:00:00',
  marketGroups = [
    {
      marketName: 'Ganador',
      options: [
        { selection: 'Local', bookmaker: 'Bet365', odds: '+300', probM: '25.0', probIA: '42.88', evGrade: 'A' },
        { selection: 'Empate', bookmaker: 'Bet365', odds: '+275', probM: '26.7', probIA: '22.65', evGrade: 'F' },
        { selection: 'Visita', bookmaker: 'Bet365', odds: '-120', probM: '54.6', probIA: '34.43', evGrade: 'F' },
      ],
    },
    {
      marketName: 'Ambos Anotan',
      options: [
        { selection: 'Sí', bookmaker: 'Bet365', odds: '-200', probM: '66.7', probIA: '62.12', evGrade: 'D' },
        { selection: 'No', bookmaker: 'Bet365', odds: '+150', probM: '40.0', probIA: '37.88', evGrade: 'D' },
      ],
    },
    {
      marketName: 'Total Goles',
      options: [
        { selection: 'Más 2.5', bookmaker: 'Bet365', odds: '-189', probM: '65.4', probIA: '61.47', evGrade: 'D' },
        { selection: 'Menos 2.5', bookmaker: 'Bet365', odds: '+150', probM: '40.0', probIA: '38.53', evGrade: 'D' },
      ],
    },
    {
      marketName: 'Doble Oportunidad',
      options: [
        { selection: 'Local o Empate', bookmaker: 'Bet365', odds: '-111', probM: '52.6', probIA: '65.53', evGrade: 'A' },
        { selection: 'Empate o Visita', bookmaker: 'Bet365', odds: '-455', probM: '82.0', probIA: '57.08', evGrade: 'F' },
        { selection: 'Local o Visita', bookmaker: 'Bet365', odds: '-400', probM: '80.0', probIA: '77.31', evGrade: 'D' },
      ],
    },
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animación de entrada del CARD
  const cardFadeIn = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  const cardSlideUp = interpolate(frame, [0, fps * 0.5], [50, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  // Función para obtener color de EV grade
  const getGradeColor = (grade: 'A' | 'D' | 'F'): string => {
    switch (grade) {
      case 'A':
        return COLORS.gradeA;
      case 'D':
        return COLORS.gradeD;
      case 'F':
        return COLORS.gradeF;
      default:
        return COLORS.textSecondary;
    }
  };

  // Animación de SCALE para Prob IA y EV (por grupo)
  const getValueScale = (groupIndex: number, optionIndex: number) => {
    const startFrame = fps * 0.6 + groupIndex * 12 + optionIndex * 4;
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

  // Pulso en Prob IA y EV
  const getPulse = (groupIndex: number, optionIndex: number) => {
    const delay = fps * 1.2 + groupIndex * 12 + optionIndex * 4;
    if (frame < delay) return 1;

    return interpolate((frame - delay) % 30, [0, 15, 30], [1, 1.08, 1], {
      easing: Easing.inOut(Easing.ease),
    });
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
                fontSize: '28px',
                fontWeight: 'bold',
                fontFamily: 'Montserrat, sans-serif',
                marginBottom: '4px',
              }}
            >
              {team1}
            </div>
            <div
              style={{
                color: COLORS.textPrimary,
                fontSize: '28px',
                fontWeight: 'bold',
                fontFamily: 'Montserrat, sans-serif',
                marginBottom: '8px',
              }}
            >
              {team2}
            </div>
            <div
              style={{
                color: COLORS.textSecondary,
                fontSize: '18px',
                fontFamily: 'Open Sans, sans-serif',
              }}
            >
              {league}
            </div>
          </div>
          <div
            style={{
              color: COLORS.textSecondary,
              fontSize: '18px',
              fontFamily: 'Open Sans, sans-serif',
              textAlign: 'right',
            }}
          >
            {datetime}
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            backgroundColor: COLORS.bgHeader,
            borderBottom: `1px solid ${COLORS.borderDefault}`,
            padding: '0 32px',
          }}
        >
          <div
            style={{
              flex: 1,
              padding: '16px 0',
              textAlign: 'center',
              color: COLORS.textPositive,
              fontSize: '18px',
              fontWeight: '600',
              fontFamily: 'Open Sans, sans-serif',
              borderBottom: `2px solid ${COLORS.textPositive}`,
            }}
          >
            Mercados
          </div>
          <div
            style={{
              flex: 1,
              padding: '16px 0',
              textAlign: 'center',
              color: COLORS.textSecondary,
              fontSize: '18px',
              fontFamily: 'Open Sans, sans-serif',
            }}
          >
            Tendencias
          </div>
          <div
            style={{
              flex: 1,
              padding: '16px 0',
              textAlign: 'center',
              color: COLORS.textSecondary,
              fontSize: '18px',
              fontFamily: 'Open Sans, sans-serif',
            }}
          >
            H2H
          </div>
        </div>

        {/* Dropdown "Mercado: Todos" */}
        <div
          style={{
            padding: '16px 32px',
            backgroundColor: COLORS.bgHeader,
            borderBottom: `1px solid ${COLORS.borderDefault}`,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span
            style={{
              color: COLORS.textPrimary,
              fontSize: '16px',
              fontFamily: 'Open Sans, sans-serif',
            }}
          >
            Mercado:
          </span>
          <span
            style={{
              color: COLORS.textPrimary,
              fontSize: '16px',
              fontWeight: '600',
              fontFamily: 'Open Sans, sans-serif',
            }}
          >
            Todos
          </span>
        </div>

        {/* Market Groups */}
        {marketGroups.map((group, groupIndex) => (
          <div key={groupIndex} style={{ marginBottom: groupIndex < marketGroups.length - 1 ? '8px' : '0' }}>
            {/* Section Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.3fr 1fr 0.9fr 0.9fr 1fr 0.7fr',
                gap: '0',
                fontSize: '16px',
                color: COLORS.textSecondary,
                backgroundColor: COLORS.bgSectionHeader,
                padding: '16px 32px',
                fontFamily: 'Open Sans, sans-serif',
                fontWeight: '600',
                borderTop: `1px solid ${COLORS.borderDefault}`,
              }}
            >
              <div style={{ textAlign: 'left' }}>{group.marketName}</div>
              <div style={{ textAlign: 'center' }}>Book</div>
              <div style={{ textAlign: 'center' }}>Momio</div>
              <div style={{ textAlign: 'center' }}>Prob. M</div>
              <div style={{ textAlign: 'center', fontWeight: 'bold', color: COLORS.textPositive }}>Prob. IA</div>
              <div style={{ textAlign: 'center', fontWeight: 'bold', color: COLORS.textPositive }}>EV</div>
            </div>

            {/* Options Rows */}
            {group.options.map((option, optionIndex) => {
              const scale = getValueScale(groupIndex, optionIndex);
              const pulse = getPulse(groupIndex, optionIndex);
              const gradeColor = getGradeColor(option.evGrade);

              return (
                <div
                  key={optionIndex}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.3fr 1fr 0.9fr 0.9fr 1fr 0.7fr',
                    gap: '0',
                    fontSize: '16px',
                    borderBottom: `1px solid ${COLORS.borderDefault}`,
                    backgroundColor: COLORS.bgRow,
                    padding: '16px 32px',
                    alignItems: 'center',
                    minHeight: '70px',
                    fontFamily: 'Open Sans, sans-serif',
                  }}
                >
                  {/* Selección */}
                  <div
                    style={{
                      color: COLORS.textPrimary,
                      textAlign: 'left',
                      fontSize: '18px',
                      fontWeight: '500',
                    }}
                  >
                    {option.selection}
                  </div>

                  {/* Bookmaker */}
                  <div
                    style={{
                      color: COLORS.textSecondary,
                      textAlign: 'center',
                      fontSize: '16px',
                    }}
                  >
                    {option.bookmaker}
                  </div>

                  {/* Odds */}
                  <div
                    style={{
                      color: COLORS.textPrimary,
                      fontWeight: '700',
                      textAlign: 'center',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '20px',
                    }}
                  >
                    {option.odds}
                  </div>

                  {/* Prob. M */}
                  <div
                    style={{
                      color: COLORS.textSecondary,
                      textAlign: 'center',
                      fontSize: '16px',
                      fontWeight: '500',
                    }}
                  >
                    {option.probM}%
                  </div>

                  {/* Prob. IA - HIGHLIGHT */}
                  <div
                    style={{
                      color: COLORS.textPositive,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '32px',
                      transform: `scale(${scale * pulse})`,
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    {option.probIA}%
                  </div>

                  {/* EV Grade - HIGHLIGHT */}
                  <div
                    style={{
                      color: gradeColor,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '32px',
                      transform: `scale(${scale * pulse})`,
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    {option.evGrade}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};