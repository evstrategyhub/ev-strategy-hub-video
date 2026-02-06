import React from "react";
import { DashboardStats, AppShell } from "../components";

export const DashboardStatsComposition: React.FC = () => {
  return (
    <AppShell activeTab="analisis">
      <DashboardStats />
    </AppShell>
  );
};
