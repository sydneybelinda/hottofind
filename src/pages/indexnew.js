import Avatar from "@material-ui/core/Avatar";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, {useState} from "react";
import Layout from "../components/layout";
import { withAuth } from "../utils/auth";
import { makeStyles } from "@material-ui/core/styles";

import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  sitename: {
    fontSize: "46px",
    [theme.breakpoints.down("md")]: {
      fontSize: "30px",
      lineHeight: "35px",
    },
  },
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(/images/hottofind_hero.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      marginTop: 35,
      paddingRight: 0,
    },
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  subtext: {
    fontFamily: 'Lora, "Times New Roman", Times, Baskerville, Georgia, serif',
    fontSize: "18px",
    [theme.breakpoints.down("md")]: {
      fontSize: "12px",
    },
  },
  cardMedia: {
    width: 160,
  },
  hot: {
    color: "#00ffe7",
  },
  free: {
    display: "none",
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
  gitem: {
    padding: "2px !important",
    [theme.breakpoints.up("sm")]: {
      padding: "16px !important",
    },
  },
  grid: {
    width: "calc(100% + 28px)",
    margin: -14,
    [theme.breakpoints.up("sm")]: {
      width: "calc(100% + 16px)",
      margin: -8,
    },
  },
  rootContainer: {
    paddingLeft: "5px",
    paddingRight: "5px",
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "8px",
      paddingRight: "8px",
    },
  },
  text: { background: "#e9e7e7", marginTop: "35px" },
  heading: {
    textAlign: "center",
  },
  testimonial: {
    maxWidth: "800px",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "41px 20px",
    fontFamily: 'Lora, "Times New Roman", Times, Baskerville, Georgia, serif',
  },
  flex: {
    justifyContent: "center",
  },
  containerRoot: {
    width: "calc(100% + -1px)",
    paddingLeft: 10,
    paddingRight: 10,
  },
  screen: {
    background: "#0c22006b",
  },
}));

function Login(props) {
  const classes = useStyles();

  const meta = [];

  meta.title = `HotToFind ${props.config.COUNTRY} - Free Local Classified Ads`;
  meta.description = `Free Local classified ad postings in ${props.config.COUNTRY}.  Buy, Sell, Trade in your city, instantly online.  Register for free`;

  const [state, setState] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    error: "",
    nameError: false,
    usernameError: false,
    emailError: false,
    passwordError: false,
    nameHelper: "",
    usernameHelper: "",
    emailHelper: "",
    passwordHelper: "",
    loading: false,
  });

  const handleUsernameChange = (e) => {
    setState({
      username: e.target.value,
      usernameError: false,
      usernameHelper: "",
      error: "",
    });
  };

  const handleEmailChange = (e) => {
    setState({
      email: e.target.value,
      emailError: false,
      emailHelper: "",
    });
  };

  const handlePasswordChange = (e) => {
    setState({
      password: e.target.value,
      passwordError: false,
      passwordHelper: "",
      error: "",
    });
  };

  const submitPost = async (e) => {
    setState({ loading: true });

  

    const username = state.username;
    const password = state.password;

    const url = "/api/auth/signin";

    let r;

    try {
      const response = await fetch(url, {
        method: "POST",

        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        const { token } = await response.json();

        await login({ token });
      } else {
        r = await response.json();
        console.log("Login failed.");
        let error = new Error(r.response);
        error.response = r.response;
        console.log("r: ", r);
        setState({ error: r.response, loading: false });
        //   throw error;
      }
    } catch (error) {
      console.log("e: ", error);
    }
  };

  return (
    <Login meta={meta} {...props}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <div className={classes.title}>HotToFind</div>
        <Typography component="h1" variant="h5">
          Login to your account
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                error={state.usernameError}
                helperText={state.usernameHelper}
                required
                fullWidth
                id="username"
                label="Email Address or Username"
                name="username"
                value={state.username}
                autoComplete="username"
                onChange={handleUsernameChange}
                // onBlur={chkUsername}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              {" "}
              <TextField
                variant="outlined"
                error={state.passwordError}
                helperText={state.passwordHelper}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={state.password}
                autoComplete="current-password"
                onChange={handlePasswordChange}
          //      onBlur={chkPassword}
              />
            </Grid>
            {state.error && (
              <Grid item xs={12} sm={12}>
                <p className={classes.error}>{state.error}</p>
              </Grid>
            )}
            <Grid item xs={12} sm={12}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitPost}
          >
            Sign In{" "}
            {state.loading ? (
              <CircularProgress className={classes.spinner} />
            ) : (
              ""
            )}
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="/forget" variant="body2">
                Forgot password?
              </Link>
            </Grid>

            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
            <Grid item xs={6} className={classes.topMargin}>
              <Link href="/" variant="body2">
                Homepage
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Login>
  );
}

Login.getInitialProps = async (req, ctx) => {
  return {};
};

export default withAuth(Login);
