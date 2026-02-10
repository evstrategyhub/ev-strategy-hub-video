import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

interface BankrollData {
  currentBankroll: number;
  deposits: number;
  withdrawals: number;
  totalProfit: number;
  roi: number;
}

interface BankrollHistoryPoint {
  date: string;
  amount: number;
}

interface BankrollOverviewProps {
  bankrollData: BankrollData;
  bankrollHistory: BankrollHistoryPoint[];
}

export const BankrollOverview: React.FC<BankrollOverviewProps> = ({
  bankrollData,
  bankrollHistory,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animación de entrada (primeros 0.5s)
  const fadeIn = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  const slideUp = interpolate(frame, [0, fps * 0.5], [50, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  // Animación de la gráfica (dibuja la línea progresivamente)
  const graphProgress = interpolate(
    frame,
    [fps * 0.5, fps * 2],
    [0, 100],
    {
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.ease),
    }
  );

  // Formatear números
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  // Crear path de la gráfica
  const createGraphPath = () => {
    if (bankrollHistory.length === 0) return '';

    const width = 900;
    const height = 200;
    const padding = 20;

    const maxValue = Math.max(...bankrollHistory.map(p => p.amount));
    const minValue = Math.min(...bankrollHistory.map(p => p.amount));
    const valueRange = maxValue - minValue || 1;

    const points = bankrollHistory.map((point, index) => {
      const x = padding + (index / (bankrollHistory.length - 1)) * (width - 2 * padding);
      const y = height - padding - ((point.amount - minValue) / valueRange) * (height - 2 * padding);
      return { x, y };
    });

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }

    return path;
  };

  const fullPath = createGraphPath();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#111827',
        padding: '40px',
        opacity: fadeIn,
        transform: `translateY(${slideUp}px)`,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h2
          style={{
            color: '#ffffff',
            fontSize: '28px',
            fontWeight: 'bold',
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          Bankroll Actual
        </h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span
            style={{
              color: '#ffffff',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              fontFamily: 'Open Sans, sans-serif',
            }}
          >
            <span style={{ color: '#22c55e', marginRight: '8px', fontSize: '24px' }}>📈</span>
            Evolución
          </span>
        </div>
      </div>

      {/* Card Container */}
      <div
        style={{
          backgroundColor: '#1f2937',
          borderRadius: '12px',
          border: '1px solid #374151',
          padding: '32px',
        }}
      >
        {/* Bankroll Amount */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: bankrollData.currentBankroll >= 0 ? '#22c55e' : '#ef4444',
            fontFamily: 'Montserrat, sans-serif',
            marginBottom: '24px',
          }}
        >
          ${formatNumber(Math.abs(bankrollData.currentBankroll))}
        </div>

        {/* Graph */}
        <div style={{ height: '200px', marginBottom: '24px', position: 'relative' }}>
          {bankrollHistory.length > 0 ? (
            <svg width="900" height="200" style={{ overflow: 'visible' }}>
              {/* Grid lines */}
              <line x1="20" y1="20" x2="20" y2="180" stroke="#374151" strokeWidth="1" />
              <line x1="20" y1="180" x2="880" y2="180" stroke="#374151" strokeWidth="1" />

              {/* Animated line */}
              <path
                d={fullPath}
                stroke="#48BB78"
                strokeWidth="3"
                fill="none"
                strokeDasharray="1000"
                strokeDashoffset={1000 - (graphProgress * 10)}
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: '#9ca3af',
                fontSize: '18px',
                fontFamily: 'Open Sans, sans-serif',
              }}
            >
              No hay datos disponibles
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '16px',
            marginBottom: '16px',
          }}
        >
          {/* Depósitos */}
          <div
            style={{
              backgroundColor: '#374151',
              padding: '16px',
              borderRadius: '8px',
            }}
          >
            <div
              style={{
                color: '#9ca3af',
                fontSize: '16px',
                marginBottom: '8px',
                fontFamily: 'Open Sans, sans-serif',
              }}
            >
              Depósitos
            </div>
            <div
              style={{
                color: '#ffffff',
                fontSize: '28px',
                fontWeight: 'bold',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              ${formatNumber(bankrollData.deposits)}
            </div>
          </div>

          {/* Retiros */}
          <div
            style={{
              backgroundColor: '#374151',
              padding: '16px',
              borderRadius: '8px',
            }}
          >
            <div
              style={{
                color: '#9ca3af',
                fontSize: '16px',
                marginBottom: '8px',
                fontFamily: 'Open Sans, sans-serif',
              }}
            >
              Retiros
            </div>
            <div
              style={{
                color: '#ffffff',
                fontSize: '28px',
                fontWeight: 'bold',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              ${formatNumber(bankrollData.withdrawals)}
            </div>
          </div>

          {/* Profit */}
          <div
            style={{
              backgroundColor: '#374151',
              padding: '16px',
              borderRadius: '8px',
            }}
          >
            <div
              style={{
                color: '#9ca3af',
                fontSize: '16px',
                marginBottom: '8px',
                fontFamily: 'Open Sans, sans-serif',
              }}
            >
              Profit
            </div>
            <div
              style={{
                color: bankrollData.totalProfit >= 0 ? '#22c55e' : '#ef4444',
                fontSize: '28px',
                fontWeight: 'bold',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              ${formatNumber(Math.abs(bankrollData.totalProfit))}
            </div>
            <div
              style={{
                color: bankrollData.roi >= 0 ? '#22c55e' : '#ef4444',
                fontSize: '14px',
                fontFamily: 'Open Sans, sans-serif',
              }}
            >
              {formatNumber(Math.abs(bankrollData.roi))}% ROI
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          style={{
            marginTop: '16px',
            backgroundColor: '#16a34a',
            color: '#ffffff',
            borderRadius: '8px',
            padding: '16px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none',
            fontSize: '20px',
            fontWeight: 'bold',
            fontFamily: 'Open Sans, sans-serif',
            cursor: 'pointer',
          }}
        >
          <span style={{ marginRight: '8px' }}>+</span> Operación
        </button>
      </div>
    </AbsoluteFill>
  );
};