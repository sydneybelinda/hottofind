import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import "react-image-gallery/styles/css/image-gallery.css";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6"
    },
    secondary: {
      main: "#19857b"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#fff"
    }
  }
});

export default theme;
