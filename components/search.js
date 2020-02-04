import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     // width: 200,
    },
  },
  searchBox: {
      width: '100%',
      padding: "5px",
      background: "#d5d5d5",
      borderRadius: "6px"
  }
}));

export default function BasicTextFields() {
  const classes = useStyles();

  return (
      <div className={classes.searchBox}>
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <Button variant="contained" color="primary">
  Search
</Button>
    </form>
    </div>
  );
}