import React from "react";
import { CalendarHeatmap, AppShell } from "../components";

export const CalendarHeatmapComposition: React.FC = () => {
  return (
    <AppShell activeTab="bankroll">
      <CalendarHeatmap />
    </AppShell>
  );
};
