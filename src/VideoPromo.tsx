import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, Easing, Img, staticFile } from 'remotion';
import { BankrollOverview } from './components/BankrollOverview';
import { MonthlyProfits } from './components/MonthlyProfits';
import { CTAFinal } from './components/CTAFinal';
import { MatchCard } from './components/MatchCard';
import { MatchCardNBA } from './components/MatchCardNBA';

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
        <Scene1Hook
          bankrollData={bankrollData}
          bankrollHistory={bankrollHistory}
          selectedMonth={selectedMonth}
          dailyProfitData={dailyProfitData}
          totalProfit={totalProfit}
          averageDailyProfit={averageDailyProfit}
          bestDay={bestDay}
          worstDay={worstDay}
        />
      </Sequence>

      {/* ESCENA 2 - BEAT 1: MatchCard centrado (frames 75-195) */}
      <Sequence from={75} durationInFrames={120}>
        <Scene2Beat1 />
      </Sequence>

      {/* ESCENA 2 - BEAT 2: MatchCard + MatchCardNBA lado a lado (frames 195-315) */}
      <Sequence from={195} durationInFrames={120}>
        <Scene2Beat2 />
      </Sequence>

      {/* ESCENA 2 - BEAT 3: MatchCardNBA Props centrado (frames 315-435) */}
      <Sequence from={315} durationInFrames={120}>
        <Scene2Beat3 />
      </Sequence>

      {/* ESCENA FINAL: CTA */}
      <Sequence from={420} durationInFrames={120}>
        <CTAFinal />
      </Sequence>
    </AbsoluteFill>
  );
};

// ============================================================================
// ESCENA 1: HOOK - SPACING AJUSTADO
// ============================================================================
interface Scene1Props {
  bankrollData: any;
  bankrollHistory: any[];
  selectedMonth: Date;
  dailyProfitData: any[];
  totalProfit: number;
  averageDailyProfit: number;
  bestDay: any;
  worstDay: any;
}

const Scene1Hook: React.FC<Scene1Props> = ({
  bankrollData,
  bankrollHistory,
  selectedMonth,
  dailyProfitData,
  totalProfit,
  averageDailyProfit,
  bestDay,
  worstDay,
}) => {
  const frame = useCurrentFrame();

  // Animated background
  const bgGlowOpacity = interpolate(
    frame,
    [0, 20, 55, 75],
    [0, 0.3, 0.3, 0],
    { extrapolateRight: 'clamp' }
  );

  const bgGlowScale = interpolate(
    frame,
    [0, 75],
    [0.8, 1.2],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill>
      {/* Fondo animado con gradientes */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 30% 40%, rgba(34, 197, 94, 0.15), transparent), radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.1), transparent), #111827',
        }}
      />

      {/* Glow animado central */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.2), transparent 70%)',
          transform: `translate(-50%, -50%) scale(${bgGlowScale})`,
          opacity: bgGlowOpacity,
          filter: 'blur(80px)',
        }}
      />

      {/* Noise texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          mixBlendMode: 'overlay',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* BankrollOverview - TOP */}
      <div style={{ position: 'absolute', top: 40, left: 0, width: '100%' }}>
        <div style={{ transform: 'scale(0.8)', transformOrigin: 'top center' }}>
          <BankrollOverview
            bankrollData={bankrollData}
            bankrollHistory={bankrollHistory}
          />
        </div>
      </div>

      {/* TEXTO + LOGO - MIDDLE (BAJADO) */}
      <div
        style={{
          position: 'absolute',
          top: 780,
          left: 0,
          width: '100%',
          height: 280,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 60px',
          gap: 20,
        }}
      >
        <AnimatedTextImproved />
      </div>

      {/* MonthlyProfits - BOTTOM */}
      <div style={{ position: 'absolute', top: 1180, left: 0, width: '100%' }}>
        <div style={{ transform: 'scale(0.8)', transformOrigin: 'top center' }}>
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
  );
};

// ============================================================================
// TEXTO ANIMADO MEJORADO
// ============================================================================
const AnimatedTextImproved: React.FC = () => {
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
      {/* Línea 1: "Un bankroll así no es suerte" */}
      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'center' }}>
        {words.map((word, i) => {
          const opacity = interpolate(frame, [word.delay, word.delay + 5], [0, 1], {
            extrapolateRight: 'clamp',
          });

          const scale = interpolate(frame, [word.delay, word.delay + 8], [0.8, 1], {
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.ease),
          });

          return (
            <span
              key={i}
              style={{
                fontSize: 72,
                fontWeight: 900,
                color: '#22c55e',
                textShadow: '0 0 40px rgba(34, 197, 94, 0.6), 0 4px 12px rgba(0,0,0,0.8)',
                fontFamily: 'Montserrat, sans-serif',
                opacity,
                transform: `scale(${scale})`,
                display: 'inline-block',
              }}
            >
              {word.text}
            </span>
          );
        })}
      </div>

      {/* Línea 2: "Se construye con" */}
      <TextLine2Improved />

      {/* Logo */}
      <LogoAnimatedImproved />
    </>
  );
};

const TextLine2Improved: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [30, 35], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(frame, [30, 38], [20, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  return (
    <p
      style={{
        fontSize: 52,
        fontWeight: 600,
        color: '#d1d5db',
        textAlign: 'center',
        textShadow: '0 4px 12px rgba(0,0,0,0.8)',
        fontFamily: 'Montserrat, sans-serif',
        margin: 0,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      Se construye con
    </p>
  );
};

const LogoAnimatedImproved: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [37, 45], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(frame, [37, 48], [0.7, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  // Glow pulsante
  const glowIntensity = interpolate(
    frame,
    [45, 55, 65, 75],
    [0.4, 0.7, 0.4, 0.7],
    { extrapolateRight: 'clamp' }
  );

  return (
    <div style={{ position: 'relative' }}>
      {/* Glow behind logo */}
      <div
        style={{
          position: 'absolute',
          inset: -30,
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.3), transparent 70%)',
          opacity: glowIntensity,
          filter: 'blur(40px)',
        }}
      />

      <Img
        src={staticFile('images/logo.png')}
        style={{
          width: 500,
          height: 'auto',
          opacity,
          transform: `scale(${scale})`,
          filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))',
          position: 'relative',
        }}
      />
    </div>
  );
};

// ============================================================================
// ESCENA 2 - BEAT 1: MatchCard centrado - MOBILE OPTIMIZADO
// ============================================================================
const Scene2Beat1: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 20, 100, 120],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* Fondo con grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(0deg, rgba(55, 65, 81, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(55, 65, 81, 0.03) 1px, transparent 1px), #111827',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Texto arriba */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 0,
          width: '100%',
          textAlign: 'center',
          padding: '0 60px',
        }}
      >
        <p
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: '#ffffff',
            textShadow: '0 4px 16px rgba(0,0,0,0.8)',
            fontFamily: 'Montserrat, sans-serif',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Convertimos momios en probabilidades con modelos IA
        </p>
      </div>

      {/* MatchCard centrado - AHORA MOBILE OPTIMIZADO */}
      <MatchCard 
        team1="América"
        team2="Guadalajara"
        league="Liga MX"
        time="19:00"
        markets={[
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
        ]}
      />
    </AbsoluteFill>
  );
};

// ============================================================================
// ESCENA 2 - BEAT 2: MatchCard + MatchCardNBA Game Odds lado a lado
// ============================================================================
const Scene2Beat2: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 20, 100, 120],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* Fondo con diagonal lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'repeating-linear-gradient(45deg, #111827, #111827 20px, rgba(34, 197, 94, 0.02) 20px, rgba(34, 197, 94, 0.02) 40px)',
        }}
      />

      {/* Texto arriba */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 0,
          width: '100%',
          textAlign: 'center',
          padding: '0 60px',
        }}
      >
        <p
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: '#ffffff',
            textShadow: '0 4px 16px rgba(0,0,0,0.8)',
            fontFamily: 'Montserrat, sans-serif',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          En todos los mercados de fútbol y deportes americanos
        </p>
      </div>

      {/* MatchCard izquierda (50%) - SCALE PEQUEÑO */}
      <div style={{ position: 'absolute', top: 280, left: '-25%', width: '100%' }}>
        <div style={{ transform: 'scale(0.55)', transformOrigin: 'top center' }}>
          <MatchCard 
            team1="Cruz Azul"
            team2="Pumas"
            league="Liga MX"
            time="21:00"
          />
        </div>
      </div>

      {/* MatchCardNBA Game Odds derecha (50%) - SCALE PEQUEÑO */}
      <div style={{ position: 'absolute', top: 280, left: '25%', width: '100%' }}>
        <div style={{ transform: 'scale(0.55)', transformOrigin: 'top center' }}>
          <MatchCardNBA 
            type="game"
            team1="Lakers"
            team2="Warriors"
            league="NBA"
            time="22:00"
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// ESCENA 2 - BEAT 3: MatchCardNBA Player Props centrado
// ============================================================================
const Scene2Beat3: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 20, 100, 120],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* Fondo con radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(34, 197, 94, 0.06), transparent 70%), #111827',
        }}
      />

      {/* Texto arriba */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 0,
          width: '100%',
          textAlign: 'center',
          padding: '0 60px',
        }}
      >
        <p
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: '#ffffff',
            textShadow: '0 4px 16px rgba(0,0,0,0.8)',
            fontFamily: 'Montserrat, sans-serif',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Y análisis de player props en NBA, NFL y MLB
        </p>
      </div>

      {/* MatchCardNBA Player Props centrado */}
      <MatchCardNBA 
        type="props"
        team1="Lakers"
        team2="Warriors"
        league="NBA"
        time="22:00"
        playerProps={[
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
        ]}
      />
    </AbsoluteFill>
  );
};