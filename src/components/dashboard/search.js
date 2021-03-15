import React,{useState} from 'react';
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import {makeSlug} from "./constants";
import { makeStyles } from "@material-ui/core/styles";
import * as Queries from "../utils/queries";

const useStyles = makeStyles(theme => ({
    search: {
        padding: "40px",
        ".MuiFormControl-fullWidth": {
          width: `calc('100% - 100px')`
      },
      },
}));
 
const Search = (props) => {
  const [search, setSearch] = React.useState('');
  const [data, setData] = React.useState([]);
  const classes = useStyles();
 
  function changeValue(event) {
    setSearch(event.target.value);
  }
 
  function handleAdd(item) {
    const newList = data.concat({ });
 
    setList(newList);
 
    setName('');
  }

  async function getSearch(){
    // if (this.state.search.length <= 3){
    const posts = await Queries.searchPosts(search, this.props.config)
    if(posts){

        setData(posts.data);

        console.log(posts)

    }
  //   }
 }
 

 
  return (

    <div className={classes.search}>
    <form id="form" noValidate autoComplete="off" className={classes.form} onSubmit={e => e.preventDefault()}>
      <TextField
        id="search"
        name="search"
        label="enter search query..."
        fullWidth
        autoComplete="off"
        value={search}
        onChange={event => changeValue(event)}
      />
      <Button type="submit"          variant="contained"
    className={classes.sButton} onClick={getSearch}>
            Search
        </Button>
    </form>
    <div>
      <List component="nav" aria-label="main mailbox folders">
          { data.length != 0 ? data.map((post) => (
              <Link href={`/post/${makeSlug(post.title, post.id)}`} key={post.id}>
                {" "}
                <ListItem button>{post.title}</ListItem>
              </Link>
            )): ''}
      </List>
    </div>
  </div>



  );
};

export default Search;