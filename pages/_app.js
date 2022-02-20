// import '../styles/globals.css'
import React from 'react';
// import Error from "next/error";
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
  html,
  body {
    height: 100%;
    width: 100%;
    font-family: 'Roboto', sans-serif;
  }
  body {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }
  body.fontLoaded {
    font-family: 'Roboto', sans-serif;
  }
  #app {
    background-color: #ffffff;
    min-height: 100%;
    min-width: 100%;
  }
  p,
  label {
    font-family: 'Roboto', sans-serif;
    line-height: 1.5em;
  }
`;
const theme = {
  colors: {
    primary: '#fafafa',
  },
};
function MyApp({ Component, pageProps }) {
  return (
    <div>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
