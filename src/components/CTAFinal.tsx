import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing, spring, Img, staticFile } from 'remotion';

interface CTAFinalProps {
  title?: string;
  subtitle?: string;
  cta?: string;
  url?: string;
}

const COLORS = {
  bgGradient: 'linear-gradient(135deg, #111827, #1f2937)',
  textPrimary: '#ffffff',
  textSecondary: '#d1d5db',
  accent: '#22c55e',
  accentGlow: 'rgba(34, 197, 94, 0.3)',
};

export const CTAFinal: React.FC<CTAFinalProps> = ({
  title = 'EV Strategy Hub',
  subtitle = 'Apuestas inteligentes con valor esperado positivo',
  cta = 'www.evstrategyhub.com',
  url = 'evstrategyhub.com',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation
  const logoDelay = 0;
  const logoOpacity = interpolate(frame, [logoDelay, logoDelay + 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const logoScale = spring({
    frame: frame - logoDelay,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // Title animation
  const titleDelay = 15;
  const titleOpacity = interpolate(frame, [titleDelay, titleDelay + 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const titleY = interpolate(frame, [titleDelay, titleDelay + 25], [30, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  // Subtitle animation
  const subtitleDelay = 30;
  const subtitleOpacity = interpolate(frame, [subtitleDelay, subtitleDelay + 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const subtitleY = interpolate(frame, [subtitleDelay, subtitleDelay + 25], [30, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  // CTA button animation
  const ctaDelay = 50;
  const ctaOpacity = interpolate(frame, [ctaDelay, ctaDelay + 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const ctaScale = spring({
    frame: frame - ctaDelay,
    fps,
    from: 0.9,
    to: 1,
    config: { damping: 10, stiffness: 80 },
  });

  // Pulse animation for CTA
  const pulse = interpolate(
    frame,
    [ctaDelay + 40, ctaDelay + 55, ctaDelay + 70, ctaDelay + 85],
    [1, 1.05, 1, 1.05],
    { extrapolateRight: 'clamp' }
  );

  // Glow effect animation
  const glowOpacity = interpolate(
    frame,
    [ctaDelay + 30, ctaDelay + 45, ctaDelay + 60, ctaDelay + 75, ctaDelay + 90],
    [0.3, 0.6, 0.3, 0.6, 0.3],
    { extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: COLORS.bgGradient,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background circles */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: COLORS.accentGlow,
          filter: 'blur(100px)',
          opacity: 0.2,
          transform: `scale(${interpolate(frame, [0, 150], [0.8, 1.2], { extrapolateRight: 'clamp' })})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: COLORS.accentGlow,
          filter: 'blur(100px)',
          opacity: 0.2,
          transform: `scale(${interpolate(frame, [0, 150], [1.2, 0.8], { extrapolateRight: 'clamp' })})`,
        }}
      />

      {/* Logo */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          marginBottom: 40,
        }}
      >
        <Img
          src={staticFile('images/logo.png')}
          style={{
            width: 280,
            height: 280,
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: 64,
          fontWeight: 'bold',
          color: COLORS.textPrimary,
          fontFamily: 'Poppins, sans-serif',
          textAlign: 'center',
          marginBottom: 20,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        {title}
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 28,
          color: COLORS.textSecondary,
          fontFamily: 'Montserrat, sans-serif',
          textAlign: 'center',
          maxWidth: 800,
          marginBottom: 60,
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          lineHeight: 1.4,
        }}
      >
        {subtitle}
      </p>

      {/* CTA Button */}
      <div
        style={{
          position: 'relative',
          opacity: ctaOpacity,
          transform: `scale(${ctaScale * pulse})`,
        }}
      >
        {/* Glow effect */}
        <div
          style={{
            position: 'absolute',
            inset: -20,
            background: COLORS.accent,
            borderRadius: 60,
            filter: 'blur(30px)',
            opacity: glowOpacity,
          }}
        />

        {/* Button */}
        <div
          style={{
            position: 'relative',
            backgroundColor: COLORS.accent,
            color: COLORS.textPrimary,
            padding: '24px 60px',
            borderRadius: 50,
            fontSize: 32,
            fontWeight: 'bold',
            fontFamily: 'Poppins, sans-serif',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span style={{ fontSize: 36 }}>🎯</span>
          <span>{cta}</span>
        </div>
      </div>

      {/* URL Text */}
      <div
        style={{
          marginTop: 40,
          fontSize: 24,
          color: COLORS.textSecondary,
          fontFamily: 'Montserrat, sans-serif',
          opacity: interpolate(frame, [70, 90], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        {url}
      </div>
    </div>
  );
};