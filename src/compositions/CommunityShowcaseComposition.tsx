import React from "react";
import { CommunityShowcase, AppShell } from "../components";

export const CommunityShowcaseComposition: React.FC = () => {
  return (
    <AppShell activeTab="community">
      <CommunityShowcase />
    </AppShell>
  );
};
