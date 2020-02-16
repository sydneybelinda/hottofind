import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
  cButton: {
    marginLeft: 30,
    color: "white",
    backgroundColor: "#8e8e8e"
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
        <Link href="https://au.hottofind.com">
          <a>
            <StyledMenuItem>
              <ListItemText primary="Australia" />
            </StyledMenuItem>
          </a>
        </Link>
        <Link href="https://hottofind.com">
          <a>
            <StyledMenuItem>
              <ListItemText primary="United States" />
            </StyledMenuItem>
          </a>
        </Link>
        <Link href="https://ca.hottofind.com">
          <a>
            <StyledMenuItem>
              <ListItemText primary="Canada" />
            </StyledMenuItem>
          </a>
        </Link>
        <Link href="https://in.hottofind.com">
          <a>
            <StyledMenuItem>
              <ListItemText primary="India" />
            </StyledMenuItem>
          </a>
        </Link>
        <Link href="https://eu.hottofind.com">
          <a>
            <StyledMenuItem>
              <ListItemText primary="Europe" />
            </StyledMenuItem>
          </a>
        </Link>
        <Link href="https://uk.hottofind.com">
          <a>
            <StyledMenuItem>
              <ListItemText primary="United Kingdom" />
            </StyledMenuItem>
          </a>
        </Link>
        <Link href="https://za.hottofind.com">
          <a>
            <StyledMenuItem>
              <ListItemText primary="South Africa" />
            </StyledMenuItem>
          </a>
        </Link>
        <Link href="https://sa.hottofind.com">
          <a>
            <StyledMenuItem>
              <ListItemText primary="South America" />
            </StyledMenuItem>
          </a>
        </Link>
        <Link href="https://sg.hottofind.com">
          <a>
            <StyledMenuItem>
              <ListItemText primary="Singapore" />
            </StyledMenuItem>
          </a>
        </Link>
      </StyledMenu>
    </div>
  );
}
