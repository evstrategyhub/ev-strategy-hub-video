import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { CommunityLeaderboard } from "../components/CommunityLeaderboard";

export const Scene6Community: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade in animation
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Slide up animation
  const translateY = interpolate(frame, [0, 30], [50, 0], {
    extrapolateRight: "clamp",
  });

  // No exit fade on last scene - stays visible

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #111827 0%, #1f2937 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <CommunityLeaderboard />
    </AbsoluteFill>
  );
};
