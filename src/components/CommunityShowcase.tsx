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
  bgCurrentUser: "rgba(34, 197, 94, 0.15)",
  borderDefault: "#374151",
  borderHighlight: "#22c55e",
  textPrimary: "#ffffff",
  textSecondary: "#d1d5db",
  textTertiary: "#9ca3af",
  textPositive: "#22c55e",
  textYellow: "#facc15",
  discordBlue: "#5865F2",
};

interface LeaderboardUser {
  position: number;
  username: string;
  profit: number;
  record: string;
  isCurrentUser?: boolean;
}

interface DiscordMessage {
  user: string;
  text: string;
}

interface CommunityShowcaseProps {
  prizePool?: number;
  leaderboard?: LeaderboardUser[];
  discord?: {
    members: number;
    messages: DiscordMessage[];
  };
}

const getMedal = (position: number): string => {
  if (position === 1) return "🥇";
  if (position === 2) return "🥈";
  if (position === 3) return "🥉";
  return "";
};

// Leaderboard row
const LeaderboardRow: React.FC<{
  user: LeaderboardUser;
  delay: number;
}> = ({ user, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const slideX = interpolate(frame, [delay, delay + 20], [40, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const scale = spring({
    frame: frame - delay,
    fps,
    from: 0.95,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // Glow animation for current user
  const glowIntensity = user.isCurrentUser
    ? interpolate(
        frame,
        [delay + 20, delay + 40, delay + 60, delay + 80],
        [0.3, 0.6, 0.3, 0.6],
        { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
      )
    : 0;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 16px",
        borderRadius: 10,
        backgroundColor: user.isCurrentUser ? COLORS.bgCurrentUser : COLORS.bgSection,
        border: user.isCurrentUser
          ? `2px solid ${COLORS.borderHighlight}`
          : `1px solid ${COLORS.borderDefault}`,
        opacity,
        transform: `translateX(${slideX}px) scale(${scale})`,
        boxShadow: user.isCurrentUser
          ? `0 0 20px rgba(34, 197, 94, ${glowIntensity})`
          : "none",
      }}
    >
      {/* Left side */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 24, width: 30 }}>{getMedal(user.position)}</span>
        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: COLORS.textPositive,
            fontFamily: "Montserrat, sans-serif",
            width: 40,
          }}
        >
          #{user.position}
        </span>
        <span
          style={{
            fontSize: 16,
            fontWeight: 500,
            color: COLORS.textPrimary,
            fontFamily: "Open Sans, sans-serif",
          }}
        >
          {user.username}
        </span>
        {user.isCurrentUser && (
          <span
            style={{
              backgroundColor: COLORS.textPositive,
              color: COLORS.textPrimary,
              padding: "4px 10px",
              borderRadius: 4,
              fontSize: 12,
              fontWeight: 700,
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            TÚ
          </span>
        )}
      </div>

      {/* Right side */}
      <div style={{ textAlign: "right" }}>
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: COLORS.textYellow,
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          +${user.profit}
        </div>
        <div
          style={{
            fontSize: 13,
            color: COLORS.textTertiary,
            fontFamily: "Open Sans, sans-serif",
          }}
        >
          {user.record}
        </div>
      </div>
    </div>
  );
};

// Discord message with typing animation
const DiscordMessage: React.FC<{
  message: DiscordMessage;
  delay: number;
}> = ({ message, delay }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const slideY = interpolate(frame, [delay, delay + 20], [15, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Typing dots animation
  const dotOpacity1 = interpolate(
    (frame - delay) % 30,
    [0, 10, 20, 30],
    [0.3, 1, 0.3, 0.3],
    { extrapolateRight: "clamp" }
  );
  const dotOpacity2 = interpolate(
    (frame - delay) % 30,
    [0, 10, 20, 30],
    [0.3, 0.3, 1, 0.3],
    { extrapolateRight: "clamp" }
  );
  const dotOpacity3 = interpolate(
    (frame - delay) % 30,
    [0, 10, 20, 30],
    [0.3, 0.3, 0.3, 1],
    { extrapolateRight: "clamp" }
  );

  // Show full message after delay
  const showFullMessage = frame > delay + 25;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        opacity,
        transform: `translateY(${slideY}px)`,
      }}
    >
      {/* Avatar placeholder */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          backgroundColor: COLORS.discordBlue,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          fontWeight: 700,
          color: COLORS.textPrimary,
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        {message.user.charAt(0).toUpperCase()}
      </div>

      <div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: COLORS.discordBlue,
            fontFamily: "Open Sans, sans-serif",
            marginBottom: 4,
          }}
        >
          {message.user}
        </div>
        <div
          style={{
            fontSize: 14,
            color: COLORS.textSecondary,
            fontFamily: "Open Sans, sans-serif",
          }}
        >
          {showFullMessage ? (
            message.text
          ) : (
            <span>
              <span style={{ opacity: dotOpacity1 }}>●</span>
              <span style={{ opacity: dotOpacity2 }}> ●</span>
              <span style={{ opacity: dotOpacity3 }}> ●</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const CommunityShowcase: React.FC<CommunityShowcaseProps> = ({
  prizePool = 5000,
  leaderboard = [
    { position: 1, username: "ElProMX", profit: 687, record: "28-9" },
    { position: 2, username: "ValueHunter", profit: 598, record: "24-10" },
    { position: 3, username: "RodrigoEV", profit: 512, record: "21-11", isCurrentUser: true },
    { position: 4, username: "SharpBettor", profit: 487, record: "20-12" },
  ],
  discord = {
    members: 2847,
    messages: [
      { user: "ElProMX", text: "¿Análisis del Chiefs para hoy?" },
      { user: "ValueHunter", text: "Yo veo value en Over 2.5..." },
    ],
  },
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Leaderboard header animation
  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const headerY = interpolate(frame, [0, 20], [-20, 0], {
    extrapolateRight: "clamp",
  });

  const headerScale = spring({
    frame,
    fps,
    from: 0.9,
    to: 1,
    config: { damping: 15, stiffness: 80 },
  });

  // Discord section animation
  const discordDelay = 55;
  const discordOpacity = interpolate(
    frame,
    [discordDelay, discordDelay + 25],
    [0, 1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  const discordY = interpolate(
    frame,
    [discordDelay, discordDelay + 30],
    [50, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  const discordScale = spring({
    frame: frame - discordDelay,
    fps,
    from: 0.9,
    to: 1,
    config: { damping: 12, stiffness: 80 },
  });

  // Animated member count
  const animatedMembers = Math.round(
    interpolate(frame, [discordDelay + 10, discordDelay + 40], [0, discord.members], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    })
  );

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 700,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* Leaderboard Section */}
      <div
        style={{
          backgroundColor: COLORS.bgCard,
          borderRadius: 16,
          border: `1px solid ${COLORS.borderDefault}`,
          padding: 24,
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 20,
            opacity: headerOpacity,
            transform: `translateY(${headerY}px) scale(${headerScale})`,
          }}
        >
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: COLORS.textPrimary,
              fontFamily: "Montserrat, sans-serif",
              margin: 0,
              marginBottom: 8,
            }}
          >
            🎮 LEADERBOARD 2025
          </h2>
          <p
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: COLORS.textYellow,
              fontFamily: "Montserrat, sans-serif",
              margin: 0,
            }}
          >
            ${prizePool.toLocaleString()} MXN en premios
          </p>
        </div>

        {/* Rankings */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {leaderboard.map((user, index) => (
            <LeaderboardRow
              key={user.position}
              user={user}
              delay={15 + index * 10}
            />
          ))}
        </div>
      </div>

      {/* Discord Section */}
      <div
        style={{
          backgroundColor: COLORS.bgCard,
          borderRadius: 16,
          border: `1px solid ${COLORS.borderDefault}`,
          padding: 24,
          opacity: discordOpacity,
          transform: `translateY(${discordY}px) scale(${discordScale})`,
        }}
      >
        {/* Discord header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>💬</span>
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: COLORS.textPrimary,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              DISCORD
            </span>
          </div>
          <div
            style={{
              backgroundColor: COLORS.discordBlue,
              padding: "8px 16px",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: COLORS.textPositive,
              }}
            />
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: COLORS.textPrimary,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              {animatedMembers.toLocaleString()} miembros
            </span>
          </div>
        </div>

        {/* Messages */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {discord.messages.map((message, index) => (
            <DiscordMessage
              key={index}
              message={message}
              delay={discordDelay + 25 + index * 20}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
