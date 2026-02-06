import React from "react";
import {
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

// Design system colors
const COLORS = {
  bgCard: "#1f2937",
  bgSection: "#374151",
  borderDefault: "#374151",
  textPrimary: "#ffffff",
  textSecondary: "#d1d5db",
  textTertiary: "#9ca3af",
  textPositive: "#22c55e",
  accentBlue: "#3b82f6",
};

// Simple SVG icons as inline components
const ChartIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 48,
  color = COLORS.textTertiary,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const BrainIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 48,
  color = COLORS.textTertiary,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a7 7 0 0 0-7 7c0 3 2 5.5 5 7v3h4v-3c3-1.5 5-4 5-7a7 7 0 0 0-7-7z" />
    <line x1="9" y1="22" x2="15" y2="22" />
  </svg>
);

const CompareIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 48,
  color = COLORS.textTertiary,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="2" x2="12" y2="22" />
    <path d="M17 12H3" />
    <path d="M21 12H17" />
    <polyline points="15 16 19 12 15 8" />
    <polyline points="9 8 5 12 9 16" />
  </svg>
);

const CheckIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 48,
  color = COLORS.textPositive,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

interface StepData {
  icon: React.ReactNode;
  title: string;
  value: string;
  numericValue?: number;
  subtitle: string;
  isHighlight?: boolean;
}

interface StepCardProps {
  step: StepData;
  stepNumber: number;
  delay: number;
}

const StepCard: React.FC<StepCardProps> = ({ step, stepNumber, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [delay, delay + 25], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const translateY = interpolate(frame, [delay, delay + 30], [40, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const scale = spring({
    frame: frame - delay,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // Pulse animation for the final step
  const pulseScale = step.isHighlight
    ? interpolate(
        frame,
        [delay + 30, delay + 45, delay + 60, delay + 75],
        [1, 1.05, 1, 1.05],
        { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
      )
    : 1;

  // Glow effect for highlight
  const glowOpacity = step.isHighlight
    ? interpolate(frame, [delay + 25, delay + 40], [0, 0.6], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      })
    : 0;

  // Animated numeric value
  const animatedValue =
    step.numericValue !== undefined
      ? interpolate(frame, [delay + 5, delay + 35], [0, step.numericValue], {
          extrapolateRight: "clamp",
          extrapolateLeft: "clamp",
        }).toFixed(1)
      : step.value;

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: COLORS.bgCard,
        borderRadius: 16,
        border: step.isHighlight
          ? `2px solid ${COLORS.textPositive}`
          : `1px solid ${COLORS.borderDefault}`,
        padding: 24,
        textAlign: "center",
        opacity,
        transform: `translateY(${translateY}px) scale(${scale * pulseScale})`,
        boxShadow: step.isHighlight
          ? `0 0 30px rgba(34, 197, 94, ${glowOpacity})`
          : "none",
        position: "relative",
      }}
    >
      {/* Step number badge */}
      <div
        style={{
          position: "absolute",
          top: -12,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: step.isHighlight
            ? COLORS.textPositive
            : COLORS.accentBlue,
          color: COLORS.textPrimary,
          padding: "4px 12px",
          borderRadius: 12,
          fontSize: 12,
          fontWeight: 700,
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        PASO {stepNumber}
      </div>

      {/* Icon */}
      <div
        style={{
          marginBottom: 16,
          marginTop: 8,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {step.icon}
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: COLORS.textTertiary,
          fontFamily: "Montserrat, sans-serif",
          marginBottom: 12,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {step.title}
      </div>

      {/* Value */}
      <div
        style={{
          fontSize: 36,
          fontWeight: 800,
          color: step.isHighlight ? COLORS.textPositive : COLORS.textPrimary,
          fontFamily: "Montserrat, sans-serif",
          marginBottom: 8,
        }}
      >
        {step.numericValue !== undefined
          ? `${step.value.startsWith("+") ? "+" : ""}${animatedValue}%`
          : step.value}
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 14,
          color: COLORS.textSecondary,
          fontFamily: "Open Sans, sans-serif",
        }}
      >
        {step.subtitle}
      </div>
    </div>
  );
};

// Arrow connector between steps (vertical)
const ArrowConnector: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const scaleY = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 36,
        opacity,
        transform: `scaleY(${scaleY})`,
      }}
    >
      <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={COLORS.textTertiary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
      </svg>
    </div>
  );
};

interface DashboardEVExplainerProps {
  steps?: StepData[];
}

export const DashboardEVExplainer: React.FC<DashboardEVExplainerProps> = ({
  steps = [
    {
      icon: <ChartIcon size={48} color={COLORS.accentBlue} />,
      title: "Momios Casa",
      value: "1.91",
      subtitle: "= 52.4% implícita",
    },
    {
      icon: <BrainIcon size={48} color={COLORS.accentBlue} />,
      title: "Modelo IA",
      value: "58.3%",
      numericValue: 58.3,
      subtitle: "probabilidad real",
    },
    {
      icon: <CompareIcon size={48} color={COLORS.accentBlue} />,
      title: "Comparar",
      value: "5.9%",
      numericValue: 5.9,
      subtitle: "ventaja encontrada",
    },
    {
      icon: <CheckIcon size={48} color={COLORS.textPositive} />,
      title: "EV+ Encontrado",
      value: "+5.9%",
      numericValue: 5.9,
      subtitle: "APOSTAR",
      isHighlight: true,
    },
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 20], [-30, 0], {
    extrapolateRight: "clamp",
  });

  const titleScale = spring({
    frame,
    fps,
    from: 0.9,
    to: 1,
    config: { damping: 15, stiffness: 80 },
  });

  // Calculate delays for each step (staggered)
  const stepDelays = [10, 40, 70, 100];
  const arrowDelays = [35, 65, 95];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1020,
      }}
    >
      {/* Title */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 28,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px) scale(${titleScale})`,
        }}
      >
        <h1
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: COLORS.textPrimary,
            fontFamily: "Montserrat, sans-serif",
            margin: 0,
            marginBottom: 8,
          }}
        >
          Cómo Encontramos Valor
        </h1>
        <p
          style={{
            fontSize: 16,
            color: COLORS.textSecondary,
            fontFamily: "Open Sans, sans-serif",
            margin: 0,
          }}
        >
          Nuestra metodología EV+ en 4 simples pasos
        </p>
      </div>

      {/* Steps container - vertical stack */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 0,
        }}
      >
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <StepCard
              step={step}
              stepNumber={index + 1}
              delay={stepDelays[index]}
            />
            {index < steps.length - 1 && (
              <ArrowConnector delay={arrowDelays[index]} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
