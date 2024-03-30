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
        grade: {
          50: "#A4C701",
          100: "#E89B0B",
          150: "#8066D2",
          200: "#00C3D9",
          250: "#29372F",
          300: "#404136",
          350: "#352E3F",
          400: "#263140",
        },
        potential: {
          50: "#CBFF00",
          100: "#FFCC01",
          150: "#B76CFD",
          200: "#66FFFE",
        },
        itemoption: {
          add: "#CBFF00",
          etc: "#AAAAFF",
          starforce: "#FFCC01",
        },
        starforce: { 50: "#F5A630", 100: "#FFF8E8", 150: "#312A20" },
      },
      backgroundImage: {
        wallpaper: "url('./assets/wallpaper.svg')",
      },
    },
  },
  plugins: [],
};
