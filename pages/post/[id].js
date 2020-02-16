import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";
import { useRouter } from "next/router";
import Moment from "react-moment";
import nl2br from "react-nl2br";
import ImageGallery from "../../components/imageGallery";
import Layout from "../../components/layout";
import PostBreadcrumbs from "../../components/PostBreadcrumbs";
import { withAuth } from "../../utils/auth";
import * as Queries from "../../utils/queries";
import {getSlug} from "../../components/constants";
import Divider from "@material-ui/core/Divider";

// const nl2br = require("react-nl2br");

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
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(/static/images/index_hero.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    boxShadow: "#64706e 4px 4px 6px"
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
  cardMedia: {
    width: 160
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
  truncate: {
    width: "250px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  mainWrap: {
    background: "white",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
    overflow: "hidden",
    padding: "5px",
    borderTop: "1px solid #e7e7e7"
  },
  innerWrap: {
    padding: "15px"
  },
  price: {
    color: "#001dff",
    fontSize: "17px",
    textAlign: "right",
    fontWeight: "300"
  },
  location: {
    textTransform: "uppercase",
    color: "#a2a2a2",
    fontSize: "16px",
    marginTop: "5px",
    textAlign: "left"
  },
  views: {
    color: "#a2a2a2",
    fontSize: "12px",
    marginTop: "5px",
    textAlign: "right"
  },
  description: {
    marginTop: "15px",
    paddingRight: "15px",
    textAlign: "left",
    fontFamily: 'Lora, "Times New Roman", Times, Baskerville, Georgia, serif'
  },
  box: {
    marginTop: "15px",
    border: "3px solid #a9878673",
    padding: "15px",
    borderRadius: "4px"
  },
  dateupdated: {
    marginTop: "10px"
  },
  userbox: {
    background: "white",
    marginLeft: "15px",
    marginTop: "15px",
    padding: "15px"
  },
  icon: {
    width: "50px",
    height: "50px",
    border: "1px solid",
    color: "green",
    borderRadius: "25px",
    padding: "5px"
  },
  viewicon: {
    width: "14px",
    height: "14px",
    color: "green",
    borderRadius: "14px"
  },
  contact: {
    marginTop: "30px"
  },
  cicon: {
    fontSize: "16px",
    marginRight: "30px",
    marginLeft: "15px",
    color: "#ac8988"
  },
  phone: {
    fontSize: "16px",
    marginBottom: "5px",
    fontWeight: "600",
    color: "black"
  },
  owner: {
    fontSize: "16px",
    fontWeight: "600",
    color: "black",
    padding: 16,
    textAlign: "center"
  },
  mainPost: {
    width: "100%",
    boxShadow:
      "0 0px 26px 2px rgba(0, 0, 0, 0.14), 0 6px 12px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);",
    position: "relative"
  },
  mainContainer: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      padding: "30px",
      paddingTop: "10px"
    },
    padding: "5px",
    paddingTop: "5px",
    background: "#f6f6f6"
  },
  sidebar: {
    background: "white",
    padding: "15px",
    borderRadius: "5px",
    "& h4": {
      marginBottom:0,
      fontSize: 14
    }
  },
  gallery: {
    background: "white",
    //     boxShadow: '0 0px 26px 2px rgba(0, 0, 0, 0.14), 0 6px 12px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);',
    // position: 'relative',
    zIndex: "10"
  },
  text: {
    marginLeft: 30,
    color: "#000000",
    fontWeight: "400"
  }
}));

function Post(props) {
  const classes = useStyles();

  const router = useRouter();
  const { id } = router.query;

  const { post } = props;

  const createdAt = props.post.createdAt;
  const updatedAt = props.post.updatedAt;

  if (props.post.files[0]) {
    var file = "url(/uploadedimages/" + props.post.files[0].name + ")";
  } else {
    var file = "url(/uploadedimages/noimage.jpg)";
  }
  const mainImage = {
    backgroundImage: file,
    backgroundSize: "cover",
    backgroundPosition: "center",
    WebkitTransition: "all", // note the capital 'W' here
    msTransition: "all", // 'ms' is the only lowercase vendor prefix}
    width: "100%",
    height: "60vh"
  };

  const category = props.categories.find(
    e => e.catindex === props.query.catindex
  );


  const subcat = props.categories.find(
    e => e.keyindex === props.query.keyindex
  );

  return (
    <Layout user={props.user} categories={props.categories}>
      <PostBreadcrumbs post={props.post} categories={props.categories} />
      <div className={classes.sections}>
        <div className={classes.mainContainer}>
          <div className={classes.mainPost}>
            <Grid container spacing={2} className={classes.cardGrid}>
              <Grid item xs={12} md={8}>
                <div className={classes.gallery}>
                  <ImageGallery files={props.post.files} />
                </div>

                <div className={classes.mainWrap}>
                  {/* <div style={mainImage} /> */}

                  <div className={classes.innerWrap}>
                    <Grid container>
                      <Grid item xs={12} md={10}>
                        <div className={classes.title}>
                          <h2>{post.title}</h2>
                        </div>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <div className={classes.price}>
                          <h4 className={classes.price}>
                            {post.price ? `$${post.price}` : ""}
                          </h4>
                        </div>
                      </Grid>
                      <Grid item xs={12} md={10}>
                        <div className={classes.location}>
                          {post.location} - {post.cities}, {post.country}
                        </div>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <div className={classes.views}>
                          <RemoveRedEye className={classes.viewicon} />{" "}
                          {props.post.views}
                        </div>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <p className={classes.description}>
                          {nl2br(post.description)}
                        </p>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <div className={classes.box}>
                          <div className={classes.datelisted}>
                            Date Listed: <Moment date={createdAt} />
                          </div>
                          <div className={classes.dateupdated}>
                            Date updated: <Moment date={updatedAt} />
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className={classes.sidebar}>
                  <Grid container>
         
         <Grid item xs={12} md={12}>
           <h2 className={classes.heading}>Contact Details</h2>
           <Divider />
         </Grid>
                    <Grid item xs={12} md={12}>
                      <div className={classes.owner}>
                        <h4>{post.owner}</h4>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <div className={classes.email}>
                        <h4>
                          Name: <span className={classes.text}>{post.firstname} {post.lastname ? post.lastname : '' } </span>
                        </h4>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <div className={classes.email}>
                        <h4>
                          Email: <span className={classes.text}><a href={`mailto:${post.email}`}>{post.email}</a></span>
                        </h4>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <div className={classes.phone}>
                        <h4>
                          Phone: <span className={classes.text}><a href={`tel:${post.phone}`}>{post.phone}</a></span></h4>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <div className={classes.website}>
                        <h4>
                          Website: <span className={classes.text}><a href={post.website} target="_blank">{post.website}</a></span>
                        </h4>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </Layout>
  );
}

Post.getInitialProps = async ({ query, req }) => {
  const id = getSlug(query.id);

  let viewCount = await Queries.incrementViewCount(id);

  let post = await Queries.getPost(id);
  return { query, post };
};

export default withAuth(Post);
