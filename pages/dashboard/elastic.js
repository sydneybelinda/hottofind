import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import cookies from "next-cookies";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Breadcrumbs from "../../components/dashboard/breadcrumbs";
import DashboardMenu from "../../components/dashboard/dashboardMenu";
import Layout from "../../components/dashboard/layoutold";
import PostWide from "../../components/dashboard/postWide";
import Sort from "../../components/dashboard/sort";
import { withAuth } from "../../utils/auth";
import * as Queries from "../../utils/queries";
import Button from "@material-ui/core/Button";
import Elasticsearch from "elasticsearch";

// const client = Client({ node: 'http://db.hottofind.com:9200' })

var client = new Elasticsearch.Client({  // default is fine for me, change as you see fit
    host: 'db.hottofind.com:9200',
    log: 'trace',
    apiVersion: '7.5',
  });

const styles = theme => ({
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
  }
});

class Elastic extends React.Component {
  constructor(props) {
    super(props);

    this.ref1 = React.createRef();

    this.state = {
response: ''
    };
  }

  updateIndex = async e => {
    //this.setState({ cities: e.target.value });

   // const posts = await Queries.getAllPosts()

const id = '40';

   const posts = await Queries.getAllPosts()

   // const posts = await Queries.getPost(id);

    //console.log(posts)

    for (var i = 0; i < posts.length; i++ ) {
 var index = await client.index({
        index: 'hottofind',
        // type: '_doc', // uncomment this line if you are using {es} ≤ 6
        body: posts
      })

      console.log(index)

    }
    //  this.setState({ response: index });

    // for (var i = 0; i < posts.length; i++ ) {
    //     client.create({
    //       index: "hottofind", // name your index
    //       type: "post", // describe the data thats getting created
    //       id: i, // increment ID every iteration - I already sorted mine but not a requirement
    //       body: posts[i] // *** THIS ASSUMES YOUR DATA FILE IS FORMATTED LIKE SO: [{prop: val, prop2: val2}, {prop:...}, {prop:...}] - I converted mine from a CSV so pubs[i] is the current object {prop:..., prop2:...}
    //     }, function(error, response) {
    //       if (error) {
    //         this.setState({ response: error });
    //         console.error(error);
    //         return;
    //       }
    //       else {
    //           this.setState({ response: response });
    //       console.log(response);  //  I don't recommend this but I like having my console flooded with stuff.  It looks cool.  Like I'm compiling a kernel really fast.
    //       }
    //     });
    //   }

  };

  render() {
    const { classes } = this.props;

    return (
      <Layout user={this.props.user} categories={this.props.categories}>
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
                  <h1 className={classes.sitename}>Elastic</h1>
                </div>
              </Grid>
            </Grid>
          </Container>
        </Paper>
        <Breadcrumbs pageName="My Posts" />
        <Container maxWidth="xl" className={classes.cont}>
          <div className={classes.left}>
            <div className={classes.filter}>
              <DashboardMenu />
            </div>
          </div>
          <div className={classes.right}>
            <Grid container spacing={4} className={classes.grid}>
              <Grid item xs={12} md={12}>
                <Button variant="outlined" onClick={this.updateIndex}>Update Elastic Index</Button>
                <div className={classes.output}>{this.state.response}</div>
              </Grid>
            </Grid>
          </div>
        </Container>
      </Layout>
    );
  }
}

Elastic.getInitialProps = async ctx => {
  const defaultSort = cookies(ctx).defaultSort;

  let user = await Queries.checkUserLogin(ctx);
  if (user) {
    let posts = await Queries.getUserPosts(user.username, ctx);
    return {
      user,
      posts,
      //        page: data.page,
      query: ctx.query,
      defaultSort: defaultSort
    };
  }
};

export default withAuth(withStyles(styles)(Elastic));
