import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { withRouter } from 'next/router';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {

  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5"
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)"
    }
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""'
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3"
    }
  },
 
}));

const styles = theme => ({
  locHead: {
    marginBottom: "15px"
  },
  butOpen: {
    padding: "5px 5px",
    minWidth: "43px",
    float: "right",
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none"
      }
  },
  card: {
    minWidth: 275,
    transition: ".3s ease-in-out",
    height: "63px",
    [theme.breakpoints.up("sm")]: {
    height: "100%"
    }

  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },

})

function StyledRadio(props) {
  // const [locOpen, setlocOpen] = useState(false);


  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

class LocationMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
   
      value: props.city
    };

    this.card = React.createRef();
  }

  render(){

// export default function LocationMenu(props) {
  const { classes, router } = this.props;

  // const [value, setValue] = React.useState(props.city);

  const { pathname } = router;
  const bull = <span className={classes.bullet}>•</span>;

  const handleChange = event => {
    this.setState({ values: event.target.value });
    const city = event.target.value;

    var href = "/posts";

    if (this.props.catindex) {
      href += `/${this.props.catindex}`;
    }
    if (this.props.keyindex) {
      href += `/${this.props.keyindex}`;
    }
    if (city) {
      href += `?city=${city}`;
    }

    if (city == "ALL CITIES") {
      var href = "/posts/" + this.props.catindex + "/" + this.props.keyindex;
    }

    router.push(href);
  };

  const handleMenuChange = event => {

    console.log("card: ", this.card)


      if(this.card.current.offsetHeight == "63"){
        this.card.current.style.height = "100%"
      } else {
        this.card.current.style.height = "63px"
      }
  };

  return (
    <Card className={classes.card} ref={this.card}>
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.locHead}>
          LOCATION <Button variant="outlined" className={classes.butOpen} onClick={handleMenuChange}>      
          <MenuIcon fontSize="small" />
   
        </Button>  
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            defaultValue="ALL CITIES"
            aria-label="cities"
            name="cities"
            value={this.state.value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="ALL CITIES"
              control={<StyledRadio />}
              label="ALL CITIES"
              key="ALL CITIES"
            />
            {this.props.cities.map((city,key) => (
              <FormControlLabel
                value={city.city.toLowerCase()}
                control={<StyledRadio />}
                label={city.city}
                key={key}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
}

export default withRouter(withStyles(styles)(LocationMenu))
