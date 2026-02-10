import React from 'react';
import { MonthlyProfits } from '../components/MonthlyProfits';

export const MonthlyProfitsComposition: React.FC = () => {
  // Mes seleccionado: Enero 2026
  const selectedMonth = new Date(2026, 0, 1);

  // Datos de ganancias diarias (31 días de Enero)
  const dailyProfitData = [
    { date: '01', profit: 50 },
    { date: '02', profit: 120 },
    { date: '03', profit: -123 },
    { date: '04', profit: 89 },
    { date: '05', profit: 234 },
    { date: '06', profit: 156 },
    { date: '07', profit: 78 },
    { date: '08', profit: 45 },
    { date: '09', profit: 234 },
    { date: '10', profit: 89 },
    { date: '11', profit: 156 },
    { date: '12', profit: 78 },
    { date: '13', profit: 234 },
    { date: '14', profit: 456 },
    { date: '15', profit: 892.30 }, // Mejor día
    { date: '16', profit: 234 },
    { date: '17', profit: 89 },
    { date: '18', profit: 156 },
    { date: '19', profit: 78 },
    { date: '20', profit: 234 },
    { date: '21', profit: 156 },
    { date: '22', profit: 345 },
    { date: '23', profit: 123 },
    { date: '24', profit: 267 },
    { date: '25', profit: 189 },
    { date: '26', profit: 234 },
    { date: '27', profit: 456 },
    { date: '28', profit: 178 },
    { date: '29', profit: 289 },
    { date: '30', profit: 345 },
    { date: '31', profit: 123 },
  ];

  // Calcular stats
  const totalProfit = dailyProfitData.reduce((sum, day) => sum + day.profit, 0);
  const averageDailyProfit = totalProfit / dailyProfitData.length;
  const bestDay = dailyProfitData.reduce((max, day) => 
    day.profit > max.profit ? day : max, 
    { date: 'N/A', profit: -Infinity }
  );
  const worstDay = dailyProfitData.reduce((min, day) => 
    day.profit < min.profit ? day : min, 
    { date: 'N/A', profit: Infinity }
  );

  return (
    <MonthlyProfits
      selectedMonth={selectedMonth}
      dailyProfitData={dailyProfitData}
      totalProfit={totalProfit}
      averageDailyProfit={averageDailyProfit}
      bestDay={bestDay}
      worstDay={worstDay}
    />
  );
};