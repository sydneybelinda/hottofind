import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {URL, COUNTRY} from '../config'

const useStyles = makeStyles(theme => ({
  footer: {
    background: "black",
    color: "silver",

    fontFamily: 'Lora, "Times New Roman", Times, Baskerville, Georgia, serif',
    "& a": {
      color: "silver"
    }
  },
  mainText: {
    fontFamily:
      '"Montserrat","Arial","Helvetica Neue","Helvetica",sans-serif !important',
    color: "white"
  },
  subtext: {
    fontFamily: 'Lora, "Times New Roman", Times, Baskerville, Georgia, serif',
    fontSize: "12px",
    marginBottom: 30
  },
  hot: {
    color: "#00ffe7"
  },
  topFooter: {
    padding: "40px 0"
  },
  bottomFooter: {
    padding: "15px 0",
    background: "#003d37",
    fontSize: "10px"
  },
  bottomText: {
    fontSize: "10px"
  },
  contact: {
    [theme.breakpoints.up("sm")]: {
      textAlign: "right"
    },
    textAlign: "center",
    "& a ": {
      color: "#00baa9"
    }

  },
  company: {
    [theme.breakpoints.up("sm")]: {
      paddingBottom: "0px",
      textAlign: 'left'
    },
    paddingBottom: "40px",
    textAlign: 'center'
  },
  linksb: {
    [theme.breakpoints.up("sm")]: {
      textAlign: 'left'
    },
    textAlign: 'right'
  },
}));

function Copyright() {
  const classes = useStyles();
  return (
    <Typography variant="body2" align="center" className={classes.bottomText}>
      {"Copyright © "} {new Date().getFullYear()} -{" "}
      <Link color="inherit" href={URL}>
        {URL}
      </Link>
    </Typography>
  );
}

const Footer = props => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div className={classes.topFooter}>
        <Container maxWidth="lg" spacing={3}>
          <Grid container>
            <Grid item sm={4} xs={12}>
              <div className={classes.company}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={classes.mainText}
                >
                  <span className={classes.hot}>HotToFind</span> {COUNTRY}
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="p"
                  className={classes.subtext}
                >
                  Free Local Classifieds - Buy / Sell / Trade anything
                </Typography>
                
                <p>
                  1 George St, <br /> Sydney NSW 2000
                </p>
                <a href="mailto:info@hottofind.com">info@hottofind.com</a><br/>
                <a href={URL}>{URL}</a>
              </div>
            </Grid>
            <Grid item sm={2} xs={12}></Grid>
            <Grid item sm={2} xs={6}>
              <div className={classes.links}>
                <a href="/posts/employment">Jobs</a>
                <br />
                <a href="/posts/local-places">Local</a>
                <br />
                <a href="/posts/community">Community</a>
                <br />
                <a href="/posts/automotive">Auto</a>
                <br />
              </div>
            </Grid>
            <Grid item sm={2} xs={6}>
              <div className={classes.linksb}>
                <a href="/posts/real-estate-selling">Realty - Buy</a>
                <br />
                <a href="/posts/real-estate-renting">Realty - Rent</a>
                <br />
                <a href="/posts/services">Services</a>
                <br />
                <a href="/posts/adult">Adult</a>
                <br />
              </div>
            </Grid>
            <Grid item sm={2} xs={12}>
              <div className={classes.contact}>
              <Typography
                  variant="h6"
                  gutterBottom
                  className={classes.mainText}
                >
                  <span className={classes.sites}>Our Sites:</span>
                </Typography>
                <div className={classes.links}>
                <a href="https://au.hottofind.com">HotToFind Australia</a>
                <br />
                <a href="https://hottofind.com">HotToFind United States</a>
                <br />
                <a href="https://ca.hottofind.com">HotToFind Canada</a>
                <br />
                <a href="https://in.hottofind.com">HotToFind India</a>
                <br />
                <a href="https://uk.hottofind.com">HotToFind United Kingdom</a>
                <br />
              </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={classes.bottomFooter}>
        <Container maxWidth="lg">
          <Copyright />
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
