import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

interface DailyProfit {
  date: string;
  profit: number;
}

interface MonthlyProfitsProps {
  selectedMonth: Date;
  dailyProfitData: DailyProfit[];
  totalProfit: number;
  averageDailyProfit: number;
  bestDay: { date: string; profit: number };
  worstDay: { date: string; profit: number };
}

export const MonthlyProfits: React.FC<MonthlyProfitsProps> = ({
  selectedMonth,
  dailyProfitData,
  totalProfit,
  averageDailyProfit,
  bestDay,
  worstDay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(selectedMonth);
  const firstDay = getFirstDayOfMonth(selectedMonth);

  const calendarDays: Array<{ day: number; profit: number } | null> = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayStr = day.toString().padStart(2, '0');
    const profitData = dailyProfitData.find(d => d.date === dayStr);
    calendarDays.push({
      day,
      profit: profitData ? profitData.profit : 0,
    });
  }

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatNumberInt = (num: number): string => {
    return new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatMonthYear = (date: Date): string => {
    return date.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });
  };

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  const daysAnimated = interpolate(
    frame,
    [15, 60],
    [0, calendarDays.length],
    {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
      easing: Easing.inOut(Easing.ease),
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#111827',
        padding: '40px',
        opacity: fadeIn,
      }}
    >
      <div
        style={{
          backgroundColor: '#1f2937',
          borderRadius: '12px',
          border: '1px solid #374151',
          padding: '32px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#9ca3af', fontSize: '16px', marginBottom: '8px', fontFamily: 'Montserrat, sans-serif' }}>
              Ganancias Totales
            </p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: totalProfit >= 0 ? '#22c55e' : '#ef4444', fontFamily: 'Poppins, sans-serif' }}>
              ${formatNumber(Math.abs(totalProfit))}
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#9ca3af', fontSize: '16px', marginBottom: '8px', fontFamily: 'Montserrat, sans-serif' }}>
              Promedio Diario
            </p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: averageDailyProfit >= 0 ? '#22c55e' : '#ef4444', fontFamily: 'Poppins, sans-serif' }}>
              ${formatNumber(Math.abs(averageDailyProfit))}
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#9ca3af', fontSize: '16px', marginBottom: '8px', fontFamily: 'Montserrat, sans-serif' }}>
              Mejor Día
            </p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#22c55e', fontFamily: 'Poppins, sans-serif' }}>
              Día {bestDay.date}: ${formatNumber(bestDay.profit)}
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#9ca3af', fontSize: '16px', marginBottom: '8px', fontFamily: 'Montserrat, sans-serif' }}>
              Peor Día
            </p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444', fontFamily: 'Poppins, sans-serif' }}>
              {worstDay.profit === Infinity ? 'Sin pérdidas' : `Día ${worstDay.date}: $${formatNumber(Math.abs(worstDay.profit))}`}
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center' }}>
          {daysOfWeek.map((day, index) => (
            <div
              key={`header-${index}`}
              style={{ color: '#9ca3af', fontSize: '16px', fontFamily: 'Montserrat, sans-serif', marginBottom: '8px' }}
            >
              {day}
            </div>
          ))}

          {calendarDays.map((day, index) => {
            const isVisible = index < Math.floor(daysAnimated);
            return (
              <div
                key={`day-${index}`}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '18px',
                  backgroundColor: day
                    ? day.profit > 0
                      ? '#14532d'
                      : day.profit < 0
                      ? '#7f1d1d'
                      : '#1f2937'
                    : 'transparent',
                  color: '#ffffff',
                  fontFamily: 'Montserrat, sans-serif',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'scale(1)' : 'scale(0.8)',
                  transition: 'opacity 0.2s, transform 0.2s',
                }}
              >
                {day ? (
                  <>
                    <div style={{ marginBottom: '4px' }}>{day.day}</div>
                    <div style={{ fontSize: '14px', color: day.profit >= 0 ? '#22c55e' : '#ef4444' }}>
                      {formatNumberInt(Math.abs(day.profit))}
                    </div>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};