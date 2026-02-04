Documento: Guía de diseño visual para implementación en Remotion
Proyecto: ev-strategy-hub-video
Componentes: 5 componentes principales extraídos del código real

📐 SISTEMA DE DISEÑO BASE
Paleta de Colores
css/* Backgrounds */
--bg-primary: bg-gray-800      /* Fondo de página */
--bg-card: bg-gray-750          /* Cards principales */
--bg-section: bg-gray-700       /* Secciones internas */
--bg-input: bg-gray-700         /* Inputs/selects */
--bg-active: bg-green-600       /* Elementos activos */
--bg-inactive: bg-gray-700      /* Elementos inactivos */

/* Text */
--text-primary: text-white
--text-secondary: text-gray-300
--text-tertiary: text-gray-400
--text-label: text-gray-400 text-sm

/* Highlights */
--text-positive: text-green-400 | text-green-500
--text-negative: text-red-400 | text-red-500
--text-warning: text-yellow-400
--text-accent: text-blue-400

/* Borders */
--border-default: border-gray-700
--border-active: border-green-500
--border-warning: border-yellow-500
Tipografía
css/* Headers */
h1: text-3xl md:text-4xl font-bold text-white
h2: text-2xl font-bold text-white
h3: text-xl font-semibold text-white

/* Stats Numbers */
stat-large: text-4xl font-bold
stat-medium: text-2xl font-bold
stat-small: text-xl font-bold

/* Body Text */
body-large: text-base text-white
body-medium: text-sm text-gray-300
body-small: text-xs text-gray-400

/* Labels */
label: text-sm text-gray-400
label-small: text-xs text-gray-400
Espaciado Standard
csspadding-card: p-4 | p-6
gap-grid: gap-4
margin-section: mb-4 | mb-6
space-between: space-y-3 | space-y-4

1️⃣ DASHBOARD STATS
Visual Structure
jsx<div className="grid grid-cols-3 gap-4 w-full max-w-4xl">
  {/* Card 1: Total Partidos */}
  <div className="bg-gray-750 rounded-lg border border-gray-700 p-4">
    <div className="text-2xl font-bold text-white">12</div>
    <div className="text-sm text-gray-400">Partidos</div>
  </div>
  
  {/* Card 2: Total Mercados */}
  <div className="bg-gray-750 rounded-lg border border-gray-700 p-4">
    <div className="text-2xl font-bold text-white">84</div>
    <div className="text-sm text-gray-400">Mercados</div>
  </div>
  
  {/* Card 3: Total EV+ */}
  <div className="bg-gray-750 rounded-lg border border-gray-700 p-4">
    <div className="text-2xl font-bold text-green-500">23</div>
    <div className="text-sm text-gray-400">EV+</div>
  </div>
</div>
Especificaciones de Diseño

Layout: Grid 3 columnas iguales
Card background: bg-gray-750
Card border: border border-gray-700
Card padding: p-4
Card radius: rounded-lg
Gap entre cards: gap-4
Número color: text-white (neutro) o text-green-500 (positivo)
Número size: text-2xl font-bold
Label color: text-sm text-gray-400

Mock Data
typescriptconst dashboardStats = [
  { label: 'Partidos', value: 12, color: 'white' },
  { label: 'Mercados', value: 84, color: 'white' },
  { label: 'EV+', value: 23, color: 'green' }
];

2️⃣ EV PICK CARD
Visual Structure
jsx<div className="bg-gray-750 rounded-lg border border-gray-700 w-full max-w-3xl">
  {/* Header */}
  <div className="bg-gray-900 px-6 py-4 rounded-t-lg border-b border-gray-700">
    <div className="flex items-center justify-between">
      <div>
        <div className="text-white font-semibold text-lg">Chiefs vs 49ers</div>
        <div className="text-sm text-gray-400">NFL • 09 Feb 2026</div>
      </div>
      <div className="flex items-center space-x-2">
        {/* Badge EV */}
        <div className="bg-green-900/30 text-green-400 px-3 py-1 rounded-md text-sm font-medium">
          EV: +9.2%
        </div>
        {/* Rating Badge */}
        <div className="bg-green-500 text-white px-3 py-1 rounded-md text-sm font-bold">
          B
        </div>
      </div>
    </div>
  </div>

  {/* Tabs */}
  <div className="flex border-b border-gray-700">
    <button className="flex-1 py-3 text-white bg-gray-700 font-medium">Mercados</button>
    <button className="flex-1 py-3 text-gray-400 hover:text-white">Tendencias</button>
    <button className="flex-1 py-3 text-gray-400 hover:text-white">H2H</button>
  </div>

  {/* Tabla de Mercados */}
  <div className="p-6">
    {/* Headers */}
    <div className="grid grid-cols-7 gap-4 text-xs text-gray-400 uppercase mb-3 px-3">
      <div>Casa</div>
      <div>Mercado</div>
      <div>Momio</div>
      <div className="text-center">Prob. IA</div>
      <div className="text-center">EV</div>
      <div className="text-center">Rating</div>
      <div></div>
    </div>

    {/* Row 1 */}
    <div className="grid grid-cols-7 gap-4 items-center bg-gray-700/50 rounded-lg p-3 mb-2">
      <div className="text-white text-sm">FanDuel</div>
      <div className="text-gray-300 text-sm">Spread</div>
      <div className="text-white font-medium">-110</div>
      <div className="text-center text-green-400 font-medium">54.2%</div>
      <div className="text-center text-green-400 font-bold">+8.3%</div>
      <div className="text-center">
        <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">B</span>
      </div>
      <div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
          + Agregar
        </button>
      </div>
    </div>

    {/* Row 2 */}
    <div className="grid grid-cols-7 gap-4 items-center bg-gray-700/50 rounded-lg p-3">
      <div className="text-white text-sm">DraftKings</div>
      <div className="text-gray-300 text-sm">Moneyline</div>
      <div className="text-white font-medium">+145</div>
      <div className="text-center text-green-400 font-medium">52.8%</div>
      <div className="text-center text-green-400 font-bold">+5.7%</div>
      <div className="text-center">
        <span className="bg-green-300 text-white px-2 py-1 rounded text-xs font-bold">C</span>
      </div>
      <div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
          + Agregar
        </button>
      </div>
    </div>
  </div>
</div>
Especificaciones de Diseño
Header:

Background: bg-gray-900
Border bottom: border-b border-gray-700
Padding: px-6 py-4
Teams: text-white font-semibold text-lg
Info: text-sm text-gray-400
EV Badge: bg-green-900/30 text-green-400 px-3 py-1 rounded-md
Rating Badge: bg-green-500 text-white px-3 py-1 rounded-md font-bold

Tabs:

Active: bg-gray-700 text-white font-medium
Inactive: text-gray-400 hover:text-white
Border bottom: border-b border-gray-700

Tabla:

Grid: grid-cols-7 (7 columnas)
Headers: text-xs text-gray-400 uppercase
Row background: bg-gray-700/50 rounded-lg
Row padding: p-3
Gap: gap-4

Rating Colors:

A: bg-green-500
B: bg-green-500
C: bg-green-300
D: bg-yellow-400
F: bg-red-500

Mock Data
typescriptconst evPickCard = {
  homeTeam: 'Kansas City Chiefs',
  awayTeam: 'San Francisco 49ers',
  league: 'NFL',
  date: '09 Feb 2026',
  markets: [
    {
      bookmaker: 'FanDuel',
      market: 'Spread',
      odds: '-110',
      probIA: '54.2%',
      ev: '+8.3%',
      rating: 'B'
    },
    {
      bookmaker: 'DraftKings',
      market: 'Moneyline',
      odds: '+145',
      probIA: '52.8%',
      ev: '+5.7%',
      rating: 'C'
    }
  ]
};

3️⃣ PARLAY BUILDER
Visual Structure
jsx<div className="w-full max-w-3xl space-y-4">
  {/* Pick Card 1 */}
  <div className="bg-gray-750 rounded-lg border border-gray-700 p-4">
    <div className="flex items-start justify-between mb-3">
      <div>
        <div className="text-white font-semibold">Chiefs vs 49ers</div>
        <div className="text-sm text-gray-400">NFL</div>
      </div>
      <button className="text-red-500 hover:text-red-400">
        <X className="h-5 w-5" />
      </button>
    </div>
    
    <div className="bg-gray-700 rounded-md p-3 mb-3">
      <div className="text-sm text-gray-400">Mercado: Spread</div>
      <div className="text-green-400 font-medium">Chiefs -3.5</div>
    </div>
    
    <div className="grid grid-cols-3 gap-3">
      <div>
        <div className="text-xs text-gray-400">Odds</div>
        <div className="text-white font-medium">1.91</div>
      </div>
      <div>
        <div className="text-xs text-gray-400">Stake</div>
        <div className="text-white font-medium">$50</div>
      </div>
      <div>
        <div className="text-xs text-gray-400">Profit</div>
        <div className="text-green-400 font-bold">$45.50</div>
      </div>
    </div>
  </div>

  {/* Pick Card 2 */}
  <div className="bg-gray-750 rounded-lg border border-gray-700 p-4">
    {/* Misma estructura */}
  </div>

  {/* Parlay Summary */}
  <div className="bg-gray-750 rounded-lg border border-green-500 p-4">
    <h3 className="text-xl font-bold text-green-500 mb-4">📊 Parlay Combinado</h3>
    
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="bg-gray-700 rounded-lg p-3">
        <div className="text-sm text-gray-400">Odds Combinadas</div>
        <div className="text-2xl font-bold text-white">3.57</div>
      </div>
      <div className="bg-gray-700 rounded-lg p-3">
        <div className="text-sm text-gray-400">EV Parlay</div>
        <div className="text-2xl font-bold text-green-500">+9.9%</div>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="text-sm text-gray-400 mb-2">Stake</div>
        <input 
          className="bg-gray-700 text-white rounded-md p-2 w-full" 
          value="$100"
        />
      </div>
      <div>
        <div className="text-sm text-gray-400 mb-2">Profit Potencial</div>
        <div className="text-2xl font-bold text-green-500">$257.00</div>
      </div>
    </div>
    
    <div className="mt-4 flex items-center justify-center">
      <div className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-bold">
        Rating: A
      </div>
    </div>
  </div>
</div>
Especificaciones de Diseño
Pick Cards:

Background: bg-gray-750
Border: border border-gray-700
Padding: p-4
Radius: rounded-lg
Space between: space-y-4

Header del Pick:

Teams: text-white font-semibold
League: text-sm text-gray-400
Delete button: text-red-500 hover:text-red-400

Market Section:

Background: bg-gray-700 rounded-md
Padding: p-3
Market label: text-sm text-gray-400
Selection: text-green-400 font-medium

Metrics Grid:

Layout: grid grid-cols-3 gap-3
Labels: text-xs text-gray-400
Values: text-white font-medium
Profit: text-green-400 font-bold

Parlay Summary:

Border highlight: border-green-500 (diferencia visual)
Title: text-xl font-bold text-green-500
Stats cards: bg-gray-700 rounded-lg p-3
Big numbers: text-2xl font-bold
Rating badge: bg-green-500 text-white px-4 py-2 rounded-md

Mock Data
typescriptconst parlayBuilder = {
  picks: [
    {
      id: '1',
      teams: 'Chiefs vs 49ers',
      league: 'NFL',
      market: 'Spread',
      selection: 'Chiefs -3.5',
      odds: 1.91,
      stake: 50,
      profit: 45.50
    },
    {
      id: '2',
      teams: 'Lakers vs Celtics',
      league: 'NBA',
      market: 'Over/Under',
      selection: 'Over 218.5',
      odds: 1.87,
      stake: 50,
      profit: 43.50
    }
  ],
  parlay: {
    combinedOdds: 3.57,
    parlayEV: 9.9,
    stake: 100,
    potentialProfit: 257.00,
    rating: 'A'
  }
};

4️⃣ BANKROLL GRAPH
Visual Structure
jsx<div className="w-full max-w-4xl">
  {/* Stats Cards Grid 2x3 */}
  <div className="grid grid-cols-2 gap-4 mb-6">
    {/* Card 1: Win Rate */}
    <div className="bg-gray-750 rounded-lg border border-gray-700 p-4">
      <div className="flex items-center space-x-2 mb-2">
        <TrendingUp className="h-5 w-5 text-green-500" />
        <div className="text-sm text-gray-400">Win Rate</div>
      </div>
      <div className="text-2xl font-bold text-white">61.5%</div>
      <div className="text-xs text-gray-500 mt-1">Break-even: 45.9%</div>
    </div>

    {/* Card 2: ROI */}
    <div className="bg-gray-750 rounded-lg border border-gray-700 p-4">
      <div className="flex items-center space-x-2 mb-2">
        <DollarSign className="h-5 w-5 text-green-500" />
        <div className="text-sm text-gray-400">ROI</div>
      </div>
      <div className="text-2xl font-bold text-green-500">+62.4%</div>
    </div>

    {/* Card 3: Active Bets */}
    <div className="bg-gray-750 rounded-lg border border-gray-700 p-4">
      <div className="flex items-center space-x-2 mb-2">
        <Target className="h-5 w-5 text-blue-400" />
        <div className="text-sm text-gray-400">Active Bets</div>
      </div>
      <div className="text-2xl font-bold text-white">7</div>
    </div>

    {/* Card 4: Total Bets */}
    <div className="bg-gray-750 rounded-lg border border-gray-700 p-4">
      <div className="flex items-center space-x-2 mb-2">
        <BarChart className="h-5 w-5 text-blue-400" />
        <div className="text-sm text-gray-400">Total Bets</div>
      </div>
      <div className="text-2xl font-bold text-white">52</div>
    </div>

    {/* Card 5: Best Month */}
    <div className="bg-gray-750 rounded-lg border border-gray-700 p-4">
      <div className="flex items-center space-x-2 mb-2">
        <Calendar className="h-5 w-5 text-yellow-400" />
        <div className="text-sm text-gray-400">Best Month</div>
      </div>
      <div className="text-lg font-bold text-white">Enero 2026</div>
      <div className="text-sm text-green-400 font-medium">+$487.30</div>
    </div>

    {/* Card 6: Best League */}
    <div className="bg-gray-750 rounded-lg border border-gray-700 p-4">
      <div className="flex items-center space-x-2 mb-2">
        <Trophy className="h-5 w-5 text-yellow-400" />
        <div className="text-sm text-gray-400">Best League</div>
      </div>
      <div className="text-lg font-bold text-white">Premier League</div>
      <div className="text-sm text-green-400 font-medium">+$425.80</div>
    </div>
  </div>

  {/* Gráfica (Recharts LineChart) */}
  <div className="bg-gray-750 rounded-lg border border-gray-700 p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-bold text-white">Evolución de Bankroll</h3>
      <div className="text-3xl font-bold text-green-500">$3,247.50</div>
    </div>
    
    {/* Line Chart */}
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="date" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
          labelStyle={{ color: '#D1D5DB' }}
        />
        <Line 
          type="monotone" 
          dataKey="profit" 
          stroke="#10B981" 
          strokeWidth={3}
          dot={{ fill: '#10B981', r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>
Especificaciones de Diseño
Metrics Grid:

Layout: grid grid-cols-2 gap-4 (2 columnas, 3 filas = 6 cards)
Card background: bg-gray-750
Card border: border border-gray-700
Card padding: p-4

Card Header:

Icon + Label: flex items-center space-x-2
Icon size: h-5 w-5
Icon colors: Verde (positivo), Azul (neutral), Amarillo (destacado)
Label: text-sm text-gray-400

Card Values:

Main number: text-2xl font-bold text-white
Positive number: text-2xl font-bold text-green-500
Secondary info: text-xs text-gray-500 o text-sm text-green-400

Chart Container:

Background: bg-gray-750 rounded-lg border border-gray-700
Padding: p-6
Title: text-xl font-bold text-white
Current bankroll: text-3xl font-bold text-green-500

LineChart Styling:

Grid: stroke="#374151" (gray-700)
Axes: stroke="#9CA3AF" (gray-400)
Line: stroke="#10B981" (green-500), strokeWidth={3}
Dots: fill="#10B981", r={4}
Tooltip bg: #1F2937 (gray-800)

Mock Data
typescriptconst bankrollData = {
  currentBankroll: 3247.50,
  metrics: {
    winRate: 61.5,
    breakEven: 45.9,
    roi: 62.4,
    activeBets: 7,
    totalBets: 52,
    bestMonth: { name: 'Enero 2026', profit: 487.30 },
    bestLeague: { name: 'Premier League', profit: 425.80 }
  },
  chartData: [
    { date: '01', profit: 0 },
    { date: '05', profit: 125.80 },
    { date: '10', profit: 287.50 },
    { date: '15', profit: 465.90 },
    { date: '20', profit: 732.50 },
    { date: '25', profit: 1000.80 },
    { date: '31', profit: 1247.50 }
  ]
};

5️⃣ COMMUNITY LEADERBOARD
Visual Structure
jsx<div className="w-full max-w-4xl">
  {/* Header Banner */}
  <div className="bg-gray-750 rounded-lg border border-gray-700 p-6 mb-6">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-white mb-2">
        🏆 Community Leaderboard
      </h1>
      <p className="text-gray-300 mb-2">
        Competencia mensual • 12 días restantes
      </p>
      <p className="text-2xl font-bold text-yellow-400">
        $5,000 MXN en premios
      </p>
    </div>
  </div>

  {/* User Position Card */}
  <div className="bg-gray-750 rounded-lg border border-green-500 p-6 mb-6">
    <h3 className="text-xl font-semibold text-white mb-4">Mi Posición</h3>
    
    <div className="grid grid-cols-3 gap-4">
      <div className="text-center bg-gray-700 rounded-lg p-3">
        <div className="text-2xl font-bold text-green-500">#3</div>
        <div className="text-sm text-gray-400 mt-1">Ranking</div>
      </div>
      <div className="text-center bg-gray-700 rounded-lg p-3">
        <div className="text-2xl font-bold text-yellow-400">512.8</div>
        <div className="text-sm text-gray-400 mt-1">Puntos</div>
      </div>
      <div className="text-center bg-gray-700 rounded-lg p-3">
        <div className="text-2xl font-bold text-green-500">21-11</div>
        <div className="text-sm text-gray-400 mt-1">W-L</div>
      </div>
    </div>
  </div>

  {/* Rankings Table */}
  <div className="bg-gray-750 rounded-lg border border-gray-700 p-6">
    <h3 className="text-xl font-semibold text-white mb-4">
      📊 Top 10 del Mes
    </h3>
    
    <div className="space-y-2">
      {/* Row 1 */}
      <div className="flex justify-between items-center p-4 rounded-lg border border-gray-600 bg-gray-700/50">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">🥇</span>
          <span className="text-lg font-bold text-green-500">#1</span>
          <span className="text-white font-medium">ElProMX</span>
        </div>
        <div className="text-right">
          <div className="text-yellow-400 font-bold">687.5 pts</div>
          <div className="text-sm text-gray-400">28W-9L</div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex justify-between items-center p-4 rounded-lg border border-gray-600 bg-gray-700/50">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">🥈</span>
          <span className="text-lg font-bold text-green-500">#2</span>
          <span className="text-white font-medium">ValueHunter</span>
        </div>
        <div className="text-right">
          <div className="text-yellow-400 font-bold">598.3 pts</div>
          <div className="text-sm text-gray-400">24W-10L</div>
        </div>
      </div>

      {/* Row 3 - Usuario actual (highlight) */}
      <div className="flex justify-between items-center p-4 rounded-lg border-2 border-green-500 bg-green-900/20">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">🥉</span>
          <span className="text-lg font-bold text-green-500">#3</span>
          <span className="text-white font-medium">RodrigoGarcia</span>
          <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">TÚ</span>
        </div>
        <div className="text-right">
          <div className="text-yellow-400 font-bold">512.8 pts</div>
          <div className="text-sm text-gray-400">21W-11L</div>
        </div>
      </div>

      {/* Rows 4-10 continúan igual... */}
    </div>
  </div>
</div>
Especificaciones de Diseño
Header Banner:

Background: bg-gray-750
Border: border border-gray-700
Padding: p-6
Title: text-3xl font-bold text-white
Subtitle: text-gray-300
Prize pool: text-2xl font-bold text-yellow-400

User Position Card:

Border highlight: border-green-500 (diferencia visual)
Title: text-xl font-semibold text-white
Grid: grid grid-cols-3 gap-4
Stat boxes: bg-gray-700 rounded-lg p-3 text-center
Numbers: text-2xl font-bold
Colors: Verde (#rank), Amarillo (puntos), Verde (W-L)
Labels: text-sm text-gray-400 mt-1

Rankings Table:

Container: bg-gray-750 rounded-lg border border-gray-700 p-6
Title: text-xl font-semibold text-white
Space between rows: space-y-2

Ranking Row:

Normal: border border-gray-600 bg-gray-700/50
Current user: border-2 border-green-500 bg-green-900/20
Padding: p-4
Layout: flex justify-between items-center

Row Left Side:

Medal emoji: text-2xl
Position: text-lg font-bold text-green-500
Username: text-white font-medium
"TÚ" badge: bg-green-500 text-white px-2 py-1 rounded text-xs font-bold

Row Right Side:

Points: text-yellow-400 font-bold
Record: text-sm text-gray-400

Medal Colors:

🥇 Top 1
🥈 Top 2
🥉 Top 3
Sin emoji: Resto

Mock Data
typescriptconst communityData = {
  prizePool: 5000,
  daysRemaining: 12,
  currentUser: {
    ranking: 3,
    points: 512.8,
    wins: 21,
    losses: 11
  },
  rankings: [
    { position: 1, username: 'ElProMX', points: 687.5, wins: 28, losses: 9 },
    { position: 2, username: 'ValueHunter', points: 598.3, wins: 24, losses: 10 },
    { position: 3, username: 'RodrigoGarcia', points: 512.8, wins: 21, losses: 11, isCurrentUser: true },
    // ... hasta Top 10
  ]
};

🎨 ICONOGRAFÍA (Lucide React)
typescript// Imports necesarios
import { 
  TrendingUp,      // Métricas positivas
  DollarSign,      // Dinero
  Target,          // Active bets
  BarChart,        // Total bets
  Calendar,        // Best month
  Trophy,          // Best league
  X,               // Cerrar/eliminar
  Plus,            // Agregar
  ChevronDown      // Expandir
} from 'lucide-react';

📐 LAYOUT RESPONSIVE
css/* Mobile First (default) */
- Grid stats: grid-cols-2 (2 columnas)
- Grid parlay metrics: grid-cols-2
- Max width containers: max-w-md

/* Tablet (md: 768px) */
- Grid stats: md:grid-cols-3 (3 columnas)
- Max width containers: md:max-w-4xl

/* Desktop (lg: 1024px) */
- Max width containers: lg:max-w-6xl

✅ IMPLEMENTACIÓN EN REMOTION
Principios para Animación

Fade In: opacity: interpolate(frame, [0, 30], [0, 1])
Slide Up: translateY: interpolate(frame, [0, 30], [50, 0])
Stagger: Cada elemento con delay index * 5 frames
Scale: scale: spring({ frame, from: 0.8, to: 1 })

Duración Recomendada por Escena

Dashboard Stats: 5 segundos (150 frames @ 30fps)
EV Pick Card: 5 segundos (150 frames)
Parlay Builder: 5 segundos (150 frames)
Bankroll Graph: 5 segundos (150 frames)
Community Leaderboard: 5 segundos (150 frames)

Total: 25 segundos (deja 10 segundos para Hero + CTA)

🎯 CHECKLIST DE FIDELIDAD
Para cada componente creado en Remotion, verificar:

 Colores EXACTOS del sistema de diseño
 Tipografía (sizes, weights) correcta
 Espaciado (padding, gap, margin) fiel
 Borders (color, width) correctos
 Grid/Flex layouts coinciden
 Iconos (si aplica) posicionados bien
 Mock data realista (equipos reales, números coherentes)
 Responsive (si aplica)
 Animaciones suaves (30fps sin stuttering)


FIN DEL DOCUMENTO MAESTRO 🎨