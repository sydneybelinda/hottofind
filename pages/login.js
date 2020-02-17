import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import fetch from "isomorphic-unfetch";
import React, { useState } from "react";
import { login } from "../utils/auth";
import Head from "../components/head";
import config from "../config";
import CircularProgress from '@material-ui/core/CircularProgress';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  title: {
    fontSize: 38
  },
  topMargin: {
    marginTop: 15
  },
  error: {
    color: "#ff1744",
    padding: "20px 14px",
    borderRadius: "5px",
    fontSize: "1rem",
    textAlign: "left",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: '1em',
    letterSpacing: '0.03333em',
    background: "#eaeaea",
    border: "1px solid #dedede"

  },
  spinner:{
  width: "15px !important",
  color: "white !important",
  height: "15px !important",
  position: "absolute",
  right: "20px !important",
  }
});


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      username: "",
      password: "",
      error: "",
      nameError: false,
      usernameError: false,
      emailError: false,
      passwordError: false,
      nameHelper: '',
      usernameHelper: '',
      emailHelper: '',
      passwordHelper: '',
      loading: false
    };
  }

  handleUsernameChange = e => {
    this.setState({username: e.target.value, usernameError: false, usernameHelper: '', error: ''})
  }
  
  handleEmailChange = e => {
    this.setState({email: e.target.value, emailError: false, emailHelper: ''})
  }
  
  handlePasswordChange = e => {
    this.setState({password: e.target.value, passwordError: false, passwordHelper: '', error: ''})
  }

  submitPost = async (e) => {
    this.setState({loading: true}) 
    
console.log('submit')

    const username = this.state.username;
    const password = this.state.password;
    // const url = '/api/login'
    const url = "/api/auth/signin";

    let r;

    try {
      const response = await fetch(url, {
        method: "POST",

        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      r = await response.json()

      

      if (response.status === 200) {
        const { token } = await response.json();

        await login({ token });
      } else {
        console.log("Login failed.");
        let error = new Error(r.response);
        error.response = r.response;
        console.log("r: ", r)
        this.setState({error: r.response, loading: false})
     //   throw error;
      }

    
    } catch (error) {
      // console.error(
      //   "You have an error in your code or there are Network issues.",
      //   error
      // );

      console.log("e: ", error)

      // const { response } = error;
      // this.setState({error: r.response ? response.statusText : error.message})
    }
  
  
 
 
  }

  render(){

    const { classes } = this.props;

  const meta = [];

  meta.title = `Login to your Account - HotToFind ${config.COUNTRY}`;
  meta.description =
    `Login to your HotToFind ${config.COUNTRY} account and start buying and selling for free today!`;

  return (
    <Container component="main" maxWidth="xs">
      <Head meta={meta} />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <div className={classes.title}>HotToFind</div>
        <Typography component="h1" variant="h5">
          Login to your account
        </Typography>
        <form className={classes.form}  noValidate>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
        <TextField
                variant="outlined"
                error={this.state.usernameError}
                helperText={this.state.usernameHelper}
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={this.state.username}
                autoComplete="username"
                onChange={this.handleUsernameChange}
             onBlur={this.chkUsername}

              />
              </Grid>
              <Grid item xs={12} sm={12}>                       <TextField
                variant="outlined"
                error={this.state.passwordError}
                helperText={this.state.passwordHelper}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={this.state.password}
                autoComplete="current-password"
                onChange={this.handlePasswordChange}
                onBlur={this.chkPassword }
              />
              </Grid>
              {this.state.error && 
              <Grid item xs={12} sm={12}>  
              <p className={classes.error} >{this.state.error}</p>
              </Grid>
              }
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
            onClick={this.submitPost}
          >
            Sign In {this.state.loading ? <CircularProgress className={classes.spinner} /> : '' }
          </Button>
          
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
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
      <Box mt={8}>
        {/* <Copyright /> */}
      </Box>
    </Container>
  );
}
}
export default withStyles(styles)(Login);
