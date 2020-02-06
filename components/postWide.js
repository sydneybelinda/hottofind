import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";
import Room from "@material-ui/icons/Room";
import * as React from "react";
import Img from "react-image";
import Moment from "react-moment";
import { makeSlug } from "./constants";

function Capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const styles = theme => ({
  gi: {
    paddingTop: "15px",
    paddingBottom: "15px"
  },
  imageWrap: {
    width: "55px",
    minWidth: "55px",

    position: "relative",
    border: "1px solid #c7c7c7",
    borderRadius: "2px",
    overflow: "hidden",
    display: "inline-block",
    paddingBottom: "115px",
    [theme.breakpoints.up("sm")]: {
      width: "120px",
      minWidth: "120px",
      display: "block",
      paddingBottom: "120px",
      borderTop: "1px solid silver",
      borderBottom: "1px solid silver"
    }
  },
  cat: {
    fontSize: "11px",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "400",
    lineHeight: "1.43",
    letterSpacing: "0.01071em",
    padding: "16px",
    paddingBottom: "2px",
    color: "rgba(0, 0, 0, 0.87)",
    paddingTop: "8px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  },
  date: {
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingBottom: "8px",
    color: "rgba(0, 0, 0, 0.54)",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "400",
    fontSize: "10px",
    lineHeight: "1.43",
    letterSpacing: "0.01071em",
    [theme.breakpoints.up("sm")]: {
      fontSize: "11px"
    }
  },
  cardLeft: {
    display: "flex",
    background: "#e6e6e6",
    textAlign: "right",
    height: "50px",
    [theme.breakpoints.up("sm")]: {
      background: "#e6e6e6",
      textAlign: "left",
      width: "100%"
    }
  },
  cardRight: {
    flex: "0",
    padding: "16px",
    background: "#efefef"
  },
  cHeader: {
    display: "flex",
    position: "absolute",
    left: "30%",
    right: "16px",
    [theme.breakpoints.up("sm")]: {
      position: "relative",
      left: "auto",
      right: "auto"
    }
  },
  price: {
    fontSize: "12px"
  },
  views: {
    color: "black",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "400",
    fontSize: "11px",
    lineHeight: "1.43",
    letterSpacing: "0.01071em",
    position: "absolute",
    right: "0",
    bottom: "0",
    zIndex: "99",
    padding: "5px",
    margin: "4px",
    background: "#ffffffcc",
    borderRadius: "4px"
  },
  viewIcon: {
    height: "11px",
    width: "11px",
    color: "rgba(0, 0, 0, 0.54)",
    lineHeight: "1.43"
  },
  title: {
    fontSize: "16px",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "500",
    // lineHeight: "1.43",
    letterSpacing: "0.01071em",
    color: "black",
    marginTop: "26px",
    padding: "0 15px"
    // padding: "16px",
    // paddingBottom: "2px",
    // color: "rgba(0, 0, 0, 0.87)"
  },
  owner: {
    // paddingLeft: '16px',
    //  paddingBottom: '16px',
    color: "rgba(0, 0, 0, 0.54)",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "400",
    fontSize: "11px",
    lineHeight: "1.43",
    letterSpacing: "0.01071em",
    flex: "1",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    textAlign: "left"
  },
  personIcon: {
    height: "11px",
    width: "11px",
    color: "rgba(0, 0, 0, 0.54)",
    lineHeight: "1.43",
    color: "rgba(0, 0, 0, 0.54)",
    width: "11px",
    height: "11px",
    lineHeight: "1.43",
    position: "relative",
    top: "2px",
    marginRight: "5px"
  },
  location: {
    // paddingLeft: '16px',
    //  paddingBottom: '16px',
    color: "rgba(0, 0, 0, 0.54)",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "400",
    fontSize: "11px",
    lineHeight: "1.43",
    letterSpacing: "0.01071em",
    flex: "1",
    textAlign: "right",
    paddingRight: "15px",
    paddingTop: "16px"
  },
  roomIcon: {
    height: "11px",
    width: "11px",
    color: "rgba(0, 0, 0, 0.54)",
    lineHeight: "1.43",
    color: "rgba(0, 0, 0, 0.54)",
    width: "11px",
    height: "11px",
    lineHeight: "1.43",
    position: "relative",
    top: "2px",
    marginRight: "5px"
  },
  cardBottom: {
    display: "flex"
  },
  card: {
    boxShadow:
      "0 0px 26px 2px rgba(0, 0, 0, 0.14), 0 6px 12px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  price: {
    position: "absolute",
    right: "0",
    padding: "6px",
    zIndex: "99",
    color: "white",
    background: "#3b4f63de",
    borderRadius: "4px",
    margin: "4px"
  },
  content: {
    width: "70%",
    padding: "0",
    float: "right",
    marginTop: "29px",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      float: "none",
      marginTop: "0"
    }
  },
  flexContainer: {
    display: "flex"
  },
  rightContent: {
    flex: 1,
    position: "relative",
    width: "calc(100% - 240px)"
  },
  actions: {
    width: "120px",
    borderLeft: "1px solid #dedede",
    padding: "10px"
  },
  cats: {
    flex: "1"
  },
  loc: {
    flex: "1"
  },
  butDelete: {
    color: "red"
  },
  link: {
    width: "100%",
    minWidth: "100%"
  },
  gitem: {
    padding: "2px 16px !important"
  },
  cardActionArea: {
    width: "100%"
  }
});

class PostPreview extends React.Component {
  _handleViewPost = id => {
    window.location.href = `/post/${id}`;
  };

  render() {
    const { classes } = this.props;
    const { post } = this.props;

    var image;

    if (post.files[0]) {
      image = "/static/uploadedimages/" + post.files[0].name;

      // if (!fs.existsSync(image)) {
      //  image = "/uploadedimages/noimage.jpg";
      // }
    } else image = "/static/uploadedimages/noimage.jpg";

    const dateToFormat = this.props.post.updatedAt;

    return (
      <Grid className={classes.gitem} item  xs={12}>
        <Card className={classes.card}>
          <div className={classes.flexContainer}>
            <Link
              href={`/post/${makeSlug(
                this.props.post.title,
                this.props.post.id
              )}`}
              className={classes.link}
            >
              <CardActionArea
                onClick={() => this._handleViewPost(post.id)}
                className={classes.cardActionArea}
              >
                <div className={classes.flexContainer}>
                  <div className={classes.imageWrap}>
                    {this.props.post.price ? (
                      <div className={classes.price}>
                        ${this.props.post.price}
                      </div>
                    ) : (
                      ""
                    )}
                    <div className={classes.views}>
                      <RemoveRedEye className={classes.viewIcon} />{" "}
                      {this.props.post.views}
                    </div>
                    <Img
                      className="img-responsive"
                      src={[image, "/static/uploadedimages/noimage.jpg"]}
                      alt={this.props.post.title}
                      style={{
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "100%"
                      }}
                    />
                  </div>

                  <div className={classes.rightContent}>
                    <div className={classes.cardLeft}>
                      <div className={classes.cats}>
                        <div className={classes.cat}>
                          {this.props.post.catindex} >{" "}
                          {this.props.post.keyindex}
                        </div>
                        <div className={classes.date}>
                          <Moment
                            date={dateToFormat}
                            format="D MMMM YY - HH:mm"
                          />
                        </div>
                      </div>
                      <div className={classes.loc}>
                        <div className={classes.location}>
                          <Room className={classes.roomIcon} />{" "}
                          {this.props.post.cities
                            ? Capitalize(this.props.post.cities)
                            : ""}
                        </div>
                      </div>
                    </div>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h3"
                      noWrap
                      className={classes.title}
                    >
                      {post.title ? post.title : "untitled"}
                    </Typography>
                  </div>
                </div>
              </CardActionArea>
            </Link>
          </div>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(PostPreview);
