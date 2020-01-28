import Typography from "@material-ui/core/Typography";

const Footer = props => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
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
