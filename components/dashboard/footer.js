import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  footer: {
    padding: 30
  },
}));


const Footer = props => {

  const classes = useStyles();


  return (
    <Typography variant="body2" color="textSecondary" align="center" className={classes.footer}>
      {"Copyright © "}
      {/* <Link href="https://material-ui.com/">
          <a>Your Website</a>
        </Link>{' '} */}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Footer;
