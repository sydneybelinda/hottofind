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
import UserPosts from "../../components/dashboard/userPosts";
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
    minHeight: "100vh",
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
  fixedHeight: {
    height: 240
  }
}));

const Dashboard = props => {
  const meta = [];
  meta.title = `HotToFind - ${props.user.username} Dashboard`;
  meta.description =
    "Free Local classified ad postings.  Buy, Sell, Trade in your city, instantly online.  Register for free";

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Layout user={props.user} categories={props.cat} meta={meta}>
      <div className={classes.root}>
        <CssBaseline />
        <Header />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <UserPosts posts={props.posts} />
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

Dashboard.getInitialProps = async ctx => {
  let user = await Queries.checkUserLogin(ctx);
  if (user) {
    let posts = await Queries.getUserPosts(user.username);
    return { user, posts };
  }
};

export default withAuthSync(Dashboard);
