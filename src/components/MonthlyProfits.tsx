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

  const daysOfWeek = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

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
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const fadeIn = interpolate(frame, [2, 17], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  const daysAnimated = interpolate(
    frame,
    [17, 60],
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
        padding: '60px 40px',
        opacity: fadeIn,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Calendar - CENTRADO Y GRANDE */}
      <div
        style={{
          backgroundColor: '#1f2937',
          padding: '40px',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '1000px',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '14px', textAlign: 'center' }}>
          {/* Headers días */}
          {daysOfWeek.map((day, index) => (
            <div
              key={`header-${index}`}
              style={{
                color: '#d1d5db',
                fontSize: '28px',
                fontWeight: '700',
                fontFamily: 'Montserrat, sans-serif',
                marginBottom: '20px',
              }}
            >
              {day}
            </div>
          ))}

          {/* Days */}
          {calendarDays.map((day, index) => {
            const isVisible = index < Math.floor(daysAnimated);
            return (
              <div
                key={`day-${index}`}
                style={{
                  padding: '24px 16px',
                  borderRadius: '12px',
                  fontSize: '32px',
                  fontWeight: '700',
                  backgroundColor: day
                    ? day.profit > 0
                      ? '#14532d'
                      : day.profit < 0
                      ? '#7f1d1d'
                      : '#374151'
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
                    <div style={{ marginBottom: '10px' }}>{day.day}</div>
                    <div style={{ fontSize: '22px', fontWeight: '600', color: day.profit >= 0 ? '#22c55e' : '#ef4444' }}>
                      {formatNumber(Math.abs(day.profit))}
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