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
import React from "react";
import Head from "../components/head";
import CircularProgress from '@material-ui/core/CircularProgress';
import * as EmailValidator from 'email-validator';
import {sendPasswordReset, checkEmail} from '../utils/queries';



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
    background: "#fff8f8",
    border: "1px solid #ffe9e9"

  },
  message: {
    color: "#007e15",
    padding: "20px 14px",
    borderRadius: "5px",
    fontSize: "1rem",
    textAlign: "left",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: '1em',
    letterSpacing: '0.03333em',
    background: "#0f6f3a0f",
    border: "1px solid #c8e0d0"

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
  static async getInitialProps(ctx) {



    return { };
  }
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      emailError: false,
      emailHelper: '',
      error: '',
      disabled: false
    };
  }

  chkEmail = async (e) => {

    if(this.state.email){
      const valid = EmailValidator.validate(this.state.email);
      if (!valid){
        this.setState({ emailError: true, emailHelper:  "Email address is not Valid"  })
      } else {
  
  const ech = await checkEmail(this.state.email, this.props.config)
  this.setState({disabled:false, loading: false}) 

      }
  
  } else {
    this.setState({ emailError: true, emailHelper:  "Email address is required"  })
    this.setState({disabled:false, loading: false}) 
  }
  
  }

  
  handleEmailChange = e => {
    this.setState({email: e.target.value, emailError: false, emailHelper: ''})
  }
  
  handlePasswordChange = e => {
    this.setState({password: e.target.value, passwordError: false, passwordHelper: '', error: ''})
  }

  submitPost = async (e) => {
    this.setState({loading: true, disabled: true,  error: ''}) 

    var echeck = await this.chkEmail();

    if(!this.state.emailError){

    const result = await sendPasswordReset(this.state, this.props.config);

    // console.log("res:", res)

    if(result.error){
        this.setState({error: result.error, disabled:false, loading: false}) 
    }

    if(result.status && result.status == "email successful"){
        const message = "Password reset successful.  Check Email account for reset link"
        this.setState({message: message, loading: false}) 
    }

    }
    
// console.log('submit')

//     const username = this.state.username;
//     const password = this.state.password;
//     // const url = '/api/login'
//     const url = "/api/auth/signin";

//     let r;

//     try {
//       const response = await fetch(url, {
//         method: "POST",

//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password })
//       });

      

      

//       if (response.status === 200) {
//         const { token } = await response.json();

//         await login({ token });
//       } else {
//         r = await response.json()
//         console.log("Login failed.");
//         let error = new Error(r.response);
//         error.response = r.response;
//         console.log("r: ", r)
//         this.setState({error: r.response, loading: false})
//      //   throw error;
//       }

    
//     } catch (error) {
//       // console.error(
//       //   "You have an error in your code or there are Network issues.",
//       //   error
//       // );

//       console.log("e: ", error)

//       // const { response } = error;
//       // this.setState({error: r.response ? response.statusText : error.message})
//     }
  
  
 
 
  }

  render(){


    const { classes, config } = this.props;

  const meta = [];

  meta.title = `Reset your Password - HotToFind ${config.COUNTRY}`;
  meta.description =
    `Reset the passowrd on your HotToFind ${config.COUNTRY} account.`;

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
          Reset your password
        </Typography>
        <form className={classes.form}  noValidate  autoComplete="new-password" disabled={this.state.disabled}>
        <input type="hidden" value="something" />
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
        <TextField
                variant="outlined"
                error={this.state.emailError}
                helperText={this.state.emailHelper}
                required
                fullWidth
                id="liame"
                label="Enter your Email address"
                name="liame"
                value={this.state.email}
                onChange={this.handleEmailChange}
             onBlur={this.chkEmail}
             autoComplete="new-password"
             onFocus={this.onFocus}
             disabled={this.state.disabled}
              />
              </Grid>
              {this.state.error && 
              <Grid item xs={12} sm={12}>  
              <p className={classes.error} >{this.state.error}</p>
              </Grid>
              }
                {this.state.message && 
              <Grid item xs={12} sm={12}>  
              <p className={classes.message} >{this.state.message}</p>
              </Grid>
              }
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.submitPost}
            disabled={this.state.disabled}
          >
            Reset Password {this.state.loading ? <CircularProgress className={classes.spinner} /> : '' }
          </Button>
          
          <Grid container>
            <Grid item xs>
              <Link href="/login" variant="body2">
                Login
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
