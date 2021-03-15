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
import {checkSerial, changePassword} from '../utils/queries';
import ErrorPage from "./_error";

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


class Reset extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      serial: this.props.query ? this.props.query.serial : '',
      username: this.props.user ? this.props.user.username : '',
      passwordError: false,
      passwordHelper: '',
      error: '',
      disabled: false,
      complete: false,
      message: '',
      mainmessage: '',
      mainerror: ''
    };
  }




  chkPassword = async (e) => {
      

    if (!this.state.password){ 
      this.setState({ passwordError: true, passwordHelper:  "Password must not be empty", loading: false, disabled: false,  })
    } else {
      this.setState({ passwordError: false, passwordHelper:  "" })
    }
  
  }

  
  
  handlePasswordChange = e => {
    this.setState({password: e.target.value, passwordError: false, passwordHelper: '', error: ''})
  }

  submitPost = async (e) => {
    this.setState({loading: true, disabled: true,  error: ''}) 

    var echeck = await this.chkPassword();

    if(!this.state.passwordError){

        const data = {
            username: this.state.username,
            serial: this.state.serial,
            password: this.state.password
        }

    const result = await changePassword(data);

    // console.log("res:", res)

    if(result.error){
        this.setState({error: result.error, disabled:false, loading: false}) 
    }

    if(result.status && result.status == "successful"){
        const message = "Password reset successful."
        this.setState({message: message, loading: false}) 
    }

    }

 
 
  }

  render(){

    const { classes, query, config } = this.props;

    if (!query.serial) {
        return (
          <ErrorPage
            errorCode={401}
            user={this.props.user}
            categories={this.props.categories}
          />
        );
      }

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
          Change your password
        </Typography>

        { this.props.user.length > 0 ?
        <form className={classes.form}  noValidate  autoComplete="new-password" disabled={this.state.disabled} onSubmit={e=>e.preventDefault()}>
        <input type="hidden" value="something" />
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
        <TextField
                variant="outlined"
                error={this.state.passwordError}
                helperText={this.state.passwordHelper}
                required
                fullWidth
                id="drowssap"
                label="Enter a new Password"
                type="password"
                name="drowssap"
                value={this.state.password}
                onChange={this.handlePasswordChange}
             onBlur={this.chkPassword}
             autoComplete="new-password"
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
        : 
        <>
        <Grid item xs={12} sm={12}>  
        <p className={classes.error} >Sorry the User Can't be found.  Are you clicking on an old link?</p>
        </Grid>
        </>


            }
      </div>
      <Box mt={8}>
        {/* <Copyright /> */}
      </Box>
    </Container>
  );
}
}



Reset.getInitialProps = async ctx => {
    const {query} = ctx 
    let user;

    if (!query.serial) {
        ctx.res.statusCode = 401;
     
} 
if (query.serial) {        
      user = await checkSerial(query.serial)
}  
      

    

  
    return {
      query: ctx.query,
      user: user
    };
  };

export default withStyles(styles)(Reset);
