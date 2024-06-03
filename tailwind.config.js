/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primaryText: "#999999",
        secondaryText: "#B3B3B3",
        accentText: "#808080",
        primaryBorder: "#F5F5F5",
        primaryIcon: "#D8D8D8",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1126px",
        xl: "1440px",
      },
    },
  },
  plugins: [],
};
