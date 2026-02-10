import React from 'react';
import { MonthlyProfits } from '../components/MonthlyProfits';

export const MonthlyProfitsComposition: React.FC = () => {
  // Mes seleccionado: Enero 2026
  const selectedMonth = new Date(2026, 0, 1);

  // Datos de ganancias diarias: 31 días que suman exactamente $5,000
  // 25 días verdes, 6 días rojos (negativos entre -$90 y -$200)
  const dailyProfitData = [
    { date: '01', profit: 150 },
    { date: '02', profit: 200 },
    { date: '03', profit: 180 },
    { date: '04', profit: 220 },
    { date: '05', profit: 350 },   // Buen día
    { date: '06', profit: 280 },
    { date: '07', profit: 190 },
    { date: '08', profit: -200 },  // ROJO
    { date: '09', profit: 310 },
    { date: '10', profit: 240 },
    { date: '11', profit: 170 },
    { date: '12', profit: -150 },  // ROJO
    { date: '13', profit: 420 },   // Muy buen día
    { date: '14', profit: 260 },
    { date: '15', profit: 200 },
    { date: '16', profit: 380 },   // Buen día
    { date: '17', profit: 290 },
    { date: '18', profit: -180 },  // ROJO
    { date: '19', profit: 210 },
    { date: '20', profit: 340 },
    { date: '21', profit: 180 },
    { date: '22', profit: -120 },  // ROJO
    { date: '23', profit: 250 },
    { date: '24', profit: 480 },   // Mejor día
    { date: '25', profit: 320 },
    { date: '26', profit: -90 },   // ROJO
    { date: '27', profit: 190 },
    { date: '28', profit: 230 },
    { date: '29', profit: -160 },  // ROJO
    { date: '30', profit: 280 },
    { date: '31', profit: 151 },
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
