import React from "react";
import { EVPickCard, AppShell } from "../components";

export const EVPickCardComposition: React.FC = () => {
  return (
    <AppShell activeTab="analisis">
      <EVPickCard />
    </AppShell>
  );
};
