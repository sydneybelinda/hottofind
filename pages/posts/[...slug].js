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
import MediaCard from "../../components/mediaCard";
import PostWide from "../../components/postWide";
import config from "../../config";
import { withAuth } from "../../utils/auth";
import * as Queries from "../../utils/queries";
import Sort from "../../components/sort";
import cookies from "next-cookies";

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
      padding: "8px !important"
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
      display: "block",
      width: "350px",
      height: "100%"
    },
    
    overflow: "hidden",
    marginBottom: "15px",

    width: "100%",

    flex: "none"
  },
  right: {
    [theme.breakpoints.up("sm")]: {
      width: "calc(100% - 350px)"
    },
    width: "100%",
    padding: 5
  },
  cont: {
    display: "block",
    paddingLeft: 0,
    paddingRight: 0,
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      flexDirection: "row",
      paddingLeft: 16,
      paddingRight: 16,
    }
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




  const [data, setData] = useState({
    next: true,
    previous: true,
    limit: 100,
    sort: "latest",
    view: props.defaultView || 'grid',
  });

  const classes = useStyles();

  const total = props.posts.count || 0;

  const acount = props.page * data.limit;

  const router = useRouter();
  const { slug } = router.query;

  var prevpage = parseInt(props.page) - 1;
  var nextpage = parseInt(props.page) + 1;

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
  pLock += `?`;

  if (props.city) {
    pLock += `city=${props.city}`;
  }

  if (category) {
    var cat = category.maincategory;
  } else {
    var cat = "All Posts";
  }

  var sub = `All Posts in ${config.COUNTRYCODE}`;

  const _selectListView = e => {
    setData({view: "list"});
    document.cookie = `defaultView=list; path=/`;
//    window.location.reload()
  };

  const _selectGridView = e => {
    setData({view: "grid"});
    document.cookie = `defaultView=grid; path=/`;
//    window.location.reload()
  };


  const meta = [];

  meta.description = `View all `

  if (category) {
  meta.title = category.maincategory
  meta.description += category.maincategory
  }

  if(subcat){
    meta.title += ` / ${subcat.subcategory} `;
    meta.description += ` / ${subcat.subcategory} `; 
  }

  meta.description += `posts and items advertised for sale `

  if(props.city){
    meta.title += `in ${capitalize(props.city)}`
    meta.description += `in ${capitalize(props.city)}`
  }

  meta.title += ` - HotToFind ${config.COUNTRY}`
  meta.description += ` - HotToFind ${config.COUNTRY}`

 

  return (
    <Layout user={props.user} categories={props.categories} meta={meta}>
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
      <Container maxWidth="xl" className={classes.cont}>
        <div className={classes.left}>
          <div className={classes.filter}>
            <LocationMenu
              cities={props.cities}
              catindex={catindex}
              keyindex={keyindex}
              city={props.city}
            />
          </div>
        </div>
        <div className={classes.right}>
          <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={12} md={12}>
              <Sort
                total={total}
                page={props.page}
                limit={"50"}
                defaultSort={props.defaultSort}
                defaultView={props.defaultView}
                selectListView={_selectListView}
                selectGridView={_selectGridView}
              />
              <Divider />
            </Grid>
            {props.posts.rows
              ? props.posts.rows.map(post => (
                (post.status == "Active") ?
                 (data.view == "grid") ?
                    <MediaCard post={post}
                    key={post.id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    />
                    : 
                   <PostWide post={post}
                   key={post.id}
                   />
                   :
                   ''
            

                ))
              : ""}
          </Grid>
          <div className={classes.pagination}>
            {props.page > 1 ? (
              <Link href={`${pLock.replace("?", "")}`}>First page</Link>
            ) : (
              ""
            )}
            {props.page > 1 ? (
              <Link href={`${pLock}&page=${prevpage}`}>
                <button
                  // onClick={() => router.push(`${pLock}&page=${prevpage}`)}
                  disabled={props.page <= 1}
                >
                  PREV
                </button>
              </Link>
            ) : (
              ""
            )}
            {props.posts.count > acount ? (
              <Link href={`${pLock}&page=${nextpage}`}>
                <button
                // onClick={() => router.push(`${pLock}&page=${nextpage}`)}
                >
                  NEXT
                </button>
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </Container>
    </Layout>
  );
}

Posts.getInitialProps = async ctx => {
  const data = await Queries.getPage(ctx);

  const defaultSort = await cookies(ctx).defaultSort;
  const defaultView = await cookies(ctx).defaultView;

  return {
    posts: data.posts,
    cities: data.cities,
    page: data.page,
    city: data.city,
    query: ctx.query,
    defaultSort: defaultSort,
    defaultView: defaultView
  };
};

export default withAuth(Posts);
