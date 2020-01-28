import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import React, { useState } from 'react';

const UploadComponent = dynamic(() => import("./profileFilePond"), {
  ssr: false
});

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const EditProfile = props => {
  const user = props.user;

  const classes = useStyles();
  const [userData, setUserData] = useState({
    username: user.username,
    name: user.name || "",
    email: user.email || "",
    address1: user.address1 || "",
    address2: user.address2 || "",
    city: user.city || "",
    state: user.state || "",
    country: user.country || "",
    postcode: user.postcode || "",
    avatar: user.avatar || "",
    error: ""
  });

  async function handleSubmit(event) {
    event.preventDefault();
    setUserData(Object.assign({}, userData, { error: "" }));

    // const username = userData.username
    // const password = userData.username
    // const url = '/api/login'
    const url = "/api/editprofile";

    try {
      const response = await fetch(url, {
        method: "POST",

        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userData })
      });
      if (response.status === 200) {
        Router.push("/dashboard");
      } else {
        console.log("Edit failed.");
        // https://github.com/developit/unfetch#caveats
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    } catch (error) {
      console.error(
        "You have an error in your code or there are Network issues.",
        error
      );

      const { response } = error;
      setUserData(
        Object.assign({}, userData, {
          error: response ? response.statusText : error.message
        })
      );
    }
  }

  return (
    <React.Fragment>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            Photo
            <div
              style={{
                backgroundImage: `url('${user.avatar}')`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
                maxHeight: "490px",
                minHeight: "310px"
              }}
            >
              <UploadComponent user={user} />
            </div>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <Typography variant="h6" gutterBottom>
                  Update Personal Details
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Name"
                  fullWidth
                  autoComplete="name"
                  value={userData.name}
                  onChange={event =>
                    setUserData(
                      Object.assign({}, userData, { name: event.target.value })
                    )
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email Address"
                  fullWidth
                  autoComplete="email"
                  value={userData.email}
                  onChange={event =>
                    setUserData(
                      Object.assign({}, userData, { email: event.target.value })
                    )
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address1"
                  name="address1"
                  label="Address line 1"
                  fullWidth
                  autoComplete="billing address-line1"
                  value={userData.address1}
                  onChange={event =>
                    setUserData(
                      Object.assign({}, userData, {
                        address1: event.target.value
                      })
                    )
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address2"
                  name="address2"
                  label="Address line 2"
                  fullWidth
                  autoComplete="address2"
                  value={userData.address2}
                  onChange={event =>
                    setUserData(
                      Object.assign({}, userData, {
                        address2: event.target.value
                      })
                    )
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="city"
                  value={userData.city}
                  onChange={event =>
                    setUserData(
                      Object.assign({}, userData, { city: event.target.value })
                    )
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                  value={userData.state}
                  onChange={event =>
                    setUserData(
                      Object.assign({}, userData, { state: event.target.value })
                    )
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="postcode"
                  name="postcode"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="postcode"
                  value={userData.postcode}
                  onChange={event =>
                    setUserData(
                      Object.assign({}, userData, {
                        postcode: event.target.value
                      })
                    )
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  autoComplete="country"
                  value={userData.country}
                  onChange={event =>
                    setUserData(
                      Object.assign({}, userData, {
                        country: event.target.value
                      })
                    )
                  }
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {userData.error && <p className="error">Error: {userData.error}</p>}
      </form>
    </React.Fragment>
  );
};

export default EditProfile;
