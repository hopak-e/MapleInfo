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
          200: "#202124",
          250: "#171B20",
          300: "#F1F5F9",
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
          450: "#EAF9F5",
          500: "#FBF5E7",
          550: "#F3E6FE",
          600: "#E8F3FD",
        },
        potential: {
          50: "#CBFF00",
          100: "#FFCC01",
          150: "#B76CFD",
          200: "#66FFFE",
          250: "#00AF12",
          300: "#F5A630",
          350: "#9966FE",
          400: "#118181",
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
        starforceresult: {
          50: "#27344E",
          100: "#59343B",
          150: "#828380",
          200: "#ECF2FF",
          250: "#FFF0F3",
        },
      },
      backgroundImage: {
        wallpaper: "url('./assets/wallpaper.svg')",
      },
    },
  },
  plugins: [],
};
