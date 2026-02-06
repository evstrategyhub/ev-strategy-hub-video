import React from "react";
import { ParlayValidator, AppShell } from "../components";

export const ParlayValidatorComposition: React.FC = () => {
  return (
    <AppShell activeTab="estrategia">
      <ParlayValidator />
    </AppShell>
  );
};
