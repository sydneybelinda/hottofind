import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper
    },
    nested: {
      paddingLeft: theme.spacing(4),
      fontSize: "15px",
      letterSpacing: ".12em",
      color: "#0b0b0b",
      fontFamily: "'Montserrat', sans-serif !important"
    },
    cats: {
      fontFamily: "'Montserrat', sans-serif",
      flex: "1 1 auto",
      color: "#000",
      fontSize: "16px",
      textTransform: "uppercase",
      paddingTop: "6px !important",
      paddingBottom: "6px !important"
    },
    lcats: {
      fontFamily: "'Montserrat', sans-serif",
      flex: "1 1 auto",
      color: "#000",
      fontSize: "16px",
      textTransform: "uppercase",
      paddingTop: "6px !important",
      paddingBottom: "6px !important",
      display: "inline-block",
      width: "50%"
    },
    rcats: {
      fontFamily: "'Montserrat', sans-serif",
      flex: "1 1 auto",
      color: "#000",
      fontSize: "16px",
      textTransform: "uppercase",
      paddingTop: "6px !important",
      paddingBottom: "6px !important",
      display: "inline-block",
      width: "50%",
      textAlign: "right"
    },
    fright: {
      float: "right"
    },
    subcat: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: "15px",
      letterSpacing: "normal",
      color: "#717171"
    },
    exicon: {
      color: "#009b9b"
    },
    butWrap: {
      padding: 16,
      textAlign: "center"
    },
    subName: {
      color: "#27ac9f"
    },
    homeLink: {
      display: "flex",
      alignItems: "center",
      width: '100%'
    },
    homeIcon: {
      marginRight: "15px"
    }
    // login: {
    //   float: "right"
    // },
    // register: {
    //   float: "right"
    // }
  }));

function CategoryItem(props) {

    const classes = useStyles();

    const [itemOpen, setItemOpen] = React.useState(false);

    const handleItemClick = () => {
        setItemOpen(!itemOpen);
      };


  return (
    <>
      <ListItem button onClick={handleItemClick} className={classes.cats}>
        <div className={classes.cats}>{props.categories[0].maincategory}</div>
        {itemOpen ? (
          <ExpandLess className={classes.exicon} />
        ) : (
          <ExpandMore className={classes.exicon} />
        )}
      </ListItem>
      <Collapse in={itemOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.categories.length > 0
            ? props.categories.map((prop, key) => {
                  return (
                    <div
                      className={classes.menuItem}
                      key={`${prop.catindex}-${prop.keyindex}`}
                    >
                      <Link href={`/posts/employment/${prop.catindex}/${prop.keyindex}`}>
                        {" "}
                        <ListItem button className={classes.nested}>
                          <div className={classes.subcat}>
                            {prop.subcategory}
                          </div>
                        </ListItem>
                      </Link>
                    </div>
                  );
              })
            : ""}
        </List>
      </Collapse>
    </>
  );
}
export default CategoryItem;
