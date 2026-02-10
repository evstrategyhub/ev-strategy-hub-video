import React from 'react';
import { BankrollOverview } from '../components/BankrollOverview';

export const BankrollOverviewComposition: React.FC = () => {
  // Escenario: Ganando fuerte (50% ROI en un mes)
  const bankrollData = {
    currentBankroll: 15000.00,
    deposits: 10000,
    withdrawals: 0,
    totalProfit: 5000,
    roi: 50.0,
  };

  // Historia de bankroll (progresión de $10,000 a $15,000)
  const bankrollHistory = [
    { date: '2026-01-01', amount: 10000 },
    { date: '2026-01-05', amount: 10800 },
    { date: '2026-01-10', amount: 11500 },
    { date: '2026-01-15', amount: 12800 },
    { date: '2026-01-20', amount: 13500 },
    { date: '2026-01-25', amount: 14200 },
    { date: '2026-01-30', amount: 15000 },
  ];

  return (
    <BankrollOverview
      bankrollData={bankrollData}
      bankrollHistory={bankrollHistory}
    />
  );
};
