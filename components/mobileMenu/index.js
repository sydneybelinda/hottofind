
import MenuList from "./menuList";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";
import Link from "next/link";
// import "./styles.css";


const styles = theme => ({
  iconButton: {
  padding: 0
  },
searchIcon: {
  fontSize: 40,
  fill: "#bbbebe"
},
menuButton: {
    fontSize: 40,
    marginLeft: 10,
    fill: "#646363",
    padding: 0
},
menuIcon: {
  width: 40,
  height: 40
}
})

class mobileMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  showSettings(event) {
    event.preventDefault();
  }

  render() {

    const { classes } = this.props;


    return (
      <>
        <div className="brand"><Link href={"/"}><span className="homelink">HotToFind</span></Link></div>
        <IconButton right="true"
        className={classes.iconButton}
              //onClick={toggleDrawer('right', true)}
              onClick={this.props.toggleDrawer}
              ><SearchIcon
              className={classes.searchIcon}
              /></IconButton>

<IconButton 
className={classes.menuButton}
    //onClick={toggleDrawer('right', true)}
    onClick={this.props.toggleMenu}
    ><MenuIcon 
    className={classes.menuIcon}
    /></IconButton>
        {/* <Menu right>
    
          <MenuList user={this.props.user} categories={this.props.categories} />
        </Menu> */}
        </>
    );
  }
}

export default withStyles(styles)(mobileMenu);
