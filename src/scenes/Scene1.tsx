import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

export const Scene1Hero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo scale animation
  const logoScale = spring({
    frame,
    fps,
    from: 0.6,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // Logo opacity
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtitle fade in
  const subtitleOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [25, 45], [30, 0], {
    extrapolateRight: "clamp",
  });

  // Words appear one by one
  const words = ["Nueva", "plataforma", "para"];
  const highlightWords = ["APOSTADORES", "INTELIGENTES"];

  // Decorative line width
  const lineWidth = interpolate(frame, [15, 50], [0, 300], {
    extrapolateRight: "clamp",
  });

  // Subtle pulse on the gradient background
  const bgPulse = interpolate(frame, [0, 75, 150], [0, 0.05, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #111827 0%, #1f2937 ${50 + bgPulse * 100}%, #111827 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px",
      }}
    >
      {/* Gradient accent circle behind logo */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)",
          top: "25%",
          opacity: logoOpacity,
        }}
      />

      {/* Logo */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        {/* Logo Image */}
        <img
          src="/images/logo.png"
          alt="EV Strategy Hub"
          style={{
            width: 300,
            height: 'auto',
            filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.3))',
            marginBottom: 30,
          }}
        />

        {/* Brand name */}
        <span
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "white",
            fontFamily: "Montserrat, sans-serif",
            letterSpacing: "-2px",
            lineHeight: 1,
          }}
        >
          EV Strategy
        </span>
        <span
          style={{
            fontSize: 72,
            fontWeight: 800,
            background: "linear-gradient(90deg, #10b981, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "Montserrat, sans-serif",
            letterSpacing: "-2px",
            lineHeight: 1.2,
          }}
        >
          Hub
        </span>
      </div>

      {/* Decorative line */}
      <div
        style={{
          width: lineWidth,
          height: 4,
          background: "linear-gradient(90deg, #10b981, #3b82f6)",
          borderRadius: 2,
          marginBottom: 40,
        }}
      />

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px",
            marginBottom: 16,
          }}
        >
          {words.map((word, i) => {
            const wordOpacity = interpolate(
              frame,
              [30 + i * 8, 38 + i * 8],
              [0, 1],
              { extrapolateRight: "clamp" },
            );
            return (
              <span
                key={i}
                style={{
                  fontSize: 42,
                  color: "#9ca3af",
                  fontFamily: "Open Sans, sans-serif",
                  fontWeight: 600,
                  opacity: wordOpacity,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "14px",
          }}
        >
          {highlightWords.map((word, i) => {
            const wordOpacity = interpolate(
              frame,
              [55 + i * 12, 65 + i * 12],
              [0, 1],
              { extrapolateRight: "clamp" },
            );
            const wordScale = spring({
              frame: frame - 55 - i * 12,
              fps,
              from: 0.8,
              to: 1,
              config: { damping: 10, stiffness: 120 },
            });
            return (
              <span
                key={i}
                style={{
                  fontSize: 52,
                  fontWeight: 800,
                  color: "#10b981",
                  fontFamily: "Montserrat, sans-serif",
                  opacity: wordOpacity,
                  transform: `scale(${wordScale})`,
                  display: "inline-block",
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>

      {/* Bottom sports badges */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          display: "flex",
          gap: 20,
        }}
      >
        {["NFL", "NBA", "FUTBOL"].map((sport, i) => {
          const badgeOpacity = interpolate(
            frame,
            [80 + i * 10, 95 + i * 10],
            [0, 1],
            { extrapolateRight: "clamp" },
          );
          const badgeY = interpolate(
            frame,
            [80 + i * 10, 95 + i * 10],
            [20, 0],
            { extrapolateRight: "clamp" },
          );
          return (
            <div
              key={sport}
              style={{
                opacity: badgeOpacity,
                transform: `translateY(${badgeY}px)`,
                padding: "12px 28px",
                borderRadius: 50,
                border: "2px solid rgba(16,185,129,0.4)",
                backgroundColor: "rgba(16,185,129,0.1)",
              }}
            >
              <span
                style={{
                  color: "#10b981",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 700,
                  fontSize: 28,
                }}
              >
                {sport}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
