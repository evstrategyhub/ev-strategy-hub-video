import React from "react";
import { StrategyBuilder, AppShell } from "../components";

export const StrategyBuilderComposition: React.FC = () => {
  return (
    <AppShell activeTab="estrategia">
      <StrategyBuilder />
    </AppShell>
  );
};
