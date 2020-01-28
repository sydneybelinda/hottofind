import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import dynamic from "next/dynamic";
import Router from "next/router";
import React from "react";
import * as Queries from "../../utils/queries";
import SimpleSelect from "./simpleSelect";

// const UploadComponent = dynamic(() => import("./uploadcomponent"), {
//   ssr: false
// });

const ProfileFilePond = dynamic(() => import("./profileFilePond"), {
  ssr: false
});

const styles = theme => ({
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
});

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);

    const user = this.props.userdata;

    var mca = [];
    var countries = [];
    this.props.citydata.map(c => {
      if (mca.indexOf(c.countrycode) === -1) {
        mca.push(c.countrycode);
        countries.push({ label: c.country, value: c.countrycode });
      }
    });

    if (user.city) {
      var cities = [];
      this.props.citydata.map(ct => {
        cities.push({ label: ct.city, value: ct.city.toLowerCase() });
      });
    }

    this.ref1 = React.createRef();

    this.state = {
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
      error: "",
      citydata: cities || [],
      countries: countries,
      error: ""
    };
  }

  _handleChangeCountry = e => {
    this.setState({ cities: "" });
    this.setState({ country: e.target.value });

    const filter = (tag, arr) => arr.filter(ct => ct.countrycode === tag);
    const filtered = filter(e.target.value, this.props.citydata);

    var cts = [];
    filtered.map(ct => {
      cts.push({ label: ct.city, value: ct.city.toLowerCase() });
    });

    this.setState({ citydata: cts });
  };

  _handleChangeCity = e => {
    this.setState({ city: e.target.value });
  };

  onUpdateFiles(fileItems) {}

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ errors: "" });

    var fs = [];

    this.ref1
      .getFiles()
      .map(fileItem => fileItem.file)
      .forEach(file => {
        var name = file.name.split(".")[0];
        var fileName = `${name}.jpg`;

        fs.push({ name: fileName, owner: this.props.user.username });
      });

    this.handleSave;
  };

  handleSave = async event => {
    event.preventDefault();
    this.setState({ error: "" });

    try {
      let response = await Queries.submitProfile(this.state);
      if (response.status === 200) {
        Router.push("/profile");
      } else {
        console.log("Edit failed.");
        // https://github.com/developit/unfetch#caveats
        let error = new Error(response.statusText);

        error.response = response;
        const json = await response.json();
        const resperrors = json.errors[0].message;

        this.setState({
          error: resperrors || error.message
        });

        throw error;
      }
    } catch (error) {
      console.error(
        "You have an error in your code or there are Network issues.",
        error
      );

      const { response } = error;

      //   this.setState({
      //     error:  response ? response.statusText : error.message
      //   })
    }
  };

  render() {
    const user = this.props.user;

    const post = this.props.post || [];

    const { classes } = this.props;

    return (
      <React.Fragment>
        <form noValidate onSubmit={this.handleSave}>
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
                <ProfileFilePond
                  onupdatefiles={this.onUpdateFiles.bind(this)}
                  setRef={ref => (this.ref1 = ref)}
                  //    files={this.props.post.files}
                  handleUploadImages={this.handleUploadImages}
                  user={this.props.userdata}
                />
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
                    value={this.state.name}
                    onChange={event =>
                      this.setState({ name: event.target.value })
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
                    value={this.state.email}
                    onChange={event =>
                      this.setState({ email: event.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="address1"
                    name="address1"
                    label="Address line 1"
                    fullWidth
                    autoComplete="billing address-line1"
                    value={this.state.address1}
                    onChange={event =>
                      this.setState({ address1: event.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="address2"
                    name="address2"
                    label="Address line 2"
                    fullWidth
                    autoComplete="address2"
                    value={this.state.address2}
                    onChange={event =>
                      this.setState({ address2: event.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SimpleSelect
                    options={this.state.countries}
                    value={this.state.country}
                    placeholder="Country"
                    name="country"
                    onChange={this._handleChangeCountry}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SimpleSelect
                    options={this.state.citydata}
                    value={this.state.city}
                    placeholder="City"
                    name="city"
                    onChange={event =>
                      this.setState({ city: event.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    value={this.state.state}
                    onChange={event =>
                      this.setState({ state: event.target.value })
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
                    value={this.state.postcode}
                    onChange={event =>
                      this.setState({ postcode: event.target.value })
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

          {this.state.error ? (
            <p className="error">Error: {this.state.error}</p>
          ) : (
            ""
          )}
        </form>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ProfileForm);
