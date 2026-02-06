import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type TabId = "analisis" | "ev-picks" | "estrategia" | "bankroll" | "community";

interface AppShellProps {
  children: React.ReactNode;
  activeTab: TabId;
}

const COLORS = {
  bg: "#111827",
  border: "#1f2937",
  borderHeader: "#374151",
  activeTab: "#22c55e",
  inactiveTab: "#9ca3af",
  white: "#ffffff",
  avatarBg: "#16a34a",
};

/* ------------------------------------------------------------------ */
/*  SVG Icons for each tab (inline, no external deps)                 */
/* ------------------------------------------------------------------ */

const IconAnalisis: React.FC<{ color: string }> = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="14" width="4" height="7" rx="1" fill={color} />
    <rect x="10" y="9" width="4" height="12" rx="1" fill={color} />
    <rect x="17" y="4" width="4" height="17" rx="1" fill={color} />
  </svg>
);

const IconEVPicks: React.FC<{ color: string }> = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z"
      fill={color}
    />
  </svg>
);

const IconEstrategia: React.FC<{ color: string }> = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94L6.7 20.2a2.12 2.12 0 0 1-3-3l6.83-6.83a6 6 0 0 1 7.94-7.94L14.7 6.3Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const IconBankroll: React.FC<{ color: string }> = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <polyline
      points="4 18 8 14 12 16 16 10 20 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="16 6 20 6 20 10"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconCommunity: React.FC<{ color: string }> = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="7" r="3" stroke={color} strokeWidth="2" />
    <path
      d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="17" cy="9" r="2.5" stroke={color} strokeWidth="1.8" />
    <path
      d="M17 14.5c2.21 0 4 1.34 4 3v1.5"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const TAB_CONFIG: { id: TabId; label: string; Icon: React.FC<{ color: string }> }[] = [
  { id: "analisis", label: "Análisis", Icon: IconAnalisis },
  { id: "ev-picks", label: "EV Picks", Icon: IconEVPicks },
  { id: "estrategia", label: "Estrategia", Icon: IconEstrategia },
  { id: "bankroll", label: "Bankroll", Icon: IconBankroll },
  { id: "community", label: "Community", Icon: IconCommunity },
];

/* ------------------------------------------------------------------ */
/*  Logo icon (small green chart SVG)                                  */
/* ------------------------------------------------------------------ */

const LogoIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: 8 }}>
    <polyline
      points="4 16 8 12 12 14 16 8 20 4"
      stroke="#22c55e"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="20" cy="4" r="2" fill="#22c55e" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Status Bar (iPhone-style)                                          */
/* ------------------------------------------------------------------ */

const StatusBar: React.FC = () => (
  <div
    style={{
      height: 44,
      backgroundColor: COLORS.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
      flexShrink: 0,
    }}
  >
    <span
      style={{
        color: COLORS.white,
        fontSize: 14,
        fontFamily: "Montserrat, sans-serif",
        fontWeight: 600,
      }}
    >
      9:41
    </span>
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {/* Signal bars */}
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
        <rect x="0" y="8" width="3" height="4" rx="0.5" fill={COLORS.white} />
        <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill={COLORS.white} />
        <rect x="9" y="2" width="3" height="10" rx="0.5" fill={COLORS.white} />
        <rect x="13" y="0" width="3" height="12" rx="0.5" fill={COLORS.white} />
      </svg>
      {/* WiFi */}
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
        <path d="M8 10.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" fill={COLORS.white} />
        <path
          d="M4.5 8.5C5.5 7.2 6.7 6.5 8 6.5s2.5.7 3.5 2"
          stroke={COLORS.white}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M2 5.5C3.8 3.5 5.8 2.5 8 2.5s4.2 1 6 3"
          stroke={COLORS.white}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      {/* Battery */}
      <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
        <rect
          x="0.5"
          y="0.5"
          width="22"
          height="11"
          rx="2"
          stroke={COLORS.white}
          strokeWidth="1"
        />
        <rect x="2" y="2" width="18" height="8" rx="1" fill={COLORS.white} />
        <rect x="23.5" y="3.5" width="2" height="5" rx="1" fill={COLORS.white} />
      </svg>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */

const Header: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div
    style={{
      backgroundColor: COLORS.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 16px",
      borderBottom: `1px solid ${COLORS.borderHeader}`,
      flexShrink: 0,
      opacity,
    }}
  >
    <div style={{ display: "flex", alignItems: "center" }}>
      <LogoIcon />
      <span
        style={{
          color: COLORS.white,
          fontSize: 17,
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 700,
          letterSpacing: -0.3,
        }}
      >
        EV Strategy Hub
      </span>
    </div>
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        backgroundColor: COLORS.avatarBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          color: COLORS.white,
          fontSize: 13,
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 700,
        }}
      >
        RG
      </span>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Footer (bottom nav)                                                */
/* ------------------------------------------------------------------ */

const Footer: React.FC<{ activeTab: TabId; opacity: number }> = ({
  activeTab,
  opacity,
}) => (
  <div
    style={{
      height: 60,
      backgroundColor: COLORS.bg,
      borderTop: `1px solid ${COLORS.border}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      padding: "0 4px",
      flexShrink: 0,
      opacity,
    }}
  >
    {TAB_CONFIG.map(({ id, label, Icon }) => {
      const isActive = id === activeTab;
      const color = isActive ? COLORS.activeTab : COLORS.inactiveTab;
      return (
        <div
          key={id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            flex: 1,
          }}
        >
          <Icon color={color} />
          <span
            style={{
              color,
              fontSize: 10,
              fontFamily: "Montserrat, sans-serif",
              fontWeight: isActive ? 600 : 400,
              lineHeight: 1,
            }}
          >
            {label}
          </span>
        </div>
      );
    })}
  </div>
);

/* ------------------------------------------------------------------ */
/*  AppShell                                                           */
/* ------------------------------------------------------------------ */

export const AppShell: React.FC<AppShellProps> = ({ children, activeTab }) => {
  const frame = useCurrentFrame();

  // StatusBar: visible immediately (frame 0)
  // Header: fade in frames 0-10
  const headerOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Footer: fade in frames 5-15
  const footerOpacity = interpolate(frame, [5, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Content: fade + translateY(20→0) frames 10-30
  const contentOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const contentY = interpolate(frame, [10, 30], [20, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Status Bar */}
      <StatusBar />

      {/* Header */}
      <Header opacity={headerOpacity} />

      {/* Content */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          backgroundColor: COLORS.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: contentOpacity,
          transform: `translateY(${contentY}px)`,
        }}
      >
        {children}
      </div>

      {/* Footer */}
      <Footer activeTab={activeTab} opacity={footerOpacity} />
    </AbsoluteFill>
  );
};
