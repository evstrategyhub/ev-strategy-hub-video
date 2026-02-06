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
  positionGold: "#facc15",
  positionSilver: "#d1d5db",
  positionBronze: "#fb923c",
};

// Discord SVG icon
const DiscordIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 28,
  color = COLORS.discordBlue,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
  </svg>
);

const getPositionColor = (position: number): string => {
  if (position === 1) return COLORS.positionGold;
  if (position === 2) return COLORS.positionSilver;
  if (position === 3) return COLORS.positionBronze;
  return COLORS.textTertiary;
};

const getMedal = (position: number): string => {
  if (position === 1) return "🥇";
  if (position === 2) return "🥈";
  if (position === 3) return "🥉";
  return "";
};

interface LeaderboardUser {
  position: number;
  username: string;
  profit: number;
  record: string;
  isCurrentUser?: boolean;
}

interface DiscordMessageData {
  user: string;
  text: string;
}

interface PrizeBreakdown {
  first: number;
  second: number;
  third: number;
}

interface CommunityShowcaseProps {
  prizePool?: number;
  prizes?: PrizeBreakdown;
  leaderboard?: LeaderboardUser[];
  discord?: {
    members: number;
    messages: DiscordMessageData[];
  };
}

// Podium component for top 3
const Podium: React.FC<{
  leaderboard: LeaderboardUser[];
  delay: number;
}> = ({ leaderboard, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const top3 = leaderboard.filter((u) => u.position <= 3);
  const first = top3.find((u) => u.position === 1);
  const second = top3.find((u) => u.position === 2);
  const third = top3.find((u) => u.position === 3);

  const podiumOrder = [second, first, third];
  const heights = [120, 160, 90];
  const medals = ["🥈", "🥇", "🥉"];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 12,
        marginBottom: 20,
      }}
    >
      {podiumOrder.map((user, index) => {
        if (!user) return null;
        const itemDelay = delay + index * 10;

        const opacity = interpolate(frame, [itemDelay, itemDelay + 20], [0, 1], {
          extrapolateRight: "clamp",
          extrapolateLeft: "clamp",
        });

        const slideY = interpolate(frame, [itemDelay, itemDelay + 25], [30, 0], {
          extrapolateRight: "clamp",
          extrapolateLeft: "clamp",
        });

        const scale = spring({
          frame: frame - itemDelay,
          fps,
          from: 0.8,
          to: 1,
          config: { damping: 12, stiffness: 100 },
        });

        const posColor = getPositionColor(user.position);

        return (
          <div
            key={user.position}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity,
              transform: `translateY(${slideY}px) scale(${scale})`,
            }}
          >
            {/* Medal */}
            <span style={{ fontSize: 32, marginBottom: 8 }}>{medals[index]}</span>

            {/* Username */}
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: COLORS.textPrimary,
                fontFamily: "Montserrat, sans-serif",
                marginBottom: 4,
              }}
            >
              {user.username}
            </span>

            {/* Profit */}
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: COLORS.textYellow,
                fontFamily: "Montserrat, sans-serif",
                marginBottom: 8,
              }}
            >
              +${user.profit}
            </span>

            {/* Podium bar */}
            <div
              style={{
                width: 100,
                height: heights[index],
                backgroundColor: posColor,
                borderRadius: "8px 8px 0 0",
                opacity: 0.3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: posColor,
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                {user.position}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Leaderboard row (for positions 4+)
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
        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: COLORS.textTertiary,
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
const DiscordMsg: React.FC<{
  message: DiscordMessageData;
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
  prizes = { first: 2500, second: 1500, third: 1000 },
  leaderboard = [
    { position: 1, username: "ElProMX", profit: 687, record: "28-9" },
    { position: 2, username: "ValueHunter", profit: 598, record: "24-10" },
    { position: 3, username: "RodrigoEV", profit: 512, record: "21-11", isCurrentUser: true },
    { position: 4, username: "SharpBettor", profit: 487, record: "20-12" },
  ],
  discord = {
    members: 2847,
    messages: [
      { user: "ElProMX", text: "América vs Guadalajara: veo EV+ en Ganador local" },
      { user: "ValueHunter", text: "Barcelona-Madrid, Ambos Anotan a 2.45 tiene valor" },
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

  // Leaderboard rows for positions 4+
  const remainingUsers = leaderboard.filter((u) => u.position > 3);

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
            🏆 LEADERBOARD 2026
          </h2>
          <p
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: COLORS.textYellow,
              fontFamily: "Montserrat, sans-serif",
              margin: 0,
              marginBottom: 4,
            }}
          >
            ${prizePool.toLocaleString()} MXN en premios
          </p>
          <p
            style={{
              fontSize: 13,
              color: COLORS.textTertiary,
              fontFamily: "Open Sans, sans-serif",
              margin: 0,
            }}
          >
            1ro: ${prizes.first.toLocaleString()} | 2do: ${prizes.second.toLocaleString()} | 3ro: ${prizes.third.toLocaleString()}
          </p>
        </div>

        {/* Podium for top 3 */}
        <Podium leaderboard={leaderboard} delay={15} />

        {/* Remaining rankings (4+) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {remainingUsers.map((user, index) => (
            <LeaderboardRow
              key={user.position}
              user={user}
              delay={45 + index * 10}
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
            <DiscordIcon size={28} color={COLORS.discordBlue} />
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
            <DiscordMsg
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
