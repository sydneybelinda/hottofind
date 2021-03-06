import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  flexContainer:{
    display: "flex"
  },
  filter:{
      marginLeft:"auto"
  },
  dispText:{
    marginBottom: "0",
    marginTop: "44px"
  },
  butNew: {
    marginTop: "21px",
    marginRight: "15px"
  }
}));

export default function Sort(props) {
  const classes = useStyles();


  const defaultDashSort =  props.defaultDashSort || 'latest'

 
  

  const [sort, setSort] = React.useState(defaultDashSort);

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setSort(event.target.value);
    document.cookie = `defaultDashSort=${event.target.value}; path=/`;
    window.location.reload()
  };

//   const startpost = props.page * props.limit - (props.limit-1) 

//   const e = parseInt(props.page) * parseInt(props.limit)
// let endpost;


//   if (e > props.total){
//         endpost = props.total
//   }else {
//         endpost = e 
//   }
  
  return (
    <div>
<div className={classes.flexContainer}>
<div className={classes.nummber}>
   <p className={classes.dispText}>{props.total} Posts</p>
</div>
<div className={classes.filter}>
  <Link href="/dashboard/newpost">
<Button size="small" variant="outlined" size="small" color="primary" className={classes.butNew}>
          New Post
        </Button>
        </Link>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="sort-label">
          Sort By
        </InputLabel>
        <Select
          labelId="sort-label"
          id="sort"
          value={sort}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          <MenuItem value="latest">Latest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="disabled">Disabled</MenuItem>
        </Select>
      </FormControl>
      </div>
      </div>
    </div>
  );
}
