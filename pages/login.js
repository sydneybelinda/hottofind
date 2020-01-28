import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import fetch from "isomorphic-unfetch";
import React, { useState } from "react";
import { login } from "../utils/auth";

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

const useStyles = makeStyles(theme => ({
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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function Login() {
  const classes = useStyles();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    error: ""
  });

  async function handleSubmit(event) {
    event.preventDefault();
    setUserData(Object.assign({}, userData, { error: "" }));

    const username = userData.username;
    const password = userData.password;
    // const url = '/api/login'
    const url = "/api/auth/signin";

    try {
      const response = await fetch(url, {
        method: "POST",

        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (response.status === 200) {
        const { token } = await response.json();

        await login({ token });
      } else {
        console.log("Login failed.");

        const res = await response.json();

        let error = res.response;

        throw error;
      }
    } catch (error) {
      console.error(
        "You have an error in your code or there are Network issues.",
        error
      );

      setUserData(
        Object.assign({}, userData, {
          error: error
        })
      );
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="username"
            value={userData.username}
            onChange={event =>
              setUserData(
                Object.assign({}, userData, { username: event.target.value })
              )
            }
            label="Username"
            name="email"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            value={userData.password}
            onChange={event =>
              setUserData(
                Object.assign({}, userData, { password: event.target.value })
              )
            }
            placeholder="Password"
            required
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
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
          </Grid>
          {userData.error && <p className="error">Error: {userData.error}</p>}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Login;
