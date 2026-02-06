import React from "react";
import { CommunityLeaderboard, AppShell } from "../components";

export const CommunityLeaderboardComposition: React.FC = () => {
  return (
    <AppShell activeTab="community">
      <CommunityLeaderboard />
    </AppShell>
  );
};
