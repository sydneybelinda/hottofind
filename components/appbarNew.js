import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Slide from "@material-ui/core/Slide";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";
import React from "react";
import Link from "next/link";
import MenuDropdown from "./menu";
import MobileMenu from "./mobileMenu";
import { logout } from "../utils/auth";
import Button from '@material-ui/core/Button';
import CountryMenu from "../components/countryMenu";

const useStyles = makeStyles(theme => ({
  appbar: {
    background: "white",
    color: "black",
    boxShadow: "0 3px 6px 3px rgba(0, 0, 0, .06)",
    // border: "3px solid #e5e5e5",
    // borderTopLeftRadius: "5px",
    // borderTopRightRadius: "5px",
    borderBottom: "1px solid #b6b6b6"
  },
  link: {
    textDecoration: "none"
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
      display: "block"
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
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  bottomMenu: {
    background: "black",
    display: "none",

    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  brand: {
    fontSize: 18,
    fontFamily: "'Calistoga', cursive",
    fontWeight: 400,
    color: "#00baa9",
    flexGrow: 1
  },
  sectionDesktop: {
    display: "none",

    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center"
    }
  },
  divider: {
    marginRight: 15,
    marginLeft: 5
  },
  dividerb: {
    marginLeft: 15
  },
  sectionMobile: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  lnk: {
    padding: 8,
    textDecoration: "none",
    textTransform: "uppercase",
    color: "#7e7e7e",
    fontFamily: "'Montserrat', sans-serif"
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
  }
}));

const mainCats = [
  { name: "Jobs", catindex: "employment" },
  { name: "Local", catindex: "local-places" },
  { name: "Community", catindex: "community" },
  { name: "Auto", catindex: "automotive" },
  { name: "Realty - Buy", catindex: "real-estate-selling" },
  { name: "Realty - Rent", catindex: "real-estate-renting" },
  { name: "Services", catindex: "services" },
  { name: "Buy / Sell", catindex: "buy-sell-trade" }
];

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

export default function HideAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logoutMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    logout();
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
      <MenuItem onClick={handleMenuClose}>
        <p className={classes.userName}>
          {props.user ? props.user.username : ""}
        </p>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link href={`/dashboard`}>
          <a>My Posts</a>
        </Link>
      </MenuItem>
      <MenuItem onClick={logoutMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      {props.user ? (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      ) : (
        ""
      )}
    </Menu>
  );
  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.grow}>
        <HideOnScroll {...props}>
          <AppBar user={props.user} className={classes.appbar}>
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={props.toggleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Link href="/">
                <a className={classes.link}>
                  <Typography className={classes.title} variant="h6" noWrap>
                    HotToFind
                  </Typography>
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
                    input: classes.inputInput
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div> */}
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <Link href="/dashboard/newpost">
                  <Button variant="outlined" className={classes.butNew}>
                    New Post
                  </Button>
                </Link>
                <IconButton color="inherit" onClick={props.toggleDrawer}>
                  <SearchIcon />
                </IconButton>
                {props.user ? (
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                ) : (
                  <>
                    <span className={classes.divider}>-</span>
                    <Link href="/login">
                      <a className={classes.lnk}>Login</a>
                    </Link>
                    <Link href="/register">
                      <a className={classes.lnk}>Register</a>
                    </Link>
                    <span className={classes.dividerb}>-</span>
                    <CountryMenu />
                  </>
                )}
              </div>
              <div className={classes.sectionMobile}>
                <div className={classes.brand}>
                  <Link href={"/"}>
                    <span className="homelink">HotToFind</span>
                  </Link>
                </div>

                <Link href="/dashboard/newpost">
                  <IconButton aria-label="New Post" aria-haspopup="true">
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Link>

                <IconButton
                  aria-label="open menu"
                  aria-haspopup="true"
                  onClick={props.toggleDrawer}
                >
                  <SearchIcon />
                </IconButton>
              </div>
            </Toolbar>
            <div className={classes.bottomMenu}>
              {mainCats.map((cat, key) => {
                return (
                  <MenuDropdown
                    name={cat.name}
                    key={cat.catindex}
                    categories={props.categories.filter(
                      item => item.catindex === cat.catindex
                    )}
                  />
                );
              })}

              {/* <MenuDropdown /> */}
            </div>
          </AppBar>
        </HideOnScroll>
        {renderMobileMenu}

        {renderMenu}
      </div>
      <Toolbar />
    </React.Fragment>
  );
}
