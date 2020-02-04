import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Layout from "../components/layout";
import PostPreview from "../components/postPreview";
import config from "../config";
import { withAuth } from "../utils/auth";
import * as Queries from "../utils/queries";
import Search from '../components/search'

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
    [theme.breakpoints.down("md")]: {
      fontSize: "30px",
      lineHeight: "35px"
    }
  },
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
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
      paddingRight: 0
    },
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  mainGrid: {
    marginTop: theme.spacing(3)
  },
  card: {
    display: "flex"
  },
  cardDetails: {
    flex: 1
  },
  subtext: {
    fontFamily: 'Lora, "Times New Roman", Times, Baskerville, Georgia, serif',
    fontSize: "18px",
    [theme.breakpoints.down("md")]: {
      fontSize: "12px"
    }
  },
  cardMedia: {
    width: 160
  },
  hot: {
    color: "#00ffe7"
  },
  free: {
    display: "none"
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
  gitem: {
    padding: "2px !important",
    [theme.breakpoints.up("sm")]: {
      padding: "16px !important"
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
  text: { background: "#e9e7e7", marginTop: "35px" },
  heading: {
    textAlign: "center"
  },
  testimonial: {
    maxWidth: "800px",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "41px 20px",
    fontFamily: 'Lora, "Times New Roman", Times, Baskerville, Georgia, serif'
  },
  flex:{
    justifyContent: "center"
  }
}));

function Index(props) {
  const classes = useStyles();

  const meta = [];

  meta.title = "HotToFind - Free Local Classified Ads | Buy - Sell - Trade";
  meta.description =
    "Free Local classified ad postings.  Buy, Sell, Trade in your city, instantly online.  Register for free";
  return (
    <Layout meta={meta} {...props}>
      <Paper className={classes.mainFeaturedPost}>
        <Container maxWidth="xl">
          {/* Increase the priority of the hero background image */}
          {
            <img
              style={{ display: "none" }}
              src="https://source.unsplash.com/user/erondu"
              alt="background"
            />
          }
          <div className={classes.overlay} />
          <Grid container className={classes.flex}>
            <Grid item md={6}>
              <div className={classes.mainFeaturedPostContent}>
                {/* <Typography component="h1" variant="h3" color="inherit" gutterBottom> */}
                <h1 className={classes.sitename}>
                  {" "}
                  <span className={classes.hot}>HotToFind</span>{" "}
                  <span className={classes.free}>Free Classifieds</span>{" "}
                  <span>{props.country}</span>
                </h1>
                {/* </Typography> */}
                <p className={classes.subtext}>
                  Buy and sell everything from used cars to mobile phones and
                  computers, or search for property, jobs and more
                </p>

                {/* <Search /> */}
                {/* <Link variant="subtitle1" href="#">
                    Continue reading…
                  </Link> */}
              </div>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <div className={classes.mainPosts}>
        <Container maxWidth="xl">
          <Grid container spacing={4} className={classes.grid}>
            <Grid item xs={12} md={12}>
              <h2 className={classes.heading}>Latest Posts</h2>
              <Divider />
            </Grid>
            {props.posts.length > 0
              ? props.posts.map(post => (
                  <Grid
                    className={classes.gitem}
                    item
                    key={`${post.title}-${post.id}`}
                    xs={12}
                    sm={4}
                    md={3}
                    lg={2}
                  >
                    <PostPreview post={post} />
                  </Grid>
                ))
              : ""}
          </Grid>
        </Container>
      </div>
      <div className={classes.text}>
        <Container maxWidth="xl">
          <Grid container spacing={5} className={classes.mainGrid}>
            <Grid item xs={12} md={12}>
              <div className={classes.testimonial}>
                <div className="classes.content">
                  <p className="classes.description">
                    HotToFind is a Free online general purpose classifieds and
                    listing site. Select your country and browse free online
                    classifieds and listing from various categories posted by
                    users in many countries. Buy / Sell / Trade anything online
                    for free. <br />
                    <br /> Sign up and post your ads instantly! <br /> <br />{" "}
                    <br />
                    NOTE: hottofind.com is not responsible for any of the ads
                    posted online so browse carefully.
                  </p>
                  <div className="classes.infoText">
                    <h2>
                      <a href="#">Lisa</a>
                    </h2>
                    <h4>
                      <a href="#">CEO of HotToFind</a>
                    </h4>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Layout>
  );
}

Index.getInitialProps = async (req,ctx) => {
  const { API, COUNTRYCODE } = config;

  //const host  = req.headers.host || window.location.hostname




  const posts = await Queries.getlatest(COUNTRYCODE);

  return { posts: posts };
};

export default withAuth(Index);
