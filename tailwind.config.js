module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        night: {
          primary: "#11DEDE",
          secondary: "#ffff",
          neutral: "#F3F4F6",
          "base-100": "#0A0F1E",
          info: "#111827",
          success: "#1BBB70",
          warning: "#F59E0B",
          error: "#FB7185",
        },
      },
      {
        light: {
          primary: "#E62E5F",
          secondary: "#0D0D0D",
          neutral: "#F3F4F6",
          "base-100": "#ffffff",
          info: "#ECF0F3",
          success: "#1BBB70",
          warning: "#DF7E07",
          error: "#FA5C5C",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
