/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'main-blue': '#334EAC',
      'col-1': '#FFF9FO',
      'col-2': '#BAD6EB',
      'white': '#ffffff',
      'blck': '#000000',
      'midnight': '#081F5c',
      's-blue': '#D0E3FF',
      'm-red': '#FF6969',
      't-blue': '#337CCF',
      's-red': '#FF8989'
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["winter", "dark"],
  },
}

