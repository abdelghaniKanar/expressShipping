/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#dc2626", // Red-600
        "primary-dark": "#b91c1c", // Red-700
        "primary-light": "#fee2e2", // Red-100
      },
    },
  },
  plugins: [],
};
