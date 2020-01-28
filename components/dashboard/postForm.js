import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import dynamic from "next/dynamic";
import Router from "next/router";
import React from "react";
import { COUNTRYCODE } from "../../config";
import SimpleSelect from "./simpleSelect";


// const UploadComponent = dynamic(() => import("./uploadcomponent"), {
//   ssr: false
// });

const FilePond = dynamic(() => import("./filePond"), {
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

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    const user = this.props.user;

    const post = this.props.post || [];

    this.ref1 = React.createRef();

    this.state = {
      id: this.props.post ? this.props.post.id : undefined,
      owner: post.owner || user.username,
      firstname: post.firstname || "",
      lastname: post.lastname || "",
      country: post.country || COUNTRYCODE,
      age: post.age || "",
      email: post.email || user.email,
      avatar: post.files || "",
      catindex: post.catindex || "",
      keyindex: post.keyindex || "",
      cities: post.cities || "",
      location: post.location || "",
      title: post.title || "",
      phone: post.phone || "",
      price: post.price || "",
      description: post.description || "",
      website: post.website || "",
      rawcities: this.props.citydata,
      citydata: [],
      countries: [],
      currencies: [],
      maincategories: [],
      subcategories: [],
      error: "",
      files: post ? this.props.post.files : [],
      newfiles: []
    };
  }

  componentDidMount = () => {
    var mc = [];
    var mainCats = [];
    this.props.categories.map(cat => {
      if (mc.indexOf(cat.maincategory) === -1) {
        mc.push(cat.maincategory);
        mainCats.push({ label: cat.maincategory, value: cat.catindex });
      }
    });
    this.setState({ maincategories: mainCats });

    if (this.state.keyindex) {
      const filter = (tag, arr) => arr.filter(cat => cat.catindex === tag);
      const filtered = filter(this.state.catindex, this.props.categories);

      var subCats = [];
      filtered.map(cat => {
        subCats.push({ label: cat.subcategory, value: cat.keyindex });
      });

      this.setState({ subcategories: subCats });
    }

    var cities = [];
    this.props.citydata.map(ct => {
      cities.push({ label: ct.city, value: ct.city.toLowerCase() });
    });

    this.setState({ citydata: cities });
  };

  _handleChangeCity = e => {
    this.setState({ cities: e.target.value });
  };

  _handleChangeCategory = e => {
    this.setState({ keyindex: "" });
    this.setState({ catindex: e.target.value });

    const filter = (tag, arr) => arr.filter(cat => cat.catindex === tag);
    const filtered = filter(e.target.value, this.props.categories);

    var subCats = [];
    filtered.map(cat => {
      subCats.push({ label: cat.subcategory, value: cat.keyindex });
    });

    this.setState({ subcategories: subCats });
  };

  _handleChangeSubCategory = e => {
    this.setState({ keyindex: e.target.value });
  };

  onUpdateFiles(fileItems) {}

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ error: "" });

    var fs = [];

    this.ref1
      .getFiles()
      .map(fileItem => fileItem.file)
      .forEach(file => {
        var name = file.name.split(".")[0];
        var fileName = `${name}.jpg`;
        fs.push({ name: fileName, owner: this.props.user.username });
      });

    this.setState(
      {
        uploads: fs
      },
      this.handleSave
    );
  };

  handleSave = async event => {
    const url = "/api/dashboard/post/edit";

    try {
      const response = await fetch(url, {
        method: "POST",

        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state)
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

      this.setState({ error: response ? response.statusText : error.message });
    }
  };

  render() {
    const user = this.props.user;

    const post = this.props.post || [];

    const { classes } = this.props;

    return (
      <React.Fragment>
        <form noValidate onSubmit={this.handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              Photo
              <div
                style={{
                  // backgroundImage: `url('${user.avatar}')`,
                  // backgroundSize: "cover",
                  // backgroundPosition: "center top",
                  // maxHeight: "490px",
                  minHeight: "310px"
                }}
              >
                {/* <UploadComponent user={user} /> */}
                <FilePond
                  onupdatefiles={this.onUpdateFiles.bind(this)}
                  setRef={ref => (this.ref1 = ref)}
                  files={this.props.post.files}
                  handleUploadImages={this.handleUploadImages}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6" gutterBottom>
                    Ad Details
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <SimpleSelect
                    options={this.state.maincategories}
                    value={this.state.catindex}
                    placeholder="Category"
                    name="category"
                    onChange={this._handleChangeCategory}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SimpleSelect
                    options={this.state.subcategories}
                    value={this.state.keyindex}
                    placeholder="Subcategory"
                    name="subcategory"
                    onChange={this._handleChangeSubCategory}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SimpleSelect
                    options={this.state.citydata}
                    value={this.state.cities}
                    placeholder="City"
                    name="city"
                    onChange={this._handleChangeCity}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="title"
                    name="title"
                    label="Title"
                    fullWidth
                    autoComplete="title"
                    value={this.state.title}
                    variant="outlined"
                    onChange={event =>
                      this.setState({ title: event.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="price"
                    name="price"
                    label="Price"
                    fullWidth
                    autoComplete="price"
                    value={this.state.price}
                    variant="outlined"
                    onChange={event =>
                      this.setState({ price: event.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="description"
                    label="Description"
                    name="description"
                    multiline
                    fullWidth
                    rows="10"
                    value={this.state.description}
                    variant="outlined"
                    onChange={event =>
                      this.setState({ description: event.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="website"
                    name="website"
                    label="Website URL (inc https://)"
                    fullWidth
                    autoComplete="Website"
                    value={this.state.website}
                    variant="outlined"
                    onChange={event =>
                      this.setState({ website: event.target.value })
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6" gutterBottom>
                    Contact Details
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="firstname"
                    name="firstname"
                    label="First Name"
                    fullWidth
                    autoComplete="firstname"
                    value={this.state.firstname}
                    onChange={event =>
                      this.setState({ firstname: event.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="lastname"
                    name="lastname"
                    label="Last Name"
                    fullWidth
                    autoComplete="lastname"
                    value={this.state.lastname}
                    onChange={event =>
                      this.setState({ lastname: event.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="age"
                    name="age"
                    label="Age"
                    fullWidth
                    autoComplete="age"
                    value={this.state.age}
                    onChange={event =>
                      this.setState({ age: event.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="phone"
                    name="phone"
                    label="Phone Number"
                    fullWidth
                    autoComplete="phone"
                    value={this.state.phone}
                    onChange={event =>
                      this.setState({ phone: event.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
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
                <Grid item xs={12} sm={12}>
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
          </Grid>
          {this.state.error && (
            <p className="error">Error: {this.state.error}</p>
          )}
        </form>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(PostForm);
