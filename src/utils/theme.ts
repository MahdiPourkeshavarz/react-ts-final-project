import { createTheme } from "@mui/material/styles";

const defaultTheme = (theme: "dark" | "light") => {
  return createTheme({
    palette: {
      primary: {
        main: "#fff",
        light: "#fff",
      },
      mode: theme, // 'light' or 'dark'
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: theme === "light" ? "black" : "white", // Button text color
          },
        },
      },
    },
  });
};

export { defaultTheme };
