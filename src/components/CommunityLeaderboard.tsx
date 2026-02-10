import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing, spring } from 'remotion';

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

const COLORS = {
  bgCard: '#1f2937',
  bgSection: '#374151',
  bgCurrentUser: 'rgba(20, 83, 45, 0.2)',
  bgBanner: 'linear-gradient(90deg, #ca8a04, #f59e0b)',
  borderDefault: '#4b5563',
  borderBanner: '#facc15',
  borderHighlight: '#22c55e',
  textPrimary: '#ffffff',
  textSecondary: '#d1d5db',
  textTertiary: '#9ca3af',
  textYellow: '#facc15',
  textPositive: '#22c55e',
  positionGold: '#facc15',
  positionSilver: '#d1d5db',
  positionBronze: '#fb923c',
  badgeGreen: '#22c55e',
};

const getMedal = (position: number): string => {
  if (position === 1) return '🥇';
  if (position === 2) return '🥈';
  if (position === 3) return '🥉';
  return '';
};

const getPositionColor = (position: number): string => {
  if (position === 1) return COLORS.positionGold;
  if (position === 2) return COLORS.positionSilver;
  if (position === 3) return COLORS.positionBronze;
  return COLORS.textPositive;
};

const RankingRow: React.FC<{ user: RankingUser; delay: number }> = ({ user, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const slideX = interpolate(frame, [delay, delay + 15], [-40, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  const scale = spring({
    frame: frame - delay,
    fps,
    from: 0.95,
    to: 1,
    config: { damping: 15, stiffness: 100 },
  });

  const posColor = getPositionColor(user.position);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        borderRadius: 8,
        marginBottom: 8,
        border: user.isCurrentUser
          ? `2px solid ${COLORS.borderHighlight}`
          : `1px solid ${COLORS.borderDefault}`,
        backgroundColor: user.isCurrentUser ? COLORS.bgCurrentUser : 'rgba(55, 65, 81, 0.5)',
        opacity,
        transform: `translateX(${slideX}px) scale(${scale})`,
      }}
    >
      {/* Left side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Medal */}
        <span style={{ fontSize: 26, width: 36, textAlign: 'center' }}>
          {getMedal(user.position)}
        </span>
        {/* Position */}
        <span
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: posColor,
            fontFamily: 'Montserrat, sans-serif',
            width: 44,
          }}
        >
          #{user.position}
        </span>
        {/* Username */}
        <span
          style={{
            fontSize: 18,
            fontWeight: 500,
            color: COLORS.textPrimary,
            fontFamily: 'Open Sans, sans-serif',
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
              padding: '6px 12px',
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 700,
              fontFamily: 'Montserrat, sans-serif',
              marginLeft: 8,
            }}
          >
            TÚ
          </span>
        )}
      </div>

      {/* Right side */}
      <div style={{ textAlign: 'right' }}>
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: COLORS.textYellow,
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          {user.points} pts
        </div>
        <div
          style={{
            fontSize: 16,
            color: COLORS.textTertiary,
            fontFamily: 'Open Sans, sans-serif',
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
    { position: 1, username: 'ElProMX', points: 687.5, wins: 28, losses: 9 },
    { position: 2, username: 'ValueHunter', points: 598.3, wins: 24, losses: 10 },
    {
      position: 3,
      username: 'RodrigoGarcia',
      points: 512.8,
      wins: 21,
      losses: 11,
      isCurrentUser: true,
    },
    { position: 4, username: 'BetMaster99', points: 478.2, wins: 19, losses: 12 },
    { position: 5, username: 'SharpBettor', points: 445.6, wins: 18, losses: 11 },
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header banner animation
  const bannerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
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
  const userCardOpacity = interpolate(frame, [userCardDelay, userCardDelay + 20], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const userCardY = interpolate(frame, [userCardDelay, userCardDelay + 25], [30, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Rankings table animation
  const tableDelay = 45;
  const tableOpacity = interpolate(frame, [tableDelay, tableDelay + 20], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 1020,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      {/* Prize Pool Banner */}
      <div
        style={{
          background: COLORS.bgBanner,
          borderRadius: 12,
          border: `2px solid ${COLORS.borderBanner}`,
          padding: 24,
          textAlign: 'center',
          opacity: bannerOpacity,
          transform: `scale(${bannerScale})`,
        }}
      >
        <h3
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: COLORS.textPrimary,
            fontFamily: 'Montserrat, sans-serif',
            marginBottom: 12,
          }}
        >
          ${prizePool.toLocaleString()} MXN en premios
        </h3>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
            fontSize: 20,
            marginBottom: 12,
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          <span style={{ color: COLORS.textYellow }}>🥇 $2,500</span>
          <span style={{ color: COLORS.textSecondary }}>🥈 $1,500</span>
          <span style={{ color: COLORS.positionBronze }}>🥉 $1,000</span>
        </div>
        <p
          style={{
            fontSize: 18,
            color: COLORS.textPrimary,
            fontFamily: 'Open Sans, sans-serif',
          }}
        >
          ⏰ {daysRemaining} días restantes
        </p>
      </div>

      {/* Current User Card */}
      <div
        style={{
          backgroundColor: COLORS.bgCard,
          borderRadius: 12,
          border: `2px solid ${COLORS.borderHighlight}`,
          padding: 24,
          opacity: userCardOpacity,
          transform: `translateY(${userCardY}px)`,
        }}
      >
        <h4
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: COLORS.textSecondary,
            fontFamily: 'Montserrat, sans-serif',
            marginBottom: 16,
          }}
        >
          Tu Posición
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {/* Ranking */}
          <div style={{ textAlign: 'center', backgroundColor: COLORS.bgSection, padding: 12, borderRadius: 8 }}>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: getPositionColor(currentUser.ranking),
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              #{currentUser.ranking} {getMedal(currentUser.ranking)}
            </div>
            <div
              style={{
                fontSize: 14,
                color: COLORS.textTertiary,
                fontFamily: 'Open Sans, sans-serif',
                marginTop: 4,
              }}
            >
              Ranking
            </div>
          </div>

          {/* Points */}
          <div style={{ textAlign: 'center', backgroundColor: COLORS.bgSection, padding: 12, borderRadius: 8 }}>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: COLORS.textYellow,
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              {currentUser.points}
            </div>
            <div
              style={{
                fontSize: 14,
                color: COLORS.textTertiary,
                fontFamily: 'Open Sans, sans-serif',
                marginTop: 4,
              }}
            >
              Puntos
            </div>
          </div>

          {/* W-L */}
          <div style={{ textAlign: 'center', backgroundColor: COLORS.bgSection, padding: 12, borderRadius: 8 }}>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: COLORS.textPositive,
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              {currentUser.wins}-{currentUser.losses}
            </div>
            <div
              style={{
                fontSize: 14,
                color: COLORS.textTertiary,
                fontFamily: 'Open Sans, sans-serif',
                marginTop: 4,
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
          padding: 24,
          opacity: tableOpacity,
        }}
      >
        <h4
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: COLORS.textPrimary,
            fontFamily: 'Montserrat, sans-serif',
            marginBottom: 20,
          }}
        >
          🏆 Top 5 Leaderboard
        </h4>

        {rankings.map((user, index) => (
          <RankingRow key={user.position} user={user} delay={tableDelay + 20 + index * 8} />
        ))}
      </div>
    </div>
  );
};