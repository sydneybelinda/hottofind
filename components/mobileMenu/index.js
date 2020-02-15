import { slide as Menu } from "react-burger-menu";
import MenuList from "./menuList";
import Link from "next/link";
import "./styles.css";

class mobileMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return (
      <>
        <div className="brand"><Link href={"/"}><span className="homelink">HotToFind</span></Link></div>
        <Menu right>
          <MenuList user={this.props.user} categories={this.props.categories} />
        </Menu>
        </>
    );
  }
}

export default mobileMenu;
