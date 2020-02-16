/**
 * Creating a page named _error.js lets you override HTTP error messages
 */
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Container from "@material-ui/core/Container";
import { withRouter } from 'next/router';
import withStyles from "@material-ui/core/styles/withStyles";
import Layout from "../components/layout";

const styles = theme => ({
mainPosts:{
    height: 'calc(100vh - 94px)',
    display: 'flex',
    alignItems: 'center'
}
  }
)

class ErrorPage extends React.Component {

  static propTypes() {
    return {
      errorCode: React.PropTypes.number.isRequired,
      url: React.PropTypes.string.isRequired
    }
  }

  static getInitialProps({res, xhr}) {
    const errorCode = res ? res.statusCode : (xhr ? xhr.status : null)
    return {errorCode}
  }

  render() {

    const { classes } = this.props;
    var response
    switch (this.props.errorCode) {
      case 200: // Also display a 404 if someone requests /_error explicitly
      case 404:
        response = (

            <Layout {...this.props}>
                  <div className={classes.mainPosts}>
        <Container maxWidth="sm">
              <h1 className="display-4">Page Not Found</h1>
              <p>The page <strong>{ this.props.router.pathname }</strong> does not exist.</p>
              <p><Link href="/"><a>Home</a></Link></p>
            </Container>
            </div>
            </Layout>
        )
        break
      case 500:
        response = (
            <Layout {...this.props}>
            <div className={classes.mainPosts}>
        <Container maxWidth="xs">
              <h1 className="display-4">Internal Server Error!!</h1>
              <p>An internal server error occurred.</p>
            </Container>
            </div>
         </Layout>
        )
        break
      default:
        response = (
            <Layout {...this.props}>
            <div className={classes.mainPosts}>
        <Container maxWidth="xs">
              <h1 className="display-4">HTTP { this.props.errorCode } Error</h1>
              <p>
                An <strong>HTTP { this.props.errorCode }</strong> error occurred while
                trying to access <strong>{ this.props.router.pathname }</strong>
              </p>
            </Container>
            </div>
          </Layout>
        )
    }

    return response
  }

}

export default withRouter(withStyles(styles)(ErrorPage))