import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#f1f5f9",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#1e293b",
    },
    mode: "dark",
  },
});

export { lightTheme, darkTheme };
