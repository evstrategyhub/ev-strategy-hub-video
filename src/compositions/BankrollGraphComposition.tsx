import React from "react";
import { BankrollGraph, AppShell } from "../components";

export const BankrollGraphComposition: React.FC = () => {
  return (
    <AppShell activeTab="bankroll">
      <BankrollGraph />
    </AppShell>
  );
};
