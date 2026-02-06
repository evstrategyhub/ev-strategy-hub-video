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

interface StepData {
  icon: string;
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
        flex: 1,
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
          fontSize: 48,
          marginBottom: 16,
          marginTop: 8,
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

// Arrow connector between steps
const ArrowConnector: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const scaleX = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        opacity,
        transform: `scaleX(${scaleX})`,
      }}
    >
      <div
        style={{
          fontSize: 28,
          color: COLORS.textTertiary,
        }}
      >
        →
      </div>
    </div>
  );
};

interface DashboardEVExplainerProps {
  steps?: StepData[];
}

export const DashboardEVExplainer: React.FC<DashboardEVExplainerProps> = ({
  steps = [
    {
      icon: "📊",
      title: "Bookmaker Odds",
      value: "-110",
      subtitle: "= 52.4% implied",
    },
    {
      icon: "🧠",
      title: "AI Model",
      value: "58.3%",
      numericValue: 58.3,
      subtitle: "true probability",
    },
    {
      icon: "⚖️",
      title: "Compare",
      value: "5.9%",
      numericValue: 5.9,
      subtitle: "edge found",
    },
    {
      icon: "✅",
      title: "EV+ Found",
      value: "+5.9%",
      numericValue: 5.9,
      subtitle: "BET THIS!",
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
        maxWidth: 1000,
      }}
    >
      {/* Title */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 40,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px) scale(${titleScale})`,
        }}
      >
        <h1
          style={{
            fontSize: 36,
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
            fontSize: 18,
            color: COLORS.textSecondary,
            fontFamily: "Open Sans, sans-serif",
            margin: 0,
          }}
        >
          Nuestra metodología EV+ en 4 simples pasos
        </p>
      </div>

      {/* Steps container */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
