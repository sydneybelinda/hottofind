import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Breadcrumbs from "../../components/breadcrumbs";
import Layout from "../../components/layout";
import LocationMenu from "../../components/LocationMenu";
import PostPreview from "../../components/postPreview";
import config from "../../config";
import { withAuth } from "../../utils/auth";

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
      paddingRight: 0
    }
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
  }
}));

function Posts(props) {
  const [data, setData] = useState({ next: true, previous: true });

  const classes = useStyles();

  const acount = props.page * 100;

  const router = useRouter();
  const { slug } = router.query;

  const capitalize = s => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const catindex = slug[0];
  const keyindex = slug[1];

  const category = props.categories.find(e => e.catindex === catindex);

  //  }
  //if(props.query.keyindex){
  const subcat = props.categories.find(e => e.keyindex === keyindex);

  var pLock = "/posts";

  if (catindex) {
    pLock += `/${catindex}`;
  }
  if (keyindex) {
    pLock += `/${keyindex}`;
  }
  if (props.city) {
    pLock += `?city=${props.city}`;
  }

  // if(keyindex){
  //  pLock = `/${catindex}/${keyindex}`
  // } else {
  //    pLock = `/${catindex}`
  // }

  // var cty;

  // if (props.city){
  //   cty = `&city=${props.city}`
  // }

  if (category) {
    var cat = category.maincategory;
  } else {
    var cat = "All Posts";
  }

  var sub = `All Posts in ${config.COUNTRYCODE}`;

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
                <h1 className={classes.sitename}>
                  {" "}
                  {subcat ? (
                    <span className={classes.hot}>{subcat.subcategory}</span>
                  ) : (
                    <span className={classes.hot}>{cat}</span>
                  )}
                  {props.city ? (
                    <span className={classes.city}>
                      {" "}
                      {capitalize(props.city)}
                    </span>
                  ) : (
                    ""
                  )}
                </h1>
                {subcat ? (
                  <p className={classes.subtext}>{category.maincategory}</p>
                ) : (
                  <p className={classes.subtext}> </p>
                )}
              </div>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Breadcrumbs query={props.query} categories={props.categories} />
      {/* End main featured post */}
      {/* Sub featured posts */}
      <Container maxWidth="xl" className={classes.cont}>
        <div className={classes.left}>
          <div className={classes.filter}>
            {/* <PostAccordian categories={props.categories} catindex={catindex} keyindex={keyindex}  /> */}
            <LocationMenu
              cities={props.cities}
              catindex={catindex}
              keyindex={keyindex}
              city={props.city}
            />
          </div>
        </div>
        <div className={classes.right}>
          <Grid container spacing={4} className={classes.grid}>
            <Grid item xs={12} md={12}>
              {/* <h2>Latest Posts</h2> */}
              <Divider />
            </Grid>
            {props.posts.rows
              ? props.posts.rows.map(post => (
                  <Grid
                    className={classes.gitem}
                    item
                    key={post.id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                  >
                    <PostPreview post={post} />
                  </Grid>
                ))
              : ""}
          </Grid>
          {/* End sub featured posts */}
          <div className={classes.pagination}>
            {props.page > 1 ? (
              <Link href={`/posts${pLock}`}>
                <a>First page</a>
              </Link>
            ) : (
              ""
            )}
            {props.page > 1 ? (
              <button
                onClick={() => router.push(`${pLock}&page=${props.page - 1}`)}
                disabled={props.page <= 1}
              >
                PREV
              </button>
            ) : (
              ""
            )}
            {props.posts.count > acount ? (
              <button
                onClick={() => router.push(`${pLock}&page=${props.page + 1}`)}
              >
                NEXT
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </Container>
    </Layout>
  );
}

Posts.getInitialProps = async ({ query }) => {
  // const res = await fetch('http://localhost:3000/api/posts/latest');

  const { API, COUNTRYCODE } = config;
  const { city, page = 1 } = query;

  //   let page = 1
  //  if(query.page){
  //   page = query.page
  //  }

  let url = `${API}/posts/get?countrycode=${COUNTRYCODE}`;

  if (query.catindex) {
    url += `&catindex=${query.catindex}`;
  }
  if (query.keyindex) {
    url += `&keyindex=${query.keyindex}`;
  }

  if (city) {
    url += `&city=${city}`;
  }

  if (page) {
    url += `&page=${page}`;
  }

  const res = await fetch(url);
  let data = await res.json();

  const urlb = `${API}/city/get/${COUNTRYCODE}`;
  const resb = await fetch(urlb);
  let cities = await resb.json();

  return {
    posts: data,
    cities: cities,
    page: parseInt(page, 10),
    city: city,
    query: query
  };
};

export default withAuth(Posts);
