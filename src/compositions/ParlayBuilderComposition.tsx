import React from "react";
import { ParlayBuilder, AppShell } from "../components";

export const ParlayBuilderComposition: React.FC = () => {
  return (
    <AppShell activeTab="estrategia">
      <ParlayBuilder />
    </AppShell>
  );
};
