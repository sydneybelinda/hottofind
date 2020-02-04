import { makeStyles } from "@material-ui/core/styles";
import Footer from "./footer";
import Head from "./head";
import Header from "./header";
const useStyles = makeStyles(theme => ({
  wrap: {
    [theme.breakpoints.up("sm")]: {
      marginTop: "94px"
    },
    marginTop: "56px"
  }
}));

function Layout(props) {
  const classes = useStyles();
  return (
    <>
      <Head meta={props.meta} />
      <style jsx global>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          color: #333;
          background-color: #f3f3f3 !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji",
            "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        }

        h1 {
          font-family: "Montserrat", "Arial", "Helvetica Neue", "Helvetica",
            sans-serif !important;
          font-weight: 700;
          line-height: 65px;
          letter-spacing: -0.4px;
          font-size: 50px;
          margin-top: 0;
        }

        h2 {
          font-family: "Montserrat", "Arial", "Helvetica Neue", "Helvetica",
            sans-serif !important;
          font-size: 27px;
          font-weight: 700;
          line-height: 48.006px;
          margin-bottom: 0;
        }

        .main {
          margin-top: 93px;
          min-height: 100vh;
        }
        @media only screen and (max-width: 600px) {
          .main {
            margin-top: 57px;
          }
        }
      `}</style>
      <div className={classes.wrap}>
        <Header {...props} />
        {props.children}
        <Footer />
      </div>
    </>
  );
}

export default Layout;
