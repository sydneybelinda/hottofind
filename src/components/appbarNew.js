import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Link from "next/link";
import MenuDropdown from "./menu";
import { logout } from "../utils/auth";
import CountryMenu from "../components/countryMenu";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  hottofind: {
    textDecoration: "none",
    color: "#00baa9",
    display: "block",
    fontFamily: "'Calistoga', cursive",
    fontWeight: 400
  },
  bottomTool: {
    display: "none",
    background: "black",
    minHeight: 0,
    borderBottom: "1px solid white",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  butNew: {
    display: "none",
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  but: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  butNewB: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  profileMenu: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    },
  },
  divider: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    },
  },
  closedMenu: {
    display: "none"
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



const Header = () => {

  return (
      <header
          className="header header--mobile header--mobile-product"
          id="header-mobile"
          data-sticky="true">
          <div className="navigation--mobile">
              <div className="navigation__left">
                  <Link href="/shop">
                      <a href="/" className="header__back">
                          <i className="icon-chevron-left"></i>
                          <strong>Back to previous</strong>
                      </a>
                  </Link>
              </div>
              <div className="navigation__right">
                  <MobileHeaderActions />
              </div>
          </div>
      </header>
  );
};




function HideOnScroll(props) {
  const { children, window } = props;
  const [hide, setHide] = useState(null);
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  //console.log('trigger')
 // console.log(trigger)
  
 


  return (
    <Slide appear={false} direction="down" in={!trigger} style={trigger ? {height:0, minHeght:0, opacity:0, overflow: "hidden", transition: `opacity 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;`}: ''}>
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
  window: PropTypes.func,
};




export default function HideAppBar(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const stickyHeader = () => {
    let number =
        window.pageXOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
    const header = document.getElementById('top-menu');
    const sidemenu = document.getElementById('sidemenu');
    const footer = document.getElementById('footer');
    if (header !== null) {
        if (number >= 300) {
            header.classList.add('header-sticky');
        } else {
            header.classList.remove('header-sticky');
        }
    }
    if (sidemenu !== null) {
      if (number >= 300) {
          sidemenu.classList.add('side-sticky');
      } else {
          sidemenu.classList.remove('side-sticky');
      }

   
if (window.outerWidth > 600) {
        var windowHeight = window.outerHeight
      
         var someDiv = document.getElementById('footer');
         var distanceToTop = someDiv.getBoundingClientRect().top;
         
         if(distanceToTop < windowHeight){
         
         var height = windowHeight - (windowHeight - distanceToTop) - 64
         
         document.getElementById('sidemenu').style.height = height + "px"
      
         console.log(windowHeight - distanceToTop);
         }
        }
      
      
  }
};
useEffect(() => {
    if (process.browser) {
        window.addEventListener('scroll', stickyHeader);
    }
}, []);

  
  const open = Boolean(anchorEl);

  const handleChange = event => {
    setAuth(event.target.checked);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const logoutMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    logout();
  };



  return (
    <React.Fragment>
      <CssBaseline />
      
        <AppBar color="inherit"  id="top-menu" className="header" >
        {/* <HideOnScroll {...props}> */}
        <Toolbar >
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={props.toggleMenu}>
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" className={classes.title}>
          <a href="/" className={classes.hottofind}>HotToFind</a>
          </Typography> */}
<Typography variant="h6" className={classes.title}>
          <Link href="/">
                <a className={classes.link}>
                  {/* <Typography className={classes.title} variant="h6" noWrap>
                    HotToFind
                  </Typography> */}
                   <img src="/images/logo.png" alt={`hotToFind Local Classifieds`}/>
                </a>
              </Link>
              </Typography>
          <Link href="/dashboard/newpost">
                  <IconButton aria-label="New Post" aria-haspopup="true" className={classes.butNewB}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Link>
          <Link href="/dashboard/newpost">
                  <Button variant="outlined" className={classes.butNew}>
                    New Post
                  </Button>
                </Link>
                <span className={classes.divider}>-</span>
          <IconButton
                aria-label="search"
                aria-controls="menu-appbar"
                color="inherit"
                onClick={props.toggleDrawer}
              >
                <SearchIcon />
              </IconButton>
              <span className={classes.divider}>-</span>
          {props.user ? (
            <div className={classes.profileMenu}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                
                <MenuItem onClick={handleClose}><p className={classes.userName}>
          {props.user && props.user.username}
        </p></MenuItem>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}><a href="/dashboard">My Posts</a></MenuItem>
                <MenuItem onClick={logoutMenuClose}>Logout</MenuItem>
              </Menu>
            </div>
          )
        :
        <>
    
   <Link href="/login"><Button color="inherit" className={classes.but}>Login</Button></Link>
  <Link href="/register"><Button color="inherit" className={classes.but}>Register</Button></Link> 
 </>

        }
        <span className={classes.divider}>-</span>
         <CountryMenu />
        </Toolbar>
        {/* </HideOnScroll> */}
        <Toolbar
        className={classes.bottomTool}
        >
        {mainCats.map((cat, key) => {
                return (
                  <MenuDropdown
                    name={cat.name}
                    catindex={cat.catindex}
                    key={cat.catindex}
                    categories={props.categories.filter(
                      item => item.catindex === cat.catindex
                    )}
                  />
                );
              })}
        </Toolbar>

        </AppBar>
     


    </React.Fragment>
  );
}




// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// export default function MenuAppBar() {
//   const classes = useStyles();
//   const [auth, setAuth] = React.useState(true);
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);

//   const handleChange = event => {
//     setAuth(event.target.checked);
//   };

//   const handleMenu = event => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" className={classes.title}>
//             Photos
//           </Typography>
//           {auth && (
//             <div>
//               <IconButton
//                 aria-label="account of current user"
//                 aria-controls="menu-appbar"
//                 aria-haspopup="true"
//                 onClick={handleMenu}
//                 color="inherit"
//               >
//                 <AccountCircle />
//               </IconButton>
//               <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorEl}
//                 anchorOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 open={open}
//                 onClose={handleClose}
//               >
//                 <MenuItem onClick={handleClose}>Profile</MenuItem>
//                 <MenuItem onClick={handleClose}>My account</MenuItem>
//               </Menu>
//             </div>
//           )}
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }