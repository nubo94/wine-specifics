import dynamic from "next/dynamic";

import PropTypes from "prop-types";

// Components
const ThemeProvider = dynamic(import("@/core/atoms/global/Theme"));

export default function MyApp(props) {
  const { Component, pageProps } = props;

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
