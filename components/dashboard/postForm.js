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
import UpdateElastic from "../updateElastic"
import CircularProgress from '@material-ui/core/CircularProgress';
import * as EmailValidator from 'email-validator';
import {checkUrl} from "../../utils/queries";


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
  },
  container: {
    padding: 0,
    [theme.breakpoints.up("sm")]: {
      padding: 16,
    },
  },
  error: {
    color: "#ff1744",
    margin: "24px 14px 0",
    fontSize: "1rem",
    textAlign: "left",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: '1em',
    letterSpacing: '0.03333em'

  },
  spinner:{
  width: "15px !important",
  color: "white !important",
  height: "15px !important",
  position: "absolute",
  right: "20px !important",
  },
  formDisabled: {
    background: "gainsboro"
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
      newfiles: [],
      formDisabled: false,
      categoryError: false,
      categoryHelper: '',
      locationError: false,
      locationHelper: '',
      subError: false,
      subHelper: '',
      cityError: false,
      cityHelper: '',
      titleError: false,
      titleHelper: '',
      descriptionError: false,
      descriptionHelper: '',
      firstnameError: false,
      firstNameHelper: '',
      phoneError: false,
      phoneHelper: '',
      emailError: false,
      emailHelper: '',
      priceError: false,
      priceHelper: '',
      ageError: false,
      ageHelper: '',
      websiteError: false,
      websiteHelper: '',
      
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
    this.setState({ cities: e.target.value, cityError: false, cityHelper: ''  });
  };

  _handleChangeCategory = e => {
    this.setState({ keyindex: "" });
    this.setState({ catindex: e.target.value, categoryError: false, categoryHelper: '' });

    const filter = (tag, arr) => arr.filter(cat => cat.catindex === tag);
    const filtered = filter(e.target.value, this.props.categories);

    var subCats = [];
    filtered.map(cat => {
      subCats.push({ label: cat.subcategory, value: cat.keyindex });
    });

    this.setState({ subcategories: subCats });
  };

  _handleChangeSubCategory = e => {
    this.setState({ keyindex: e.target.value, subError: false, subHelper: '' });
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
        UpdateElastic(this.state)

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

  chkTitle = async (e) => {
      

    if (!this.state.title){ 
      this.setState({ titleError: true, titleHelper:  "Title is required" })
    } else {
      this.setState({ titleError: false, titleHelper:  ""})
    }
  
  }

  chkCategory = async (e) => {
      

    if (!this.state.catindex){ 
      this.setState({ categoryError: true, categoryHelper:  "Category is required" })
    } else {
      this.setState({ categoryError: false, categoryHelper:  ""})
    }
  
  }

  chkSub = async (e) => {
      

    if (!this.state.keyindex){ 
      this.setState({ subError: true, subHelper:  "Subcategory is required" })
    } else {
      this.setState({ subError: false, subHelper:  ""})
    }
  
  }

  chkCity = async (e) => {
      

    if (!this.state.cities){ 
      this.setState({ cityError: true, cityHelper:  "City is required" })
    } else {
      this.setState({ cityError: false, cityHelper:  ""})
    }
  
  }

  chkLocation = async (e) => {
      

    if (!this.state.location){ 
      this.setState({ locationError: true, locationHelper:  "Location is required" })
    } else {
      this.setState({ locationError: false, locationHelper:  ""})
    }
  
  }

  chkDescription = async (e) => {
      

    if (!this.state.description){ 
      this.setState({ descriptionError: true, descriptionHelper:  "Description is required" })
    } else {
      this.setState({ descriptionError: false, descriptionHelper:  ""})
    }
  
  }

  
  chkFirstname = async (e) => {
      

    if (!this.state.firstname){ 
      this.setState({ firstnameError: true, firstnameHelper:  "Firstname is required" })
    } else {
      this.setState({ firstnameError: false, firstnameHelper:  ""})
    }
  
  }

  chkPhone = async (e) => {
      

    if (!this.state.phone){ 
      this.setState({ phoneError: true, phoneHelper:  "Phone Number is required" })
    } else {
      var regex = /^[0-9+ ]+$/;
      if(!regex.test(this.state.phone)){
        this.setState({ phoneError: true, phoneHelper:  "Incorrect format.  Use only numbers" })
      } else {
      this.setState({ phoneError: false, phoneHelper:  ""})
      }
    }
  
  }

  chkPrice = async (e) => {

    if (this.state.price){
      var regex = /^[0-9]+$/;
      if(!regex.test(this.state.price)){
        this.setState({ priceError: true, priceHelper:  "Incorrect format.  Use only numbers" })
      } else {
      this.setState({ priceError: false, priceHelper:  ""})
      }
    }
    
  
  }

  chkWebsite = async (e) => {

    if (this.state.website){

      
      const status = await checkUrl(this.state.website);

      
      if (status != 200) {
        this.setState({ websiteError: true, websiteHelper:  "Website does not exist" })
      }
    } else {
      this.setState({ websiteError: false, websiteHelper:  ""})
      }
    }
    

  chkAge = async (e) => {

    if (this.state.age){
      var regex = /^[0-9]+$/;
      if(!regex.test(this.state.age)){
        this.setState({ ageError: true, ageHelper:  "Incorrect format.  Use only numbers" })
      } else {
      this.setState({ ageError: false, ageHelper:  ""})
      }
    }
    
  
  }

  chkEmail = async (e) => {
      

    if (!this.state.email){ 
      this.setState({ emailError: true, emailHelper:  "Email Address is required" })
    } else {
      const valid = EmailValidator.validate(this.state.email);
      if (!valid){
          this.setState({ emailError: true, emailHelper:  "Email address is not Valid"  })
      } else {

      this.setState({ emailError: false, emailHelper:  ""})
      }
    }
  
  }

  submitPost = async (e) => {
    this.setState({loading: true, formDisabled: true}) 

    var catCheck = await this.chkCategory();
    var subCheck = await this.chkSub();
    var locationCheck = await this.chkLocation();
    var titleCheck = await this.chkTitle();
    var cityCheck = await this.chkCity();
    var descCheck = await this.chkDescription();
    var firstnameCheck = await this.chkFirstname();
    var phoneCheck = await this.chkPhone();
    var emailCheck = await this.chkEmail();
    var priceCheck = await this.chkPrice();
    var ageCheck = await this.chkAge();
    var websiteCheck = await this.chkWebsite();

    if(!this.state.categoryError &&
      !this.state.subcategoryError &&
      !this.state.cityError &&
      !this.state.locationError &&
      !this.state.titleError &&
      !this.state.descriptionError &&
      !this.state.firstnameError &&
      !this.state.phoneError &&
      !this.state.emailError &&
      !this.state.ageError &&
      !this.state.priceError 
  //    !this.state.websiteError
      
      ){

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
  

    }
    this.setState({loading: false, formDisabled: false})
  
  }

  render() {
    const user = this.props.user;

    const post = this.props.post || [];

    const { classes } = this.props;

    return (
      <React.Fragment>
        <form noValidate  >
          <Grid container spacing={4} 
          
          
          className={this.state.formDisabled ? classes.formDisabled : classes.formEnabled}
          >
            <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
                   Photos
                  </Typography>
              <div
                style={{
                  // backgroundImage: `url('${user.avatar}')`,
                  // backgroundSize: "cover",
                  // backgroundPosition: "center top",
                  // maxHeight: "490px",
                  minHeight: "0"
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
                  required
                    options={this.state.maincategories}
                    value={this.state.catindex}
                    placeholder="Category"
                    name="category"
                    onChange={this._handleChangeCategory}
                    error={this.state.categoryError}
                    helperText={this.state.categoryHelper}
                    onBlur={this.chkCategory}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SimpleSelect
                  required
                    options={this.state.subcategories}
                    value={this.state.keyindex}
                    placeholder="Subcategory"
                    name="subcategory"
                    onChange={this._handleChangeSubCategory}
                    error={this.state.subError}
                    helperText={this.state.subHelper}
                    onBlur={this.chkSub}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SimpleSelect
                  required
                    options={this.state.citydata}
                    value={this.state.cities}
                    placeholder="City"
                    name="city"
                    onChange={this._handleChangeCity}
                    error={this.state.cityError}
                    helperText={this.state.cityHelper}
                    onBlur={this.chkCity}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="location"
                    name="location"
                    label="Location"
                    fullWidth
                    autoComplete="location"
                    value={this.state.location}
                    variant="outlined"
                    onChange={event =>
                      this.setState({ location: event.target.value, locationError: false, locationHelper: '' })
                    }
                    error={this.state.locationError}
                    helperText={this.state.locationHelper}
                    onBlur={this.chkLocation}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="title"
                    name="title"
                    label="Title"
                    error={this.state.titleError}
                    helperText={this.state.titleHelper}
                    fullWidth
                    autoComplete="title"
                    value={this.state.title}
                    variant="outlined"
                    onChange={event =>
                      this.setState({ title: event.target.value, titleError: false, titleHelper: '' })
                    }
                    onBlur={this.chkTitle}
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
                      this.setState({ price: event.target.value, priceError: false, priceHelper: '' })
                    }
                    error={this.state.priceError}
                    helperText={this.state.priceHelper}
                    onBlur={this.chkPrice}
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
                      this.setState({ description: event.target.value, descriptionError: false, descriptionHelper: '' })
                    }
                    error={this.state.descriptionError}
                    helperText={this.state.descriptionHelper}
                    onBlur={this.chkDescription}
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
                      this.setState({ website: event.target.value, websiteError: false, websiteHelper: '' })
                    }
                    // error={this.state.websiteError}
                    // helperText={this.state.websiteHelper}
                    // onBlur={this.chkWebsite}
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
                      this.setState({ firstname: event.target.value, firstnameError: false, firstnameHelper: '' })
                    }
                    error={this.state.firstnameError}
                    helperText={this.state.firstnameHelper}
                    onBlur={this.chkFirstname}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                  
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
                    id="age"
                    name="age"
                    label="Age"
                    fullWidth
                    autoComplete="age"
                    value={this.state.age}
                    onChange={event =>
                      this.setState({ age: event.target.value, ageError: false, ageHelper: '' })
                    }
                    error={this.state.ageError}
                    helperText={this.state.ageHelper}
                    onBlur={this.chkAge}
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
                      this.setState({ phone: event.target.value, phoneError: false, phoneHelper: '' })
                    }
                    error={this.state.phoneError}
                    helperText={this.state.phoneHelper}
                    onBlur={this.chkPhone}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email Address"
                    fullWidth
                    value={this.state.email}
                    onChange={event =>
                      this.setState({ email: event.target.value, emailError: false, emailHelper: '' })
                    }
                    error={this.state.emailError}
                    helperText={this.state.emailHelper}
                    onBlur={this.chkEmail}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.submitPost}
                    disabled={this.state.formDisabled}
                  >
                    Submit  {this.state.loading ? <CircularProgress className={classes.spinner} /> : '' }
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
