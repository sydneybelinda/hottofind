import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Img from "react-image";
import Moment from "react-moment";
import {makeSlug} from "./constants"
import Room from "@material-ui/icons/Room";
import Link from "@material-ui/core/Link";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";
import {URL} from '../../config';
import {checkURL} from "../utils/queries";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "100%",
    transition: ".3s ease-in-out",
    display: "flex",
    flexWrap: "wrap",
    position: "relative",
    [theme.breakpoints.up("sm")]: {
        display: "block",
        maxWidth: 345,
    },
    // textDecoration: "none",
    // '& :hover': {
    //     background: "#00baa914"
    // },
    // '& a :hover': {
    //     textDecoration: "none",
    // },

  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cat: {
    fontSize: "10px",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "400",
    lineHeight: "1.43",
    letterSpacing: "0.01071em",
    padding: "0",
    paddingBottom: "2px",
    color: "rgba(0, 0, 0, 0.87)",
    paddingTop: "0",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  imageWrap: {
      height: 120,
      width: 120,
      minWidth: 120,
      overflow: 'hidden',
      order: 0,
      borderRadius: 4,
      border: "1px solid #ebebeb",
      position: "relative",
      alignItems: "center",
    display: "flex",
      [theme.breakpoints.up("sm")]: {
        width: "100%",
        height: 150,
        minWidth: "100%",
      }
  },
  date: {
    // paddingLeft: "16px",
    // paddingRight: "16px",
    // paddingBottom: "8px",
    color: "#96663c",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "400",
    fontSize: "10px",
    lineHeight: "1.43",
    letterSpacing: "0.01071em",
    [theme.breakpoints.up("sm")]: {
      fontSize: "9px"
    }
  },
  title: {
    //fontSize: "16px",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "500",
    marginBottom: 15,
    marginTop:10,
    letterSpacing: "0.01071em",
    color: "black",
    [theme.breakpoints.up("sm")]: {
    marginBottom: "0.10em",
    marginTop:0
    }
  },
  location: {
    // paddingLeft: '16px',
    //  paddingBottom: '16px',
    color: "rgb(0, 148, 135)",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "400",
    fontSize: "11px",
    lineHeight: "1.43",
    letterSpacing: "0.01071em",
    flex: "1",
    textAlign: "right",
    position: "relative",
    [theme.breakpoints.up("sm")]: {
    display: "flex",
    }
  },
  roomIcon: {
    height: "11px",
    width: "11px",
    lineHeight: "1.43",
    color: "rgb(0, 148, 135)",
    width: "11px",
    height: "11px",
    lineHeight: "1.43",
    position: "relative",
    top: "2px",
    marginRight: "5px"
  },
  spanCity: {
    width: "calc(100% - 11px)",
    maxWidth: "calc(100% - 11px)",
    textAlign: "left"
  },
  headerRoot: {
    background: "#ffffff",
    padding: "4px 8px",
    order: 1,
    alignItems: "unset !important",
    width: "calc(100% - 120px)",
    [theme.breakpoints.up("sm")]: {
        width: "100%",
        background: "#00000012",
        }

  },
  contentRoot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    height: 66,
    paddingTop: "0 !IMPORTANT",
    paddingBottom: "0 !important",
    width: "calc(100% - 120px)",
    [theme.breakpoints.up("sm")]: {
      padding: "8px !important",
      width: "100%",
      position: "relative",
      height: 53
    }
  },
  price: {
    position: "absolute",
    right: "0",
    top: "0",
    padding: "6px",
    zIndex: "99",
    color: "white",
    background: "#3b4f63de",
    borderRadius: "4px",
    margin: "4px",
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
  grid: {
    padding: "2px !important",
    [theme.breakpoints.up("sm")]: {
        padding: "8px !important",
      }
  }
}));

function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const { post } = props;

  

  var image;

   if (post.files.length > 0) {
     image = "https://hottofind.com/uploadedimages/" + post.files[0].name;
   } else image = "https://hottofind.com/uploadedimages/noimage.jpg";

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const dateToFormat = props.post.updatedAt;

  const date = <Moment date={dateToFormat} format="D MMMM YY - HH:mm" />

  return (
    <Grid item 
    xs={props.xs}
    sm={props.sm}
    md={props.md}
    lg={props.lg}
    className={classes.grid}
    >
       <Link href={`/post/${makeSlug(post.title, post.id)}`}>
    <Card className={classes.root} variant="outlined">
    
      <CardHeader
       classes={{
           root: classes.headerRoot,
        title: classes.cat, // class name, e.g. `classes-nesting-root-x`
        subheader: classes.date
      }}

        title={`${props.post.catindex} > ${props.post.keyindex}`}
        subheader={date}
      />
      <div className={classes.imageWrap}>

       <Img
              className="img-responsive"
              src={[image, "/static/uploadedimages/noimage.jpg"]}
              alt={props.post.title}
              style={{
                width: "100%",
              }}
            />
                  {props.post.price ? (
              <div className={classes.price}>${props.post.price}</div>
            ) : (
              ""
            )}
            <div className={classes.views}>
              <RemoveRedEye className={classes.viewIcon} />{" "}
              {props.post.views}
            </div>
            </div>
      <CardContent
      classes={{
        root: classes.contentRoot,
   }}

      >
        <Typography 
        variant="body2" 
        color="textSecondary" 
        component="p"
        noWrap
        className={classes.title}
        >
        {post.title }
        </Typography>
        <div className={classes.location}>
             
             <Room className={classes.roomIcon} />{" "}
            
             <span className={classes.spanCity}>
             {props.post.cities
               ? Capitalize(props.post.cities)
               : ""}
               
               </span>
           </div>
      </CardContent>
      
    </Card>
    </Link>
    </Grid>
  );
}