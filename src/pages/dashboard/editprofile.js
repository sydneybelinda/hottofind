import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Breadcrumbs from "../../components/dashboard/breadcrumbs";
import DashboardMenu from "../../components/dashboard/dashboardMenu";
import Layout from "../../components/layout";
import ProfileForm from "../../components/dashboard/profileForm";

import { withAuth } from "../../utils/auth";
import * as Queries from "../../utils/queries";
import getConfig from "../../../confignew";


const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto"
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0
  },
  sitename: {
    fontSize: "46px",
    lineHeight: "40px",
    marginBottom: "0",
    [theme.breakpoints.down("md")]: {
      fontSize: "30px",
      lineHeight: "35px"
    }
  },
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: 0,
    backgroundImage: "url(https://source.unsplash.com/user/erondu)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)"
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      marginTop: 35,
      paddingRight: 0
    }
  },
  mainGrid: {
    marginTop: theme.spacing(3)
  },
  card: {
    display: "flex",
    padding: "15px"
  },
  cardDetails: {
    flex: 1
  },
  subtext: {
    fontFamily: 'Lora, "Times New Roman", Times, Baskerville, Georgia, serif',
    fontSize: "18px",
    minHeight: "25.6px",
    [theme.breakpoints.down("md")]: {
      fontSize: "12px"
    },
    margin: 0,
    marginLeft: "3px"
  },
  cardMedia: {
    width: 160
  },
  hot: {
    color: "#00ffe7"
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0)
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200]
  },
  sidebarSection: {
    marginTop: theme.spacing(3)
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0)
  },
  mainCat: {
    fontWeight: "400"
  },
  gitem: {
    padding: "2px !important",
    [theme.breakpoints.up("sm")]: {
      padding: "2px 16px  !important"
    }
  },
  grid: {
    paddingLeft: "5px",
    paddingRight: "5px",
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "20px",
      paddingRight: "20px"
    }
  },
  left: {
    [theme.breakpoints.up("sm")]: {
      display: "block"
    },
    display: "none",
    width: "350px",
    flex: "none"
  },
  right: {
    [theme.breakpoints.up("sm")]: {
      width: "calc(100% - 350px)"
    },
    width: "100%"
  },
  cont: {
    display: "flex",
    flexDirection: "row"
  },
  city: {
    textTransform: "capitalize"
  },
  pagination: {
    marginTop: "30px",
    marginBottom: "50px",
    textAlign: "right",
    borderTop: "1px solid silver",
    padding: "5px"
  },
  card: {
    padding: "14px",
    boxShadow:
      "0 0px 26px 2px rgba(0, 0, 0, 0.14), 0 6px 12px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
}));

function EditProfile(props) {
  const user = props.data;

  const classes = useStyles();



  return (
    <Layout user={props.user} categories={props.categories}>
      <Paper className={classes.mainFeaturedPost}>
        <Container maxWidth="xl">
          {
            <img
              style={{ display: "none" }}
              src="https://source.unsplash.com/user/erondu"
              alt="background"
            />
          }
          <div className={classes.overlay} />
          <Grid container>
            <Grid item md={6}>
              <div className={classes.mainFeaturedPostContent}>
                <h1 className={classes.sitename}>Dashboard - Edit Profile</h1>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Breadcrumbs pageName="New Post" />
      <Container maxWidth="xl" className={classes.cont}>
        <div className={classes.left}>
          <div className={classes.filter}>
            <DashboardMenu />
          </div>
        </div>
        <div className={classes.right}>
          <Grid container spacing={4} className={classes.grid}>
            <Grid item xs={12} md={12}>
              <Card className={classes.card}>
              <ProfileForm
                    userdata={props.userdata}
                    user={props.user}
                    categories={props.categories}
                    citydata={props.citydata}
                    config={props.config}
                  />
                  </Card>
            </Grid>

          </Grid>

        </div>
      </Container>
    </Layout>
  );
}

EditProfile.getInitialProps = async (ctx) => {
  const {config} = getConfig(ctx.req) ;

  console.log(config)

  let userdata = await Queries.checkUserLogin(ctx, config);
  if (userdata) {
    let citydata = await Queries.getAllCities(config);

    return { userdata, citydata };
  }
};

export default withAuth(EditProfile);
