import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Appbar from "../components/appbar";

const useStyles = makeStyles(theme => ({
  header: {
    background: "black"
  }
}));

function Header(props) {
  const classes = useStyles();
  return (
    <Container maxWidth="xl">
      <Appbar
        user={props.user}
        categories={props.categories}
        className={classes.header}
        toggleDrawer={props.toggleDrawer}
      />
    </Container>
  );
}

export default Header;
