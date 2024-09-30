import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { PropsWithChildren } from "react";

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

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function Rtl(props: PropsWithChildren) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}

export { defaultTheme, Rtl };
