import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import {makeSlug} from "./constants";
import withStyles from "@material-ui/core/styles/withStyles";


const styles = theme => ({
search: {
  padding: "40px",
  ".MuiFormControl-fullWidth": {
    width: `calc('100% - 100px')`
},
},
form: {

},

});


class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      data: [],
    };
  }

  getSearch = async() => {
   // if (this.state.search.length <= 3){
   const posts = await Queries.searchPosts(this.state.search)
   if(posts){
     // let items = posts.data[0].map( (res, i) => { return { title: res.title, value: makeSlug(res.title, res.id) } })
    //  let items = posts.data.map( (res, i) => { 
    //    return { 
    //      id: res.id, value: res.title
      
    //   } })
     //this.setState({ repos: items })

             posts.data.map(post => {
               let p = (
                  <Link href={`/post/${makeSlug(post.title, post.id)}`} key={post.id}>
                    {" "}
                    <ListItem button>{post.title}</ListItem>
                  </Link>
                );

                this.setState(prevState => ({
                  data: [...prevState.data, p]
                }))
              
              
              })


   

    // this.setState({data: items})
   }
 //   }
}

aqddItem = () => {
  this.setState(state => {
    const list = [...state.list, state.value];

    return {
      list,
      value: '',
    };
  });
}
  render() {

    const { classes } = this.props;



    const changeValue = event => {
      this.setState({ search: event.target.value });
     // searchPosts(event.target.value);
      
    };


    // search();

    // console.log(posts)

    if(this.state.data.length != 0){

    console.log(this.state.data)
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
            value={this.state.search}
            onChange={event => changeValue(event)}
          />
          <Button type="submit"          variant="contained"
        className={classes.sButton} onClick={this.getSearch}>
                Search
            </Button>
        </form>
        <div>
          <List component="nav" aria-label="main mailbox folders">
            {this.state.data}
            {/* {this.state.data != 0
              ? this.state.data.map(post => (
                  <Link href={`/post/${makeSlug(post.value, post.id)}`} key={post.id}>
                    {" "}
                    <ListItem button>{post.value}</ListItem>
                  </Link>
                ))
              : ""} */}
          </List>
        </div>
      </div>
    );
              }
}

export default withStyles(styles)(Search);
