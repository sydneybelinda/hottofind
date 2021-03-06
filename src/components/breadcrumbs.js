import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: "center",
    flexWrap: "wrap"
  },
  paper: {
    padding: theme.spacing(1, 2),
    padding: "10px 30px",
    position: "relative",
    background: "#3b4f6326",
    marginBottom: "25px"
  }
}));

function handleClick(event) {
  event.preventDefault();
  alert("You clicked a breadcrumb.");
}

export default function CustomSeparator(props) {
  const classes = useStyles();

  //if(props.query.catindex){
  const category = props.categories.find(
    e => e.catindex === props.query.catindex
  );
  //  }
  //if(props.query.keyindex){
  const subcat = props.categories.find(
    e => e.keyindex === props.query.keyindex
  );
  //   }

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link color="inherit" href="/">
            Home
          </Link>
          {!props.query.catindex ? (
            <Typography color="textPrimary">All Posts</Typography>
          ) : (
            ""
          )}
          {props.query.catindex ? (
            <Link color="inherit" href="/posts">
              All Posts
            </Link>
          ) : (
            ""
          )}

          {props.query.catindex && props.query.keyindex ? (
            <Link color="inherit" href={`/posts/${props.query.catindex}`}>
              {category.maincategory}
            </Link>
          ) : (
            ""
          )}

          {props.query.catindex && !props.query.keyindex ? (
            <Typography color="textPrimary">{category.maincategory}</Typography>
          ) : (
            ""
          )}

          {props.query.keyindex ? (
            <Typography color="textPrimary">{subcat.subcategory}</Typography>
          ) : (
            ""
          )}
        </Breadcrumbs>
      </Paper>
    </div>
  );
}
