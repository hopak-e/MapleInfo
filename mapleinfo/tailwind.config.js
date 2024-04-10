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
          레전드리: "#CBFF00",
          유니크: "#FFCC01",
          에픽: "#B76CFD",
          레어: "#66FFFE",
        },
        itemoption: {
          add: "#CBFF00",
          etc: "#AAAAFF",
          starforce: "#FFCC01",
        },
        starforce: {
          50: "#F5A630",
          100: "#FFF8E8",
          150: "#312A20",
          success: "#27344E",
          failed: "#59343B",
          destroyed: "#828380",
        },
      },
      backgroundImage: {
        wallpaper: "url('./assets/wallpaper.svg')",
      },
    },
  },
  plugins: [],
};
