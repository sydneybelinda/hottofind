import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import App from "next/app";
import Head from "next/head";
import React from "react";
import theme from "../components/theme";
import * as Queries from "../utils/queries";
import cookies from 'next-cookies';
import ReactGA from 'react-ga';
//import {GA} from '../../config';
import "../app.css";

import getConfig from "../../confignew";

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {

    const {config} = getConfig(ctx.req) ;

    // const router = useRouter();

    // console.log(router)

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
      //   pageProps.config = config
      const categories = await Queries.getCategories(config);

     

      
     // console.log(config);

      pageProps.config = config;
    
   

    if (categories.length != 0){
    pageProps.categories = categories;
    }
    pageProps.defaultSort = cookies(ctx).defaultSort || ''
  }
    return { pageProps };
  }
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    ReactGA.initialize(this.props.pageProps.config.GA);
ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    const { Component, pageProps } = this.props;

 


    return (
      <React.Fragment>
        <Head>
          <title>My page</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          /><link rel="icon" type="image/icon" href="/favicon.ico"></link>

          
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
