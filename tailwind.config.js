/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        'gray-750': '#1f2937',
        'gray-800': '#1f2937',
        'gray-900': '#111827',
        'gray-700': '#374151',
        'gray-600': '#4b5563',

        // Greens
        'green-300': '#6ee7b7',
        'green-400': '#4ade80',
        'green-500': '#22c55e',
        'green-600': '#16a34a',
        'green-700': '#15803d',

        // Otros
        'yellow-400': '#facc15',
        'orange-400': '#fb923c',
        'red-400': '#f87171',
        'red-500': '#ef4444',

        brand: {
          green: "#10b981",
          blue: "#3b82f6",
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
