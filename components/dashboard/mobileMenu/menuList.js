import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import { deepPurple } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
// import Context from "../../context";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
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
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "15px",
    letterSpacing: ".12em",
    color: "#717171"
  },
  exicon: {
    color: "#009b9b"
  },
  purpleAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepPurple[500]
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
  const [employmentOpen, setEmploymentOpen] = React.useState(false);
  const [localOpen, setLocalOpen] = React.useState(false);
  const [communityOpen, setCommunityOpen] = React.useState(false);
  const [tradeOpen, setTradeOpen] = React.useState(false);
  const [rentingOpen, setRentingOpen] = React.useState(false);
  const [sellingOpen, setSellingOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [automotiveOpen, setAutomotiveOpen] = React.useState(false);
  const [adultOpen, setAdultOpen] = React.useState(false);

  // const cats = categories()

  // const context = React.useContext(Context);
  const categories = props.categories;

  const handleAccountClick = () => {
    setAccountOpen(!accountOpen);
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
      {props.user ? (
        <>
          <ListItem
            button
            onClick={handleAccountClick}
            className={classes.cats}
          >
            <div className={classes.cats}>
              <Avatar className={classes.purpleAvatar}>OP</Avatar>
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
      <ListItem button  className={classes.cats}>
      <Link href={"/"}><div className={classes.cats}>Home</div></Link>

      </ListItem>
      <ListItem button  className={classes.cats}>
      <Link href={"/dashboard"}><div className={classes.cats}>My Posts</div></Link>

      </ListItem>
      <ListItem button  className={classes.cats}>
      <Link href={"/dashboard/editprofile"}><div className={classes.cats}>Edit Profile</div></Link>

      </ListItem>

      
    </List>
  );
}

export default NestedList;
