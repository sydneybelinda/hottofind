import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import fetch from "isomorphic-unfetch";
import nextCookie from "next-cookies";
import Router from "next/router";
import React from "react";
import Layout from "../components/layout";
import StatTable from "../components/statTable";
import { URL } from "../../config";
import { withAuthSync } from "../utils/auth";
import getHost from "../utils/get-host";

const meta = [];

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
  page: {
    padding: "20px 0"
  },

  mainPic: {
    height: "50vh",
    textAlign: "center",
    padding: "20px",
    "& img": {
      height: "100%",
      width: "auto",
      borderRadius: "0.5rem"
    }
  },
  stats: {
    paddingBottom: "20px",
    maxWidth: "800px",
    marginLeft: "auto",
    marginRight: "auto"
  }
}));

const Profile = props => {
  const { username, email, name, login, bio, avatar } = props.data;
  const classes = useStyles();

  let avatarUrl = "";

  if (avatar) {
    avatarUrl = `${URL}/uploadedimages/profile/${avatar}`;
  } else {
    avatarUrl = `${URL}/uploadedimages/noimage.jpg`;
  }

  return (
    <Layout user={props.user} categories={props.categories}>
      {/* Main featured post */}
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
          <Grid container>
            <Grid item md={6}>
              <div className={classes.mainFeaturedPostContent}>
                <h1 className={classes.sitename}>{username}</h1>
                <p className={classes.subtext}> </p>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      {/* <Breadcrumbs
        query={props.query}
        categories={props.categories}
      /> */}
      {/* End main featured post */}
      {/* Sub featured posts */}
      <Container maxWidth="xl" className={classes.cont}>
        <div className={classes.page}>
          <Paper className={classes.table} variant="outlined">
            <div className={classes.mainPic}>
              <img src={avatarUrl} alt={name} />
            </div>
            <div className={classes.stats}>
              <StatTable data={props.data} />
            </div>
          </Paper>
        </div>
      </Container>
    </Layout>

    // <Layout user={props.user} categories={props.categories} meta={meta}>
    //    <img src={avatar} alt={name} />
    //   <h1>{name}</h1>
    //   <p className='lead'>{login}</p>
    //   <p>{bio}</p>

    //   <style jsx>{`
    //     img {
    //       max-width: 200px;
    //       border-radius: 0.5rem;
    //     }

    //     h1 {
    //       margin-bottom: 0;
    //     }

    //     .lead {
    //       margin-top: 0;
    //       font-size: 1.5rem;
    //       font-weight: 300;
    //       color: #666;
    //     }

    //     p {
    //       color: #6a737d;
    //     }
    //   `}</style>
    // </Layout>
  );
};

Profile.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx);

  const apiUrl = getHost(ctx.req) + "/api/profile";

  const redirectOnError = () =>
    typeof window !== "undefined"
      ? Router.push("/login")
      : ctx.res.writeHead(302, { Location: "/login" }).end();

  try {
    const response = await fetch(apiUrl, {
      credentials: "include",
      headers: {
        Authorization: token
      }
    });

    if (response.ok) {
      const js = await response.json();

      return js;
    } else {
      return await redirectOnError();
    }
  } catch (error) {
    // Implementation or Network error
    return redirectOnError();
  }
};

export default withAuthSync(Profile);
