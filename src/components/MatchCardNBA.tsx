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

interface PlayerProp {
  player: string;
  stat: string;
  line: string;
  projection: string;
  odds: string;
  probIA: string;
  ev: string;
}

interface MatchCardNBAProps {
  team1?: string;
  team2?: string;
  league?: string;
  time?: string;
  type?: 'game' | 'props'; // TIPO: game odds o player props
  markets?: Market[]; // Para game odds
  playerProps?: PlayerProp[]; // Para player props
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

export const MatchCardNBA: React.FC<MatchCardNBAProps> = ({
  team1 = 'Los Angeles Lakers',
  team2 = 'Golden State Warriors',
  league = 'NBA',
  time = '22:00',
  type = 'game',
  markets = [
    {
      bookmaker: 'DraftKings',
      market: 'Spread',
      selection: 'Lakers -3.5',
      odds: '-110',
      probIA: '54.2',
      ev: '8.3',
    },
    {
      bookmaker: 'FanDuel',
      market: 'Over/Under',
      selection: 'Over 225.5',
      odds: '-115',
      probIA: '52.8',
      ev: '5.7',
    },
    {
      bookmaker: 'BetMGM',
      market: 'Moneyline',
      selection: 'Lakers',
      odds: '+145',
      probIA: '58.1',
      ev: '12.4',
    },
  ],
  playerProps = [
    {
      player: 'LeBron James',
      stat: 'Puntos',
      line: '25.5',
      projection: '28.3',
      odds: '-110',
      probIA: '62.4',
      ev: '13.2',
    },
    {
      player: 'Stephen Curry',
      stat: 'Triples',
      line: '4.5',
      projection: '5.2',
      odds: '+105',
      probIA: '58.7',
      ev: '9.8',
    },
    {
      player: 'Anthony Davis',
      stat: 'Rebotes',
      line: '10.5',
      projection: '12.1',
      odds: '-120',
      probIA: '64.3',
      ev: '14.5',
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

  // Animación de SCALE para Prob IA y EV
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

  // Pulso en Prob IA y EV
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

  // Convertir odds americanas a decimales para Prob. M
  const americanToDecimal = (odds: string): number => {
    const americanOdds = parseFloat(odds);
    if (americanOdds > 0) {
      return (americanOdds / 100) + 1;
    } else {
      return (100 / Math.abs(americanOdds)) + 1;
    }
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

        {/* TIPO: GAME ODDS */}
        {type === 'game' && (
          <>
            {/* Table Header - Game Odds */}
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

            {/* Table Rows - Game Odds */}
            {markets.map((market, index) => {
              const scale = getValueScale(index);
              const pulse = getPulse(index);
              const decimalOdds = americanToDecimal(market.odds);
              const impliedProb = ((1 / decimalOdds) * 100).toFixed(1);
              
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

                  {/* Odds */}
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

                  {/* Prob. M */}
                  <div
                    style={{
                      color: COLORS.textSecondary,
                      textAlign: 'center',
                      fontSize: '18px',
                      fontWeight: '600',
                    }}
                  >
                    {impliedProb}%
                  </div>

                  {/* Prob. IA - HIGHLIGHT */}
                  <div
                    style={{
                      color: COLORS.textPositive,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '40px',
                      transform: `scale(${scale * pulse})`,
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    {market.probIA}%
                  </div>

                  {/* EV - HIGHLIGHT */}
                  <div
                    style={{
                      color: COLORS.textPositive,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '40px',
                      transform: `scale(${scale * pulse})`,
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    +{market.ev}%
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* TIPO: PLAYER PROPS */}
        {type === 'props' && (
          <>
            {/* Table Header - Player Props */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.5fr 1fr 0.8fr 0.8fr 0.8fr 1fr 1fr',
                gap: '0',
                fontSize: '18px',
                color: COLORS.textSecondary,
                backgroundColor: COLORS.bgHeader,
                padding: '20px 32px',
                fontFamily: 'Open Sans, sans-serif',
                fontWeight: '500',
              }}
            >
              <div style={{ textAlign: 'center' }}>Jugador</div>
              <div style={{ textAlign: 'center' }}>Stat</div>
              <div style={{ textAlign: 'center' }}>Línea</div>
              <div style={{ textAlign: 'center' }}>Proyección</div>
              <div style={{ textAlign: 'center' }}>Momio</div>
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

            {/* Table Rows - Player Props */}
            {playerProps.map((prop, index) => {
              const scale = getValueScale(index);
              const pulse = getPulse(index);
              
              return (
                <div
                  key={index}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.5fr 1fr 0.8fr 0.8fr 0.8fr 1fr 1fr',
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
                  {/* Jugador */}
                  <div
                    style={{
                      color: COLORS.textPrimary,
                      textAlign: 'center',
                      fontSize: '22px',
                      fontWeight: 'bold',
                    }}
                  >
                    {prop.player}
                  </div>

                  {/* Stat */}
                  <div
                    style={{
                      color: COLORS.textSecondary,
                      textAlign: 'center',
                      fontSize: '18px',
                    }}
                  >
                    {prop.stat}
                  </div>

                  {/* Línea */}
                  <div
                    style={{
                      color: COLORS.textPrimary,
                      textAlign: 'center',
                      fontSize: '20px',
                    }}
                  >
                    {prop.line}
                  </div>

                  {/* Proyección */}
                  <div
                    style={{
                      color: COLORS.textPositive,
                      textAlign: 'center',
                      fontSize: '20px',
                      fontWeight: '600',
                    }}
                  >
                    {prop.projection}
                  </div>

                  {/* Odds */}
                  <div
                    style={{
                      color: COLORS.textPrimary,
                      fontWeight: '600',
                      textAlign: 'center',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '20px',
                    }}
                  >
                    {prop.odds}
                  </div>

                  {/* Prob. IA - HIGHLIGHT */}
                  <div
                    style={{
                      color: COLORS.textPositive,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '40px',
                      transform: `scale(${scale * pulse})`,
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    {prop.probIA}%
                  </div>

                  {/* EV - HIGHLIGHT */}
                  <div
                    style={{
                      color: COLORS.textPositive,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '40px',
                      transform: `scale(${scale * pulse})`,
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    +{prop.ev}%
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}; 