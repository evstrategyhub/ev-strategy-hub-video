import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { DashboardStats } from "../components";

const COLORS = {
  bgPrimary: "#111827",
};

export const DashboardStatsComposition: React.FC = () => {
  const frame = useCurrentFrame();

  const entryOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const entryY = interpolate(frame, [0, 20], [30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgPrimary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 30px",
        opacity: entryOpacity,
        transform: `translateY(${entryY}px)`,
      }}
    >
      <DashboardStats />
    </AbsoluteFill>
  );
};
