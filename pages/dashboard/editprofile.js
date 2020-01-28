import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import Footer from "../../components/dashboard/footer";
import Header from "../../components/dashboard/header";
import Layout from "../../components/dashboard/layout";
import ProfileForm from "../../components/dashboard/profileForm";
import { withAuthSync } from "../../utils/auth";
import * as Queries from "../../utils/queries";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  paperCust: {
    padding: "24px"
  },
  fixedHeight: {
    height: 240
  }
}));

const EditProfile = props => {
  const user = props.data;

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Layout user={props.user} categories={props.cat}>
      <div className={classes.root}>
        <CssBaseline />
        <Header />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <h1>Edit Profile</h1>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper className={classes.paperCust}>
                  <ProfileForm
                    userdata={props.userdata}
                    user={props.user}
                    categories={props.categories}
                    citydata={props.citydata}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
          <Footer />
        </main>
      </div>
    </Layout>
  );
};

EditProfile.getInitialProps = async ctx => {
  let userdata = await Queries.checkUserLogin(ctx);
  if (userdata) {
    let citydata = await Queries.getAllCities();

    return { userdata, citydata };
  }
};

export default withAuthSync(EditProfile);
