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
  bgCurrentUser: "rgba(20, 83, 45, 0.2)",
  borderDefault: "#374151",
  borderRow: "#4b5563",
  borderHighlight: "#22c55e",
  textPrimary: "#ffffff",
  textSecondary: "#d1d5db",
  textTertiary: "#9ca3af",
  textPositive: "#22c55e",
  textYellow: "#facc15",
  badgeGreen: "#22c55e",
  positionGold: "#facc15",
  positionSilver: "#d1d5db",
  positionBronze: "#fb923c",
};

interface RankingUser {
  position: number;
  username: string;
  points: number;
  wins: number;
  losses: number;
  isCurrentUser?: boolean;
}

interface CommunityLeaderboardProps {
  prizePool?: number;
  daysRemaining?: number;
  currentUser?: {
    ranking: number;
    points: number;
    wins: number;
    losses: number;
  };
  rankings?: RankingUser[];
}

const getMedal = (position: number): string => {
  if (position === 1) return "🥇";
  if (position === 2) return "🥈";
  if (position === 3) return "🥉";
  return "";
};

const getPositionColor = (position: number): string => {
  if (position === 1) return COLORS.positionGold;
  if (position === 2) return COLORS.positionSilver;
  if (position === 3) return COLORS.positionBronze;
  return COLORS.textPositive;
};

const CTASection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ctaDelay = 100;

  // CTA opacity
  const ctaOpacity = interpolate(frame, [ctaDelay, ctaDelay + 20], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // CTA scale with spring
  const ctaScale = spring({
    frame: frame - ctaDelay,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 10, stiffness: 80 },
  });

  // Button pulse animation
  const pulse = interpolate(
    frame,
    [ctaDelay + 30, ctaDelay + 45, ctaDelay + 60, ctaDelay + 75],
    [1, 1.03, 1, 1.03],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // URL fade in
  const urlOpacity = interpolate(frame, [ctaDelay + 25, ctaDelay + 40], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        marginTop: 16,
        opacity: ctaOpacity,
        transform: `scale(${ctaScale})`,
      }}
    >
      {/* CTA Button */}
      <div
        style={{
          background: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
          borderRadius: 60,
          padding: "20px 50px",
          boxShadow: "0 20px 60px rgba(16,185,129,0.3)",
          transform: `scale(${pulse})`,
        }}
      >
        <span
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: COLORS.textPrimary,
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          ÚNETE AHORA
        </span>
      </div>

      {/* URL */}
      <div style={{ opacity: urlOpacity }}>
        <span
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#10b981",
            fontFamily: "Montserrat, sans-serif",
            letterSpacing: 1,
          }}
        >
          evstrategyhub.com
        </span>
      </div>
    </div>
  );
};

const RankingRow: React.FC<{
  user: RankingUser;
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

  const posColor = getPositionColor(user.position);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        borderRadius: 12,
        border: user.isCurrentUser
          ? `2px solid ${COLORS.borderHighlight}`
          : `1px solid ${COLORS.borderRow}`,
        backgroundColor: user.isCurrentUser
          ? COLORS.bgCurrentUser
          : "rgba(55, 65, 81, 0.5)",
        opacity,
        transform: `translateX(${slideX}px) scale(${scale})`,
      }}
    >
      {/* Left side */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Medal */}
        <span style={{ fontSize: 32, width: 40, textAlign: "center" }}>
          {getMedal(user.position)}
        </span>
        {/* Position */}
        <span
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: posColor,
            fontFamily: "Montserrat, sans-serif",
            width: 50,
          }}
        >
          #{user.position}
        </span>
        {/* Username */}
        <span
          style={{
            fontSize: 22,
            fontWeight: 500,
            color: COLORS.textPrimary,
            fontFamily: "Open Sans, sans-serif",
          }}
        >
          {user.username}
        </span>
        {/* Current user badge */}
        {user.isCurrentUser && (
          <span
            style={{
              backgroundColor: COLORS.badgeGreen,
              color: COLORS.textPrimary,
              padding: "6px 12px",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "Montserrat, sans-serif",
              marginLeft: 8,
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
            fontSize: 22,
            fontWeight: 700,
            color: COLORS.textYellow,
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          {user.points} pts
        </div>
        <div
          style={{
            fontSize: 16,
            color: COLORS.textTertiary,
            fontFamily: "Open Sans, sans-serif",
          }}
        >
          {user.wins}W-{user.losses}L
        </div>
      </div>
    </div>
  );
};

export const CommunityLeaderboard: React.FC<CommunityLeaderboardProps> = ({
  prizePool = 5000,
  daysRemaining = 12,
  currentUser = {
    ranking: 3,
    points: 512.8,
    wins: 21,
    losses: 11,
  },
  rankings = [
    { position: 1, username: "ElProMX", points: 687.5, wins: 28, losses: 9 },
    { position: 2, username: "ValueHunter", points: 598.3, wins: 24, losses: 10 },
    {
      position: 3,
      username: "RodrigoGarcia",
      points: 512.8,
      wins: 21,
      losses: 11,
      isCurrentUser: true,
    },
    { position: 4, username: "BetMaster99", points: 478.2, wins: 19, losses: 12 },
    { position: 5, username: "SharpBettor", points: 445.6, wins: 18, losses: 11 },
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header banner animation
  const bannerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const bannerScale = spring({
    frame,
    fps,
    from: 0.9,
    to: 1,
    config: { damping: 15, stiffness: 80 },
  });

  // User position card animation
  const userCardDelay = 20;
  const userCardOpacity = interpolate(
    frame,
    [userCardDelay, userCardDelay + 20],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  const userCardY = interpolate(
    frame,
    [userCardDelay, userCardDelay + 25],
    [30, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // Rankings table animation
  const tableDelay = 45;
  const tableOpacity = interpolate(
    frame,
    [tableDelay, tableDelay + 20],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 900,
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {/* Header Banner */}
      <div
        style={{
          backgroundColor: COLORS.bgCard,
          borderRadius: 12,
          border: `1px solid ${COLORS.borderDefault}`,
          padding: 32,
          textAlign: "center",
          opacity: bannerOpacity,
          transform: `scale(${bannerScale})`,
        }}
      >
        <h1
          style={{
            fontSize: 38,
            fontWeight: 700,
            color: COLORS.textPrimary,
            fontFamily: "Montserrat, sans-serif",
            margin: 0,
            marginBottom: 12,
          }}
        >
          🏆 Community Leaderboard
        </h1>
        <p
          style={{
            fontSize: 20,
            color: COLORS.textSecondary,
            fontFamily: "Open Sans, sans-serif",
            margin: 0,
            marginBottom: 12,
          }}
        >
          Competencia mensual • {daysRemaining} días restantes
        </p>
        <p
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: COLORS.textYellow,
            fontFamily: "Montserrat, sans-serif",
            margin: 0,
          }}
        >
          ${prizePool.toLocaleString()} MXN en premios
        </p>
      </div>

      {/* User Position Card */}
      <div
        style={{
          backgroundColor: COLORS.bgCard,
          borderRadius: 12,
          border: `2px solid ${COLORS.borderHighlight}`,
          padding: 28,
          opacity: userCardOpacity,
          transform: `translateY(${userCardY}px)`,
        }}
      >
        <h3
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: COLORS.textPrimary,
            fontFamily: "Montserrat, sans-serif",
            margin: 0,
            marginBottom: 20,
          }}
        >
          Mi Posición
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          <div
            style={{
              textAlign: "center",
              backgroundColor: COLORS.bgSection,
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: COLORS.textPositive,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              #{currentUser.ranking}
            </div>
            <div
              style={{
                fontSize: 18,
                color: COLORS.textTertiary,
                fontFamily: "Open Sans, sans-serif",
                marginTop: 8,
              }}
            >
              Ranking
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              backgroundColor: COLORS.bgSection,
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: COLORS.textYellow,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              {currentUser.points}
            </div>
            <div
              style={{
                fontSize: 18,
                color: COLORS.textTertiary,
                fontFamily: "Open Sans, sans-serif",
                marginTop: 8,
              }}
            >
              Puntos
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              backgroundColor: COLORS.bgSection,
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: COLORS.textPositive,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              {currentUser.wins}-{currentUser.losses}
            </div>
            <div
              style={{
                fontSize: 18,
                color: COLORS.textTertiary,
                fontFamily: "Open Sans, sans-serif",
                marginTop: 8,
              }}
            >
              W-L
            </div>
          </div>
        </div>
      </div>

      {/* Rankings Table */}
      <div
        style={{
          backgroundColor: COLORS.bgCard,
          borderRadius: 12,
          border: `1px solid ${COLORS.borderDefault}`,
          padding: 28,
          opacity: tableOpacity,
        }}
      >
        <h3
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: COLORS.textPrimary,
            fontFamily: "Montserrat, sans-serif",
            margin: 0,
            marginBottom: 20,
          }}
        >
          Top 5 del Mes
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {rankings.map((user, index) => (
            <RankingRow
              key={user.position}
              user={user}
              delay={tableDelay + 10 + index * 8}
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};
