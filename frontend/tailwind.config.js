/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "mb-4", "p-3",  "bg-red-100", "border-red-400", "text-red-700",   // Erro
    "bg-green-100", "border-green-400", "text-green-700", // Sucesso
    "bg-blue-100", "border-blue-400", "text-blue-700", // Info
    "bg-yellow-100", "border-yellow-400", "text-yellow-700", // Warning
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lightBackground: '#F1F1F1',
        darkBackground: '#6E2D78',
        primary: '#4f46e5',
      },
    },
  },
  plugins: [],
};
