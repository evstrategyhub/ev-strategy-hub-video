import React from "react";
import { DashboardEVExplainer, AppShell } from "../components";

export const DashboardEVExplainerComposition: React.FC = () => {
  return (
    <AppShell activeTab="analisis">
      <DashboardEVExplainer />
    </AppShell>
  );
};
