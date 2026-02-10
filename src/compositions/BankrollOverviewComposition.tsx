import React from 'react';
import { BankrollOverview } from '../components/BankrollOverview';

export const BankrollOverviewComposition: React.FC = () => {
  // Datos de ejemplo reales
  const bankrollData = {
    currentBankroll: 12450.00,
    deposits: 10000,
    withdrawals: 2000,
    totalProfit: 4450,
    roi: 44.5,
  };

  // Historia de bankroll (últimos 30 días)
  const bankrollHistory = [
    { date: '2026-01-01', amount: 10000 },
    { date: '2026-01-05', amount: 10200 },
    { date: '2026-01-10', amount: 10500 },
    { date: '2026-01-15', amount: 11200 },
    { date: '2026-01-20', amount: 11800 },
    { date: '2026-01-25', amount: 12100 },
    { date: '2026-01-30', amount: 12450 },
  ];

  return (
    <BankrollOverview
      bankrollData={bankrollData}
      bankrollHistory={bankrollHistory}
    />
  );
};