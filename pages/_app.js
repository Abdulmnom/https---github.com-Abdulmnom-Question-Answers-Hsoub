import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../site-settings/theme';
import { FormattedMessage, IntlProvider } from 'react-intl';
import msgs from 'site-settings/site-translations';
import 'styles/globals.css';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    backgroundColor:"#f8f8f8",
    
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
}));

export default function MyApp({ Component, pageProps }) {
  const classes = useStyles();

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My Page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <IntlProvider locale="ar" messages={msgs['ar']}>
          <CssBaseline />
          <Container maxWidth="sm">
          
          </Container>
          <Component {...pageProps} />
        </IntlProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
