import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Layout from "../components/layout";
import Link from "../components/link";
import ProTip from "../components/proTip";

export default function About() {
  return (
    <Layout>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          naked
          href="/"
        >
          Go to the main page
        </Button>
        <ProTip />
        <Footer />
      </Box>
    </Layout>
  );
}
