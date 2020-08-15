import Button from "@material-ui/core/Button";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles(theme => ({
  cButton: {
    marginLeft: 25,
    color: "white",
    backgroundColor: "#8e8e8e",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    },
  },
  menu: {
    "& a": {
      textDecoration: "none",
      color: "rgba(0, 0, 0, 0.87)"
    }
  }
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = useStyles();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        className={classes.cButton}
        onClick={handleClick}
      >
        Countries
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
      >
        
          <a href="https://au.hottofind.com">
            <StyledMenuItem>
              <ListItemText primary="Australia" />
            </StyledMenuItem>
          </a>
     
   
          <a  href="https://hottofind.com">
            <StyledMenuItem>
              <ListItemText primary="United States" />
            </StyledMenuItem>
          </a>
  
    
          <a href="https://ca.hottofind.com">
            <StyledMenuItem>
              <ListItemText primary="Canada" />
            </StyledMenuItem>
          </a>
    
          <a href="https://in.hottofind.com">
            <StyledMenuItem>
              <ListItemText primary="India" />
            </StyledMenuItem>
          </a>
      
       
          <a href="https://eu.hottofind.com">
            <StyledMenuItem>
              <ListItemText primary="Europe" />
            </StyledMenuItem>
          </a>
       
     
          <a href="https://uk.hottofind.com">
            <StyledMenuItem>
              <ListItemText primary="United Kingdom" />
            </StyledMenuItem>
          </a>
    
    
          <a href="https://za.hottofind.com"> 
            <StyledMenuItem>
              <ListItemText primary="South Africa" />
            </StyledMenuItem>
          </a>
    
      
          <a href="https://sa.hottofind.com">
            <StyledMenuItem>
              <ListItemText primary="South America" />
            </StyledMenuItem>
          </a>
   
    
          <a href="https://sg.hottofind.com">
            <StyledMenuItem>
              <ListItemText primary="Singapore" />
            </StyledMenuItem>
          </a>
       
      </StyledMenu>
    </div>
  );
}
