import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React from 'react';

const useStyles = makeStyles({
  root: {

  },
  card: {
    minWidth: 275
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
  locHead: {
    marginBottom: "15px"
  }
});

function StyledRadio(props) {
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

export default function LocationMenu(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.city);
  const router = useRouter();
  const { pathname } = router;
  const bull = <span className={classes.bullet}>•</span>;

  const handleChange = event => {
    setValue(event.target.value);
    const city = event.target.value;

    var href = "/posts";

    if (props.catindex) {
      href += `/${props.catindex}`;
    }
    if (props.keyindex) {
      href += `/${props.keyindex}`;
    }
    if (city) {
      href += `?city=${city}`;
    }

    if (city == "ALL CITIES") {
      var href = "/posts/" + props.catindex + "/" + props.keyindex;
    }

    router.push(href);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.locHead}>
          LOCATION
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            defaultValue="ALL CITIES"
            aria-label="cities"
            name="cities"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="ALL CITIES"
              control={<StyledRadio />}
              label="ALL CITIES"
              key="ALL CITIES"
            />
            {props.cities.map(city => (
              <FormControlLabel
                value={city.city.toLowerCase()}
                control={<StyledRadio />}
                label={city.city}
                key={city.city}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
