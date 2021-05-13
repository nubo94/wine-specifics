import { useMemo, useEffect, CSSProperties } from "react";
import { loadCSS } from "fg-loadcss";
import dynamic from "next/dynamic";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "nprogress/nprogress.css";

const TopProgressBar = dynamic(
  () => {
    return import("@/core/atoms/TopProgressBar");
  },
  { ssr: false }
);

function Theme({ children }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  const theme = useMemo(() => {
    return createMuiTheme({
      nprogress: "#FFF",
      background: "#fafafa",
      status: {
        info: "#333",
        danger: "#f44336",
        success: "#43A047",
        warning: "#E65100",
      },
      palette: {
        type: "light",
        primary: {
          dark: "#5A6AE5",
          main: "#6C75F5",
          light: "#F3F5FF",
          // @ts-ignore
          ultraDark: "#475ABE",
        },
        secondary: {
          main: "#C7D4FF",
        },
        text: {
          primary: "#333",
          secondary: "#616161",
          disabled: "#9E9E9E",
        },
        divider: "rgba(0, 0, 0, 0.12)",
        background: {
          default: "#fafafa",
          paper: "#FFF",
        },
        action: {
          active: "rgba(0, 0, 0, 0.54)",
          hover: "rgba(0, 0, 0, 0.04)",
          selected: "rgba(0, 0, 0, 0.08)",
          disabled: "rgba(0, 0, 0, 0.26)",
          disabledBackground: "rgba(0, 0, 0, 0.12)",
        },
      },
      typography: {
        fontFamily: "'Lato', sans-serif;",
      },
      overrides: {
        MuiCssBaseline: {
          "@global": {
            html: {
              WebkitFontSmoothing: "auto",
            },
          },
        },
      },
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopProgressBar />
      <div>{children}</div>
      <style jsx global>
        {`
          html {
            scroll-behavior: smooth !important;
          }
          body {
            max-width: 100% !important;
            padding: 0px !important;
            background-color: ${theme.palette.background.default} !important;
          }
          #nprogress .bar {
            background: ${theme.palette.type === "dark"
              ? theme.palette.common.white
              : theme.palette.primary.main} !important;
            z-index: 999999 !important;
          }
          #nprogress .peg {
            box-shadow: 0 0 2px
                ${theme.palette.type === "dark"
                  ? theme.palette.common.white
                  : theme.palette.primary.main},
              0 0 2px pink;
            z-index: 999999 !important;
          }
          #nprogress .spinner-icon {
            border-top-color: rgba(0, 0, 0, 0);
            border-left-color: rgba(0, 0, 0, 0);
          }
        `}
      </style>
    </ThemeProvider>
  );
}

// Create a theme instance.
declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    nprogress: CSSProperties["color"];
    background: CSSProperties["color"];
    status: {
      info: CSSProperties["color"];
      danger: CSSProperties["color"];
      success: CSSProperties["color"];
      warning: CSSProperties["color"];
    };
  }
  interface ThemeOptions {
    nprogress: CSSProperties["color"];
    background: CSSProperties["color"];
    status: {
      info: CSSProperties["color"];
      danger: CSSProperties["color"];
      success: CSSProperties["color"];
      warning: CSSProperties["color"];
    };
  }
}
export default Theme;
