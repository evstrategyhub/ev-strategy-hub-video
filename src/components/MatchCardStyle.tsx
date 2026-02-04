import React from 'react';

interface MatchCardStyleProps {
  children: React.ReactNode;
}

export const MatchCardStyle: React.FC<MatchCardStyleProps> = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: '#1f2937',
        borderRadius: 12,
        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
        border: '1px solid #374151',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
};

// Header del card
export const CardHeader: React.FC<{
  homeTeam: string;
  awayTeam: string;
  league: string;
  date: string;
}> = ({ homeTeam, awayTeam, league, date }) => {
  return (
    <div
      style={{
        padding: 16,
        borderBottom: '1px solid #374151',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              backgroundColor: '#16a34a',
              borderRadius: '50%',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                color: 'white',
                fontWeight: 500,
                fontSize: 14,
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              {homeTeam} (Local)
            </span>
            <span
              style={{
                color: 'white',
                fontWeight: 500,
                fontSize: 14,
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              {awayTeam} (Visita)
            </span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p
            style={{
              color: '#9ca3af',
              fontSize: 12,
              margin: 0,
              fontFamily: 'Open Sans, sans-serif',
            }}
          >
            {league}
          </p>
          <p
            style={{
              color: '#9ca3af',
              fontSize: 12,
              margin: 0,
              fontFamily: 'Open Sans, sans-serif',
            }}
          >
            {date}
          </p>
        </div>
      </div>
    </div>
  );
};

// Tabla de mercados
export const MarketTable: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div style={{ padding: 16 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 0,
          fontSize: 12,
          color: '#9ca3af',
          backgroundColor: '#111827',
          padding: 8,
          borderRadius: '8px 8px 0 0',
        }}
      >
        <div
          style={{
            fontWeight: 500,
            textAlign: 'center',
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          Mercado
        </div>
        <div
          style={{
            fontWeight: 500,
            textAlign: 'center',
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          Momio
        </div>
        <div
          style={{
            fontWeight: 500,
            textAlign: 'center',
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          Prob. M
        </div>
        <div
          style={{
            fontWeight: 700,
            fontSize: 14,
            textAlign: 'center',
            color: '#4ade80',
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          Prob. IA
        </div>
        <div
          style={{
            fontWeight: 700,
            fontSize: 14,
            textAlign: 'center',
            color: '#4ade80',
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          EV (%)
        </div>
      </div>
      {children}
    </div>
  );
};

// Fila de mercado
export const MarketRow: React.FC<{
  market: string;
  odds: string;
  probMarket: string;
  probIA: string;
  ev: string;
  evPositive: boolean;
}> = ({ market, odds, probMarket, probIA, ev, evPositive }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 0,
        fontSize: 12,
        borderBottom: '1px solid #374151',
        backgroundColor: '#1f2937',
        padding: 8,
      }}
    >
      <div
        style={{
          color: 'white',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Open Sans, sans-serif',
        }}
      >
        {market}
      </div>
      <div
        style={{
          color: 'white',
          fontWeight: 700,
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Montserrat, sans-serif',
        }}
      >
        {odds}
      </div>
      <div
        style={{
          color: '#d1d5db',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Open Sans, sans-serif',
        }}
      >
        {probMarket}
      </div>
      <div
        style={{
          color: '#4ade80',
          fontWeight: 700,
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Montserrat, sans-serif',
        }}
      >
        {probIA}
      </div>
      <div
        style={{
          color: evPositive ? '#4ade80' : '#f87171',
          fontWeight: 700,
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Montserrat, sans-serif',
        }}
      >
        {evPositive ? '+' : ''}
        {ev}%
      </div>
    </div>
  );
};

// Badge de EV
export const EVBadge: React.FC<{ ev: number; grade: string }> = ({
  ev,
  grade,
}) => {
  const getGradeColor = (g: string) => {
    if (g === 'A') return { bg: '#22c55e', text: 'white' };
    if (g === 'B') return { bg: '#6ee7b7', text: '#111827' };
    if (g === 'C') return { bg: '#facc15', text: '#111827' };
    if (g === 'D') return { bg: '#fb923c', text: 'white' };
    return { bg: '#ef4444', text: 'white' };
  };

  const gradeColors = getGradeColor(grade);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div
        style={{
          padding: '4px 10px',
          borderRadius: 50,
          fontSize: 12,
          fontWeight: 700,
          backgroundColor: ev >= 0 ? '#16a34a' : '#4b5563',
          color: 'white',
          fontFamily: 'Montserrat, sans-serif',
        }}
      >
        EV {ev >= 0 ? '+' : ''}
        {ev.toFixed(1)}%
      </div>
      <div
        style={{
          padding: '4px 10px',
          borderRadius: 50,
          fontSize: 12,
          fontWeight: 700,
          backgroundColor: gradeColors.bg,
          color: gradeColors.text,
          fontFamily: 'Montserrat, sans-serif',
        }}
      >
        {grade}
      </div>
    </div>
  );
};
