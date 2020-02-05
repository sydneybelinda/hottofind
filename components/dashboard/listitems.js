import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircle from "@material-ui/icons/AccountCircle";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import Link from "next/link";
import React from "react";

export const mainListItems = (
  <div>
    <Link href="/">
      <a>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </a>
    </Link>
    <Link href="/dashboard">
      <a>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </a>
    </Link>
    <Link href="/dashboard/editprofile">
      <a>
        <ListItem button>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Edit Profile" />
        </ListItem>
      </a>
    </Link>
  
  </div>
);

export const secondaryListItems = (
  <div>

  </div>
);
