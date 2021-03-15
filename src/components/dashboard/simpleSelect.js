import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    margin: 0
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <div>
      <FormControl
       variant="outlined" 
       className={classes.formControl} 
       fullWidth
       error={props.error}
       >
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          {props.placeholder}
        </InputLabel>
        <Select
          labelId={props.name}
          id={props.name}
          value={props.value}
          onChange={props.onChange}
          labelWidth={labelWidth}
        >
          {props.options.map((option, key) => {
            return (
              <MenuItem value={option.value} key={key}>
                {option.label}
              </MenuItem>
            );
          })}
        </Select>
        {props.helperText && <FormHelperText>{props.helperText}</FormHelperText> }
      </FormControl>
    </div>
  );
}
