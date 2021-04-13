import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
    display: "inline-block",
    marginLeft: "auto",
    marginRight: "auto",
    cursor: "pointer"
  },
  paper: {
    marginRight: theme.spacing(2)
  },
  mItem: {
    lineHeight: "10px"
  },
  lnk: {
    fontFamily: "Nunito, sans-serif",
    textDecoration: "none",
    textTransform: "uppercase",
    padding: "0 10px",
    fontSize: "12px",
    fontWeight: "600",
    display: "block",
    lineHeight: "30px",
    height: "30px",
    letterSpacing: ".08em",
    color: "white",
    overflow: "hidden",
    whiteSpace: "nowrap",
    [theme.breakpoints.down("md")]: {
      fontSize: "7px"
    },
    textOverflow: "ellipsis",
    "&:hover": {
      color: "#009b9b"
    }
  },
  lnkb: {
    fontFamily: "Nunito, sans-serif",
    textDecoration: "none",
    padding: "0 10px",
    fontSize: "12px",
    fontWeight: "600",
    display: "block",
    lineHeight: "30px",
    height: "30px",
    letterSpacing: ".12em",
    color: "black",
    "&:hover": {
      color: "#009b9b"
    }
  },
  itm: {
    paddingTop: "0",
    paddingBottom: "0"
  }
}));

export default function MenuListComposition(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div
        className={classes.mItem}
        onMouseEnter={handleToggle}
        onMouseLeave={handleToggle}
      >
        {/* <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        > */}
        <a className={classes.lnk} ref={anchorRef}>
          {props.name}
        </a>
        {/* </Button> */}
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose} className={classes.itm}>
                      <Link
                        href={`/posts/[catindex]`}
                        as={`/posts/${props.url}`}
                      >
                        <a className={classes.lnkb}>
                          ALL {props.name.toUpperCase()}
                        </a>
                      </Link>
                    </MenuItem>
                    {props.categories
                      ? props.categories.map((prop, key) => {
                          if (prop.catindex == props.url) {
                            return (
                              <MenuItem
                                onClick={handleClose}
                                key={prop.catindex + "-" + prop.keyindex}
                                className={classes.itm}
                              >
                                <Link
                                  href={`/posts/[catindex]/[keyindex]`}
                                  as={`/posts/${props.url}/${prop.keyindex}`}
                                >
                                  <a className={classes.lnkb}>
                                    {prop.subcategory}
                                  </a>
                                </Link>
                              </MenuItem>
                            );
                          }
                        })
                      : ""}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
