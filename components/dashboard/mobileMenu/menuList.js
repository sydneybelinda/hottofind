import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import { deepPurple } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
// import Context from "../../context";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import React from "react";

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
  purpleAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepPurple[500]
  },
  butWrap: {
    padding: 16,
    textAlign: "center"
  }
  // login: {
  //   float: "right"
  // },
  // register: {
  //   float: "right"
  // }
}));

function NestedList(props) {
  const classes = useStyles();
  const [accountOpen, setAccountOpen] = React.useState(false);
  const [countryOpen, setCountryOpen] = React.useState(false);

  // const cats = categories()

  // const context = React.useContext(Context);
  const categories = props.categories;

  const handleAccountClick = () => {
    setAccountOpen(!accountOpen);
  };
  const handleCountryClick = () => {
    setCountryOpen(!countryOpen);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Menu
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button onClick={handleCountryClick} className={classes.cats}>
        <div className={classes.cats}>Countries</div>
        {countryOpen ? (
          <ExpandLess className={classes.exicon} />
        ) : (
          <ExpandMore className={classes.exicon} />
        )}
      </ListItem>
      <Collapse in={countryOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link href="https://au.hottofind.com">
            <ListItem button className={classes.nested}>
              <div className={classes.subcat}>Australia</div>
            </ListItem>
          </Link>
        </List>
        <List component="div" disablePadding>
          <Link href="https://hottofind.com">
            <ListItem button className={classes.nested}>
              <div className={classes.subcat}>United States</div>
            </ListItem>
          </Link>
        </List>
        <List component="div" disablePadding>
          <Link href="https://ca.hottofind.com">
            <ListItem button className={classes.nested}>
              <div className={classes.subcat}>Canada</div>
            </ListItem>
          </Link>
        </List>
        <List component="div" disablePadding>
          <Link href="https://in.hottofind.com">
            <ListItem button className={classes.nested}>
              <div className={classes.subcat}>India</div>
            </ListItem>
          </Link>
        </List>
        <List component="div" disablePadding>
          <Link href="https://eu.hottofind.com">
            <ListItem button className={classes.nested}>
              <div className={classes.subcat}>Europe</div>
            </ListItem>
          </Link>
        </List>
        <List component="div" disablePadding>
          <Link href="https://uk.hottofind.com">
            <ListItem button className={classes.nested}>
              <div className={classes.subcat}>United Kingdom</div>
            </ListItem>
          </Link>
        </List>
        <List component="div" disablePadding>
          <Link href="https://za.hottofind.com">
            <ListItem button className={classes.nested}>
              <div className={classes.subcat}>South Africa</div>
            </ListItem>
          </Link>
        </List>
        <List component="div" disablePadding>
          <Link href="https://sq.hottofind.com">
            <ListItem button className={classes.nested}>
              <div className={classes.subcat}>Singapore</div>
            </ListItem>
          </Link>
        </List>
        <List component="div" disablePadding>
          <Link href="https://sa.hottofind.com">
            <ListItem button className={classes.nested}>
              <div className={classes.subcat}>South America</div>
            </ListItem>
          </Link>
        </List>
      </Collapse>

      <Divider />

      <Link href="/dashboard/newpost">
        <ListItem button className={classes.cats}>
          New Post
        </ListItem>
      </Link>
      {props.user ? (
        <>
          <ListItem
            button
            onClick={handleAccountClick}
            className={classes.cats}
          >
            <div className={classes.cats}>
            <AccountCircle />
            </div>
            {accountOpen ? (
              <ExpandLess className={classes.exicon} />
            ) : (
              <ExpandMore className={classes.exicon} />
            )}
          </ListItem>

          <Collapse in={accountOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <div className={classes.menuItem}>
                <Link href={"/dashboard"}>
                  <ListItem button className={classes.nested}>
                    <div className={classes.subcat}>Dashboard</div>
                  </ListItem>
                </Link>
              </div>
              <div className={classes.menuItem}>
                <Link href={"/logout"}>
                  <ListItem button className={classes.nested}>
                    <div className={classes.subcat}>Logout</div>
                  </ListItem>
                </Link>
              </div>
            </List>
          </Collapse>
        </>
      ) : (
        <>
          <ListItem button className={classes.lcats}>
            <Link href={"/login"}>
              <div>Login</div>
            </Link>
          </ListItem>
          <ListItem button className={classes.rcats}>
            <Link href={"/register"}>
              <div>Register</div>
            </Link>
          </ListItem>
        </>
      )}
      <Divider />
      <ListItem button className={classes.cats}>
        <Link href={"/"}>
          <div className={classes.cats}>Home</div>
        </Link>
      </ListItem>
      <ListItem button className={classes.cats}>
        <Link href={"/dashboard"}>
          <div className={classes.cats}>My Posts</div>
        </Link>
      </ListItem>
      <ListItem button className={classes.cats}>
        <Link href={"/dashboard/editprofile"}>
          <div className={classes.cats}>Edit Profile</div>
        </Link>
      </ListItem>
    </List>
  );
}

export default NestedList;
