import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { EVPickCard } from "../components/EVPickCard";

export const Scene3EVPicks: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade in animation
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Slide up animation
  const translateY = interpolate(frame, [0, 30], [50, 0], {
    extrapolateRight: "clamp",
  });

  // Exit fade
  const exitOpacity = interpolate(frame, [130, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #111827 0%, #1f2937 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        opacity: opacity * exitOpacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <EVPickCard />
    </AbsoluteFill>
  );
};
