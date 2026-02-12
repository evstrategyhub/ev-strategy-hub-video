import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, Easing, Img, staticFile, Audio } from 'remotion';
import { BankrollOverview } from './components/BankrollOverview';
import { MonthlyProfits } from './components/MonthlyProfits';
import { MatchCard } from './components/MatchCard';

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
    {/* Audio de fondo */}
    <Audio src={staticFile('audio/musica.mp3')} volume={0.4} />

    {/* ESCENA 1: Hook - 3 segundos (0-90 frames) */}
      {/* ESCENA 1: Hook - 3 segundos (0-90 frames) */}
      <Sequence from={0} durationInFrames={90}>
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

      {/* ESCENA 2: MatchCard - 5 segundos (90-240 frames) */}
      <Sequence from={90} durationInFrames={150}>
        <Scene2Beat1 />
      </Sequence>

      {/* ESCENA 3: CTA Final - 7 segundos (240-450 frames) */}
      <Sequence from={240} durationInFrames={230}>
        <CTAFinalNew />
      </Sequence>
    </AbsoluteFill>
  );
};

// ============================================================================
// ESCENA 1: HOOK
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

  const bgGlowOpacity = interpolate(
    frame,
    [0, 20, 70, 90],
    [0, 0.3, 0.3, 0],
    { extrapolateRight: 'clamp' }
  );

  const bgGlowScale = interpolate(
    frame,
    [0, 90],
    [0.8, 1.2],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill>
      <ConsistentBackground />

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

      {/* BankrollOverview - TOP */}
      <div style={{ position: 'absolute', top: 80, left: 0, width: '100%' }}>
        <div style={{ transform: 'scale(0.8)', transformOrigin: 'top center' }}>
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
          top: 720,
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
      <div style={{ position: 'absolute', top: 1400, left: 0, width: '100%' }}>
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
                fontSize: 56,
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

      <TextLine2Improved />
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
        fontSize: 42,
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

  const glowIntensity = interpolate(
    frame,
    [45, 55, 65, 75],
    [0.4, 0.7, 0.4, 0.7],
    { extrapolateRight: 'clamp' }
  );

  return (
    <div style={{ position: 'relative' }}>
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
          width: 420,
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
// BACKGROUND COMPONENT - REUTILIZABLE
// ============================================================================
const ConsistentBackground: React.FC = () => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 30% 40%, rgba(34, 197, 94, 0.15), transparent), radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.1), transparent), #111827',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          mixBlendMode: 'overlay',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />
    </>
  );
};

// ============================================================================
// ESCENA 2: MatchCard + COPY NUEVO
// ============================================================================
const Scene2Beat1: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 20, 130, 150],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  // Copy único centrado
  const copyOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const copyY = interpolate(frame, [0, 25], [30, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      <ConsistentBackground />

      {/* Copy centrado */}
      <div
        style={{
          position: 'absolute',
          top: 140,
          left: 0,
          width: '100%',
          padding: '0 80px',
          opacity: copyOpacity,
          transform: `translateY(${copyY}px)`,
        }}
      >
        <p
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: '#ffffff',
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            fontFamily: 'Montserrat, sans-serif',
            margin: 0,
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          Usa nuestro modelo predictivo para encontrar picks con{' '}
          <span style={{ color: '#22c55e' }}>valor</span> y{' '}
          <span style={{ color: '#22c55e' }}>probabilidades a tu favor</span>
        </p>
      </div>

      {/* MatchCard */}
      <div style={{ position: 'absolute', top: 350, left: 0, width: '100%' }}>
        <MatchCard 
          team1="Benfica (Local)"
          team2="Real Madrid (Visita)"
          league="Champions League"
          datetime="17/2/2026, 14:00:00"
        />
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// ESCENA 3: CTA FINAL
// ============================================================================
const CTAFinalNew: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const headlineScale = interpolate(frame, [10, 30], [0.8, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  const headlineOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const subheadlineOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const subheadlineY = interpolate(frame, [20, 35], [30, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  const logoOpacity = interpolate(frame, [120, 135], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const logoScale = interpolate(frame, [120, 145], [0.7, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  const urlOpacity = interpolate(frame, [145, 160], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const glowPulse = interpolate(
    frame % 30,
    [0, 15, 30],
    [0.4, 0.8, 0.4],
    { extrapolateRight: 'clamp' }
  );

  const features = [
    'Crea estrategias con probabilidades a tu favor',
    'Gestión de Bankroll Profesional',
    'Creación de Estrategia (Straight Bet o Kelly)',
    'Calificador de Combinadas',
    'Acceso a la comunidad de Discord',
    'Leaderboards de Comunidad por premios',
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      <ConsistentBackground />

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 800,
          height: 800,
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.25), transparent 70%)',
          transform: 'translate(-50%, -50%)',
          opacity: glowPulse,
          filter: 'blur(100px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28,
          width: '100%',
          padding: '0 80px',
        }}
      >
        {/* Headline */}
        <h1
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: '#22c55e',
            textShadow: '0 0 60px rgba(34, 197, 94, 0.8), 0 8px 24px rgba(0,0,0,0.9)',
            fontFamily: 'Montserrat, sans-serif',
            margin: 0,
            textAlign: 'center',
            opacity: headlineOpacity,
            transform: `scale(${headlineScale})`,
          }}
        >
          Regístrate Gratis
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontSize: 56,
            fontWeight: 600,
            color: '#d1d5db',
            textShadow: '0 4px 16px rgba(0,0,0,0.8)',
            fontFamily: 'Montserrat, sans-serif',
            margin: 0,
            textAlign: 'center',
            lineHeight: 1.3,
            opacity: subheadlineOpacity,
            transform: `translateY(${subheadlineY}px)`,
          }}
        >
          Y conviértete en un Apostador Inteligente
        </p>

        {/* Features List */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
            width: '100%',
            maxWidth: 900,
            marginTop: 12,
          }}
        >
          {features.map((feature, i) => (
            <FeatureBullet key={i} text={feature} index={i} />
          ))}
        </div>

        {/* Logo */}
        <div style={{ position: 'relative', opacity: logoOpacity, marginTop: 20 }}>
          <div
            style={{
              position: 'absolute',
              inset: -40,
              background: 'radial-gradient(circle, rgba(34, 197, 94, 0.4), transparent 70%)',
              opacity: glowPulse,
              filter: 'blur(60px)',
            }}
          />

          <Img
            src={staticFile('images/logo.png')}
            style={{
              width: 420,
              height: 'auto',
              transform: `scale(${logoScale})`,
              filter: 'drop-shadow(0 15px 40px rgba(0, 0, 0, 0.6))',
              position: 'relative',
            }}
          />
        </div>

        {/* URL */}
        <p
          style={{
            fontSize: 36,
            fontWeight: 500,
            color: '#9ca3af',
            fontFamily: 'Open Sans, sans-serif',
            margin: 0,
            opacity: urlOpacity,
          }}
        >
          evstrategyhub.com
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// FEATURE BULLET COMPONENT
// ============================================================================
interface FeatureBulletProps {
  text: string;
  index: number;
}

const FeatureBullet: React.FC<FeatureBulletProps> = ({ text, index }) => {
  const frame = useCurrentFrame();
  const delay = 40 + index * 8;

  const opacity = interpolate(frame, [delay, delay + 12], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const translateX = interpolate(frame, [delay, delay + 15], [-20, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        opacity,
        transform: `translateX(${translateX}px)`,
      }}
    >
      {/* Checkmark */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          backgroundColor: '#22c55e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
          <path
            d="M13.3333 4L6 11.3333L2.66667 8"
            stroke="#111827"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Text */}
      <span
        style={{
          fontSize: 36,
          fontWeight: 500,
          color: '#ffffff',
          fontFamily: 'Open Sans, sans-serif',
          lineHeight: 1.4,
        }}
      >
        {text}
      </span>
    </div>
  );
};