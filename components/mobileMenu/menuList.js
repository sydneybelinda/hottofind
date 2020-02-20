import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import { deepPurple } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import AccountCircle from "@material-ui/icons/AccountCircle";
// import Context from "../../context";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import HomeIcon from "@material-ui/icons/Home";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import React from "react";
import CategoryItem from "./categoryItem";

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
  },
  subName: {
    color: "#27ac9f"
  },
  homeLink: {
    display: "flex",
    alignItems: "center",
    width: "100%"
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

function NestedList(props) {
  const classes = useStyles();
  const [accountOpen, setAccountOpen] = React.useState(false);
  const [employmentOpen, setEmploymentOpen] = React.useState(false);
  const [localOpen, setLocalOpen] = React.useState(false);
  const [countryOpen, setCountryOpen] = React.useState(false);
  const [communityOpen, setCommunityOpen] = React.useState(false);
  const [tradeOpen, setTradeOpen] = React.useState(false);
  const [rentingOpen, setRentingOpen] = React.useState(false);
  const [sellingOpen, setSellingOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [automotiveOpen, setAutomotiveOpen] = React.useState(false);
  const [adultOpen, setAdultOpen] = React.useState(false);
  const [artOpen, setArtOpen] = React.useState(false);

  // const cats = categories()

  // const context = React.useContext(Context);
  const categories = props.categories;

  const handleAccountClick = () => {
    setAccountOpen(!accountOpen);
  };

  const handleEmploymentClick = () => {
    setEmploymentOpen(!employmentOpen);
  };
  const handleLocalClick = () => {
    setLocalOpen(!localOpen);
  };
  const handleCountryClick = () => {
    setCountryOpen(!countryOpen);
  };
  const handleCommunityClick = () => {
    setCommunityOpen(!communityOpen);
  };
  const handleTradeClick = () => {
    setTradeOpen(!tradeOpen);
  };
  const handleRentingClick = () => {
    setRentingOpen(!rentingOpen);
  };
  const handleSellingClick = () => {
    setSellingOpen(!sellingOpen);
  };
  const handleServicesClick = () => {
    setServicesOpen(!servicesOpen);
  };
  const handleAutomotiveClick = () => {
    setAutomotiveOpen(!automotiveOpen);
  };
  const handleAdultClick = () => {
    setAdultOpen(!adultOpen);
  };
  const handleArtClick = () => {
    setArtOpen(!artOpen);
  };

  var mainCats = [];
  props.categories.forEach(function(item){
  var i = mainCats.findIndex(x => x.catindex == item.catindex);
  if(i <= -1){
    mainCats.push(item);
  }
});

  //   const result = props.categories.filter(item => item.catindex === "art-collectables")
  // console.log(result);


  console.log(mainCats)

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
                <Link href={"/dashboard/newpost"}>
                  <ListItem button className={classes.nested}>
                    <div className={classes.subcat}>Create New Post</div>
                  </ListItem>
                </Link>
                <Link href={"/dashboard"}>
                  <ListItem button className={classes.nested}>
                    <div className={classes.subcat}>My Posts</div>
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

      <ListSubheader
        component="div"
        id="nested-list-subheader"
        className={classes.subName}
      >
        Pages
      </ListSubheader>

      <ListItem button className={classes.cats}>
        <Link href={"/"} className={classes.homeLink}>
          <HomeIcon className={classes.homeIcon} />
          <div className={classes.cats}>Home</div>
        </Link>
      </ListItem>

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
          <Link href="https://sg.hottofind.com">
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

      <ListSubheader
        component="div"
        id="nested-list-subheader"
        className={classes.subName}
      >
        Categories
      </ListSubheader>

      {
             mainCats.map((cat, key) => {
        return(
      <CategoryItem
        categories={props.categories.filter(
          item => item.catindex === cat.catindex
        )}
      />
        )
        })
      }

    </List>
  );
}

export default NestedList;
