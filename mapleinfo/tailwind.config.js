module.exports = {
  darkMode: "class",
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          50: "#11151C",
          100: "#0A0D13",
          150: "#586069",
          200: "#292E36",
          250: "#171B20",
        },
        ability: { 50: "#A4C701", 100: "#E89B0B", 150: "#8066D2" },
      },
      backgroundImage: {
        wallpaper: "url('./assets/wallpaper.svg')",
      },
    },
  },
  plugins: [],
};
