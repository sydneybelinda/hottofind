import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState } from "react";
import Head from "../components/head";
import config from "../../config";
import { login } from "../utils/auth";
import {checkUsername, checkEmail} from "../utils/queries";
import * as EmailValidator from 'email-validator';
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
   flex:1
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
    background: "#fff8f8",
    border: "1px solid #ffe9e9"

  },
  spinner:{
  width: "15px !important",
  color: "white !important",
  height: "15px !important",
  position: "absolute",
  right: "20px !important",
  }
})


class Register extends React.Component {
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

handleNameChange = e => {
  this.setState({ name: e.target.value, nameError: false, nameHelper: '' })
}
handleUsernameChange = e => {
  this.setState({username: e.target.value, usernameError: false, usernameHelper: ''})
}

handleEmailChange = e => {
  this.setState({email: e.target.value, emailError: false, emailHelper: ''})
}

handlePasswordChange = e => {
  this.setState({password: e.target.value, passwordError: false, passwordHelper: ''})
}

chkName = async (e) => {
      

  if (!this.state.name){ 
    this.setState({ nameError: true, nameHelper:  "Name is required" })
  } else {
    this.setState({ nameError: false, nameHelper:  ""})
  }

}

chkUsername = async (e) => {
 
  if(this.state.username){

    var usernameRegex = /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/;
    if(!usernameRegex.test(this.state.username)){
      this.setState({ usernameError: true, usernameHelper:  "Incorrect format.  Use only lowercase chars and no space" })
    } else {

const uch = await checkUsername(this.state.username)


if (uch.length > 0){ 
  this.setState({ usernameError: true, usernameHelper:  "Username is already taken" })
} else {
  this.setState({ usernameError: false, usernameHelper: "" })
}
    }
} else {
  this.setState({ usernameError: true,  usernameHelper:  "Username is required"  })
}

}

chkEmail = async (e) => {

  if(this.state.email){
    const valid = EmailValidator.validate(this.state.email);
    if (!valid){
      this.setState({ emailError: true, emailHelper:  "Email address is not Valid"  })
    } else {

const ech = await checkEmail(this.state.email)


if (ech.length > 0){ 
  this.setState({ emailError: true, emailHelper:  "Email address is already registered"  })
} else {
  this.setState({ emailError: false, emailHelper: ""  })
}
    }

} else {
  this.setState({ emailError: true, emailHelper:  "Email address is required"  })

}

}

chkPassword = async (e) => {
      

  if (!this.state.password){ 
    this.setState({ passwordError: true, passwordHelper:  "Password is required" })
  } else {
    this.setState({ passwordError: false, passwordHelper:  "" })
  }

}

submitPost = async (e) => {
  this.setState({loading: true}) 

  var ncheck = await this.chkName();
  var ucheck = await this.chkUsername();
  var echeck = await this.chkEmail();
  var pcheck = await this.chkPassword();

  if(!this.state.usernameError && !this.state.emailError && !this.state.passwordError){

    const userData = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    const url = "/api/auth/signup";



    try {
      const response = await fetch(url, {
        method: "POST",

        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userData })
      });
      if (response.status === 200) {
        const { token } = await response.json();
        await login({ token });
      } else {
        console.log("Login failed.");
        // https://github.com/developit/unfetch#caveats
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    } catch (error) {
      console.error(
        "You have an error in your code or there are Network issues.",
        error
      );

      const { response } = error;
      this.setState({error: response ? response.statusText : error.message})
          
    }
  }
  this.setState({loading: false})

}

  
render() {

  const { classes } = this.props;


  const meta = [];

  meta.title = `Register a new account for free - HotToFind ${config.COUNTRY}`;
  meta.description =
    `Sign up to HotToFind ${config.COUNTRY} today quickly and easily for FREE!  and start buying and selling online`;




  
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
          Sign up now for a free Account
        </Typography>
        <form className={classes.form}  noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                error={this.state.nameError}
                helperText={this.state.nameHelper}
                value={this.state.name}
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                onChange={this.handleNameChange}
                onBlur={this.chkName}
              />
            </Grid>
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                error={this.state.emailError}
                helperText={this.state.emailHelper}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={this.state.email}
                autoComplete="email"
                onChange={this.handleEmailChange}
                onBlur={this.chkEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
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
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          {this.state.error && <p className={classes.error} >Error: {this.state.error}</p>}
          <Button
          //  type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.submitPost}
          >
            Sign Up  {this.state.loading ? <CircularProgress className={classes.spinner} /> : '' }
          </Button>
          <Grid container justify="flex-end">
          <Grid item className={classes.topMargin}>
              <Link href="/" variant="body2">
                Homepage
              </Link>
            </Grid>
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        {/* <Copyright /> */}
      </Box>
    </Container>
  );
}
}
export default withStyles(styles)(Register);