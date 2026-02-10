import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, Easing, Img, staticFile } from 'remotion';
import { BankrollOverview } from './components/BankrollOverview';
import { MonthlyProfits } from './components/MonthlyProfits';
import { CTAFinal } from './components/CTAFinal';

export const VideoPromo: React.FC = () => {
  const bankrollData = {
    currentBankroll: 15000.00,
    deposits: 10000,
    withdrawals: 0,
    totalProfit: 5000,
    roi: 50.0,
  };

  const bankrollHistory = [
    { date: '2026-01-01', amount: 10000 },
    { date: '2026-01-05', amount: 10800 },
    { date: '2026-01-10', amount: 11500 },
    { date: '2026-01-15', amount: 12800 },
    { date: '2026-01-20', amount: 13500 },
    { date: '2026-01-25', amount: 14200 },
    { date: '2026-01-30', amount: 15000 },
  ];

  const selectedMonth = new Date(2026, 0, 1);
  const dailyProfitData = [
    { date: '01', profit: 150 },
    { date: '02', profit: 200 },
    { date: '03', profit: 180 },
    { date: '04', profit: 220 },
    { date: '05', profit: 350 },
    { date: '06', profit: 280 },
    { date: '07', profit: 190 },
    { date: '08', profit: -200 },
    { date: '09', profit: 310 },
    { date: '10', profit: 240 },
    { date: '11', profit: 170 },
    { date: '12', profit: -150 },
    { date: '13', profit: 420 },
    { date: '14', profit: 260 },
    { date: '15', profit: 200 },
    { date: '16', profit: 380 },
    { date: '17', profit: 290 },
    { date: '18', profit: -180 },
    { date: '19', profit: 210 },
    { date: '20', profit: 340 },
    { date: '21', profit: 180 },
    { date: '22', profit: -120 },
    { date: '23', profit: 250 },
    { date: '24', profit: 480 },
    { date: '25', profit: 320 },
    { date: '26', profit: -90 },
    { date: '27', profit: 190 },
    { date: '28', profit: 230 },
    { date: '29', profit: -160 },
    { date: '30', profit: 280 },
    { date: '31', profit: 151 },
  ];

  const totalProfit = dailyProfitData.reduce((sum, day) => sum + day.profit, 0);
  const averageDailyProfit = totalProfit / dailyProfitData.length;
  const bestDay = dailyProfitData.reduce(
    (max, day) => (day.profit > max.profit ? day : max),
    { date: 'N/A', profit: -Infinity }
  );
  const worstDay = dailyProfitData.reduce(
    (min, day) => (day.profit < min.profit ? day : min),
    { date: 'N/A', profit: Infinity }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: '#111827' }}>
      {/* ESCENA 1: Hook - 2.5 segundos (75 frames) */}
      <Sequence from={0} durationInFrames={75}>
        <AbsoluteFill>
          {/* BankrollOverview - TOP */}
          <div style={{ position: 'absolute', top: 85, left: 0, width: '100%' }}>
            <div style={{ transform: 'scale(0.85)', transformOrigin: 'top center' }}>
              <BankrollOverview
                bankrollData={bankrollData}
                bankrollHistory={bankrollHistory}
              />
            </div>
          </div>

          {/* TEXTO + LOGO - MIDDLE */}
          <div
            style={{
              position: 'absolute',
              top: 766,
              left: 0,
              width: '100%',
              height: 200,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 32px',
              gap: 14,
            }}
          >
            <AnimatedText />
          </div>

          {/* MonthlyProfits - BOTTOM */}
          <div style={{ position: 'absolute', top: 1052, left: 0, width: '100%' }}>
            <div style={{ transform: 'scale(0.85)', transformOrigin: 'top center' }}>
              <MonthlyProfits
                selectedMonth={selectedMonth}
                dailyProfitData={dailyProfitData}
                totalProfit={totalProfit}
                averageDailyProfit={averageDailyProfit}
                bestDay={bestDay}
                worstDay={worstDay}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ESCENA FINAL: CTA */}
      <Sequence from={780} durationInFrames={120}>
        <CTAFinal />
      </Sequence>
    </AbsoluteFill>
  );
};

const AnimatedText: React.FC = () => {
  const frame = useCurrentFrame();

  const words = [
    { text: 'Un', delay: 0 },
    { text: 'bankroll', delay: 5 },
    { text: 'así', delay: 10 },
    { text: 'no', delay: 15 },
    { text: 'es', delay: 20 },
    { text: 'suerte', delay: 25 },
  ];

  return (
    <>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
        {words.map((word, i) => {
          const opacity = interpolate(frame, [word.delay, word.delay + 5], [0, 1], {
            extrapolateRight: 'clamp',
          });

          return (
            <span
              key={i}
              style={{
                fontSize: 56,
                fontWeight: 'bold',
                color: '#22c55e',
                textShadow: '0 4px 12px rgba(0,0,0,0.8)',
                fontFamily: 'Montserrat, sans-serif',
                opacity,
              }}
            >
              {word.text}
            </span>
          );
        })}
      </div>

      <TextLine2 />
      <LogoAnimated />
    </>
  );
};

const TextLine2: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [30, 35], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <p
      style={{
        fontSize: 42,
        fontWeight: '600',
        color: '#d1d5db',
        textAlign: 'center',
        textShadow: '0 4px 12px rgba(0,0,0,0.8)',
        fontFamily: 'Montserrat, sans-serif',
        margin: 0,
        opacity,
      }}
    >
      Se construye con
    </p>
  );
};

const LogoAnimated: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [37, 45], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(frame, [37, 45], [0.8, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  return (
    <Img
      src={staticFile('images/logo.png')}
      style={{
        width: 280,
        height: 'auto',
        opacity,
        transform: `scale(${scale})`,
      }}
    />
  );
};