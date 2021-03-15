import AppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Slide from "@material-ui/core/Slide";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import { logout } from "../../utils/auth";
import Dropdown from '../dropdown';
import MobileMenu from "./mobileMenu";
import Button from '@material-ui/core/Button';
import CountryMenu from "../../components/countryMenu";

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};


const useStyles = makeStyles(theme => ({
  appbar: {
    background: "white",
    color: "black",
    boxShadow: "0 3px 6px 3px rgba(0, 0, 0, .06)"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      fontFamily: "'Calistoga', cursive",
      fontWeight: "400",
      color: "#00baa9"
    },
    "& a": {
      textDecoration: "none",
      color: "#00baa9"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  link: {
    textDecoration: "none"
  },
  bottomToolbar: {
    minHeight: "30px",
    textAlign: "center"
  },
  lnk: {
    fontFamily: "'Montserrat', sans-serif",
    textDecoration: "none",
    textTransform: "uppercase",
    margin: "0 25px",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: ".12em",
    color: "black",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    "&:hover": {
      color: "#009b9b"
    }
  },
  rlnk: {
    fontFamily: "'Montserrat', sans-serif",
    textDecoration: "none",
    textTransform: "uppercase",
    padding: "0",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: ".12em",
    color: "black",
    "&:hover": {
      color: "#009b9b"
    }
  },
  bottomMenu: {
    background: "black",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  logo: {
    textDecoration: "none"
  },
  butNew: {
    marginRight: 15
  },
  menuButton: {
    color: "white",
    height: 30,
    display: "block",
    padding: "0 10px",
    overflow: "hidden",
    fontSize: 12,
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    letterSpacing: ".08em",
    textTransform: "uppercase",
    textDecoration: "none",
    marginRight: "auto",
    marginLeft: "auto",
  },
  more:{
    marginRight: 5
  }
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
    document.body.style="overflow:hidden"
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const logoutMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    logout();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>{props.user ? props.user.username : ""}</MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>
        <Link href="/profile">
          <a>Profile</a>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link href="/dashboard">
          <a>My Posts</a>
        </Link>
      </MenuItem>
      <Divider />
      <MenuItem onClick={logoutMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    // <Menu >
    <MobileMenu user={props.user} categories={props.categories} toggleDrawer={props.toggleDrawer} toggleMenu={props.toggleMenu} />
    // </Menu>
  );

  return (
    <div className={classes.grow}>
      <HideOnScroll {...props}>
        <AppBar
          position="fixed"
          user={props.user}
          categories={props.categories}
          className={classes.appbar}
        >
          <Container maxWidth="xl">
            <Toolbar>
            <Link href="/">
                <a className={classes.link}>
                  {/* <Typography className={classes.title} variant="h6" noWrap>
                    HotToFind
                  </Typography> */}
                <img src="/images/logo.png" alt={`hotToFind Local Classifieds ${props.config.COUNTRY}`}/>
                </a>
              </Link>
             
              {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
              <Link href="/dashboard/newpost">
<Button variant="outlined"   className={classes.butNew}>
          New Post
        </Button>
        </Link>



              <IconButton 
              //onClick={toggleDrawer('right', true)}
              onClick={props.toggleDrawer}
              ><SearchIcon /></IconButton>
                {props.user ? (
                  <>
                    {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
                    <IconButton
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      color="inherit"
                    >
                      <AccountCircle />
                      {/* {props.user ? props.user.username : ""} */}
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <a className={classes.lnk}>Login</a>
                    </Link>
                    <Link href="/register">
                      <a className={classes.rlnk}>Register</a>
                    </Link>
                  </>
                )}

                <CountryMenu />
              </div>
              <div className={classes.sectionMobile}>
                {/* <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
                {renderMobileMenu}
              </div>
            </Toolbar>
          </Container>
          <div className={classes.bottomMenu}>
            <Container maxWidth="xl">
              <Toolbar className={classes.bottomToolbar}>
                <Dropdown
                  name="Jobs"
                  categories={props.categories}
                  url="employment"
                ></Dropdown>
                <Dropdown
                  name="Local"
                  categories={props.categories}
                  url="local-places"
                ></Dropdown>
                <Dropdown
                  name="Community"
                  categories={props.categories}
                  url="community"
                ></Dropdown>
                <Dropdown
                  name="Auto"
                  categories={props.categories}
                  url="automotive"
                ></Dropdown>
                <Dropdown
                  name="Realty - Buy"
                  categories={props.categories}
                  url="real-estate-selling"
                ></Dropdown>
                <Dropdown
                  name="Realty - Rent"
                  categories={props.categories}
                  url="real-estate-renting"
                ></Dropdown>
                <Dropdown
                  name="Services"
                  categories={props.categories}
                  url="services"
                ></Dropdown>
                <Dropdown
                  name="Adult"
                  categories={props.categories}
                  url="adult"
                ></Dropdown>
                <IconButton 
                size="small"
className={classes.menuButton}
    //onClick={toggleDrawer('right', true)}
    onClick={props.toggleMenu}
    ><span className={classes.more}>more</span> <MenuIcon 
    className={classes.menuIcon}
    /></IconButton>
              </Toolbar>
            </Container>
          </div>
        </AppBar>
      </HideOnScroll>

      {renderMenu}
    </div>
  );
}

