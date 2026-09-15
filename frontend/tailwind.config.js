/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        mist: "#F3F8FC",
        navy: {
          DEFAULT: "#163A5C",
          deep: "#0E3554",
          ink: "#1A3A58",
        },
        lagoon: "#3BA8C9",
        skybtn: "#4A90D9",
        frost: "#E8F2FA",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 18px 50px -24px rgba(22, 58, 92, 0.28)",
        float: "0 24px 60px -20px rgba(22, 58, 92, 0.22)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
