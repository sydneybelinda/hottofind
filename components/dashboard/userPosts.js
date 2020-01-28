/* eslint-disable no-script-url */
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "next/link";
import React from "react";
import Moment from "react-moment";
import * as Queries from "../../utils/queries";
import Title from "./title";

// Generate Order Data
function createData(id, date, title, status, action) {
  return { id, date, title, status, action };
}

const styles = theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  },
  new: {
    textAlign: "right",
    padding: "15px",
    paddingTop: "0"
  }
});

class UserPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "",
      error: ""
    };
  }

  checkStatus = async val => {
    let st = "";

    if (val == "Active") {
      st = (
        <Button variant="contained" color="primary">
          Active
        </Button>
      );
    } else {
      st = (
        <Button variant="contained" color="primary">
          Disabled
        </Button>
      );
    }

    // this.setState({ status: st });

    return st;
  };

  render() {
    const rows = [];
    const { classes } = this.props;

    {
      this.props.posts
        ? this.props.posts.map(post => {
            const dateToFormat = post.updatedAt;
            const title = post.title;
            // const status = this.checkStatus(post.status)

            const status = "";
            const action = (
              <>
                <div key={post.id}>
                  <Link href={`/dashboard/editpost/${post.id}`}>
                    <a>edit</a>
                  </Link>{" "}
                  {` - `}
                  {/* <a href="#" onClick={() => del(post.id)} value={post.id}> */}
                  <a
                    href="#"
                    onClick={() => Queries.deletePost(post.id)}
                    value={post.id}
                  >
                    delete
                  </a>
                </div>
              </>
            );

            const date = (
              <Moment date={dateToFormat} format="D/MM/YY - HH:mm" />
            );

            rows.push(createData(post.id, date, title, status, action));
          })
        : "";
    }

    return (
      <React.Fragment>
        <Title>Posts</Title>
        <div className={classes.new}>
          <Link href={`/dashboard/newpost`}>
            <a>new post</a>
          </Link>
        </div>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Last Updated</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell align="right">{row.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(UserPosts);
