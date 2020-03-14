import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import GridIcon from '@material-ui/icons/GridOn';
import ListIcon from '@material-ui/icons/List';
import React from 'react';

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
  butGrid: {
    marginTop: "22px",
    marginRight: "0",
    color: "#888888",
    minWidth: 0,
    '& span' : {
      marginLeft: "5px",
    },
    [theme.breakpoints.up("sm")]: {
      minWidth: 64,
      marginRight: "15px",
    },
  },
  butList: {
    marginTop: "22px",
    padding: "6px 8px",
    minWidth: 0,
 //   marginRight: "15px",
    color: "#888888",
    '& span' : {
      marginLeft: "5px"
    },
    [theme.breakpoints.up("sm")]: {
      minWidth: 64
    },
  },
  spanGrid: {
    display: 'none',
    [theme.breakpoints.up("sm")]: {
      display: 'block'
    },
  },
  spanList: {
    display: 'none',
    [theme.breakpoints.up("sm")]: {
      display: 'block'
    },
  }
}));

export default function Sort(props) {
  const classes = useStyles();

  const defaultSort =  props.defaultSort || 'latest'
  const defaultView =  props.defaultView || 'grid'

  

  const [sort, setSort] = React.useState(defaultSort);
  const [view, setView] = React.useState(defaultView);

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setSort(event.target.value);
    document.cookie = `defaultSort=${event.target.value}; path=/`;
    window.location.reload()
  };


  const startpost = props.page * props.limit - (props.limit-1) 

  const en = parseInt(props.page) * parseInt(props.limit)
let endpost;


  if (en > props.total){
        endpost = props.total
  }else {
        endpost = en 
  }

  
  return (
    <div>
<div className={classes.flexContainer}>
<div className={classes.nummber}>
   <p className={classes.dispText}>{startpost}-{endpost} of {props.total}</p>
</div>
<div className={classes.filter}>

<Button  className={classes.butList} 
          value={"list"}
          id="but-list"
          onClick={ props.selectListView} >      
          <ListIcon fontSize="small" />
        <span className={classes.spanList}>List</span>
        </Button>  
        <Button  className={classes.butGrid} value={"grid"}
           onClick={ props.selectGridView} >      
          <GridIcon fontSize="small" />
   <span className={classes.spanGrid}>Grid</span>
        </Button>  

      <FormControl  className={classes.formControl}>
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
          <MenuItem value="lowestprice">Lowest to Highest</MenuItem>
          <MenuItem value="highestprice">Highest to Lowest</MenuItem>
          <MenuItem value="mostviewed">Most Viewed</MenuItem>
          <MenuItem value="leastviewed">Least Viewed</MenuItem>
        </Select>
      </FormControl>
      </div>
      </div>
    </div>
  );
}
