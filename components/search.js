import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
const { Client } = require("elasticsearch");
import Link from "@material-ui/core/Link";
import {makeSlug} from "./constants";
import withStyles from "@material-ui/core/styles/withStyles";
//const client = new Client({ node: 'http://db.hottofind.com:9200' })

var client = new Client({
  // default is fine for me, change as you see fit
  host: "elasticsearch.hottofind.com",
  log: "trace",
  apiVersion: "7.5"
});

const styles = theme => ({
search: {
  padding: "15px"
}
});


class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      data: ""
    };
  }

  render() {

    const { classes } = this.props;

    async function search() {
      const posts = await client
        .search({
          index: "hottofind",
          // type: '_doc', // uncomment this line if you are using {es} ≤ 6
          body: {
            query: {
              match: { title: "anna" }
            }
          }
        })
        .then(result => {
          //this.setState({ data: result })
          // console.log(result);
        });
    }

    const searchPosts = async e => {
      await client
        .search({
          index: "hottofind",
          // type: '_doc', // uncomment this line if you are using {es} ≤ 6
          body: {
            query: {
              match: { title: e }
            }
          }
        })
        .then(result => {
          this.setState({ data: result.hits.hits });
          console.log(result.hits.hits);
        });
    };

    const changeValue = event => {
      this.setState({ search: event.target.value });
      searchPosts(event.target.value);
    };

    // search();

    // console.log(posts)

    return (
      <div className={classes.search}>
        <form noValidate autoComplete="off">
          <TextField
            id="search"
            name="search"
            label="Search"
            fullWidth
            autoComplete="name"
            value={this.state.search}
            onChange={event => changeValue(event)}
          />
        </form>
        <div>
          <List component="nav" aria-label="main mailbox folders">
            {this.state.data
              ? this.state.data.map(post => (
              
                  <Link href={`/post/${makeSlug(post._source.title, post._source.id)}`} key={post._source.id}>
                    {" "}
                    <ListItem button>{post._source.title}</ListItem>
                  </Link>
                ))
              : ""}
          </List>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Search);
