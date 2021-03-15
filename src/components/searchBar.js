import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Search from './search';


const useStyles = makeStyles(theme => ({
  list: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
    },
  },
  fullList: {
    width: 'auto',
  },
  drawer: {
    left: "10%",
    [theme.breakpoints.up("sm")]: {
      left: "30%",
      },
  }
}))

export default function TemporaryDrawer(props) {
  const classes = useStyles();



  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: props.side,
  });

  const [side, setSide] = React.useState(props.side)

 

  const toggleDrawer = () => event => {

    setDrawerClose(false)
  };

  const closeDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
     // onClick={props.drawerClose}
    //  onKeyDown={props.drawerClose}
    >

      <Search drawerClose={props.drawerClose} {...props}/>
      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );


  return (
    <div>

      <Drawer anchor="right" open={props.side} onClose={props.drawerClose} classes={{
        paperAnchorRight: classes.drawer,
   }}>
        {sideList('right')}
      </Drawer>
    </div>
  );
}