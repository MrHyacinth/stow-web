import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Button,
  Icon,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import { Breadcrumb, SimpleCard } from "matx";
import { Spin, message } from "antd";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

class AccountSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      dob: new Date(),
      email: "",
      phone: "",
      gender: ""
    };
  }

  unsubLoadUser = async () => {
    const thisG = this;
    return await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { uid } = user;
        firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .get()
          .then(doc => {
            let user = doc.data();
            if (user) {
              thisG.setState({
                uid,
                ...user,
                dob: user.dob ? user.dob.toDate() : this.state.dob
              });
            }
            // return user;
          })
          .catch(error => {
            message.error(error.message);
          });
      }
    });
  };

  componentDidMount() {
    // console.log(this.props);
    this.unsubLoadUser();
  }

  componentWillMount() {
    // console.log('UNOMUNT');
    // console.log(this.props);
    this.unsubLoadUser();
  }

  updateUserFirebase = () => {
    const vals = this.state;
    const { user } = this.props;
    const { uid } = user;

    let setUser = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update(vals)
      .then(function() {
        // let setUser = firebase.database().ref('users/'+uid).set(vals);
        const { firstName, lastName, phone } = vals;
        const displayName = firstName + " " + lastName;

        firebase
          .auth()
          .currentUser.updateProfile({
            displayName,
            phone
          })
          .then(function() {
            message.success("Settings Saved");
          })
          .catch(function(error) {
            message.error("There was an issue saving");
          });
      })
      .catch(function(error) {
        message.error("There was an issue saving");
      });
  };

  handleSubmit = event => {
    // console.log(event);
    return this.updateUserFirebase();
  };

  handleChange = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDateChange = dob => {
    console.log(dob);
    console.log(typeof dob);
    this.setState({ dob });
  };

  render() {
    // made some changes here
    const { user } = this.props;
    const { uid, displayName, dob, email, phone, gender } = user;

    if (!uid) return <Spin />;

    const cid = uid && uid.slice(0, 6).toUpperCase();
    const fname = displayName.split(" ");

    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Account Settings" }]} />
        </div>
        <SimpleCard title="">
          <div>
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
              onError={errors => null}
            >
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextValidator
                    className="mb-16 w-100"
                    label="First Name"
                    onChange={this.handleChange}
                    type="text"
                    name="firstName"
                    value={fname[0]}
                    validators={["required"]}
                    errorMessages={["Required"]}
                  />
                  <TextValidator
                    className="mb-16 w-100"
                    label="Last Name"
                    onChange={this.handleChange}
                    type="text"
                    name="lastName"
                    value={fname[1]}
                    validators={["required"]}
                    errorMessages={["Required"]}
                  />

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className="mb-16 w-100"
                      margin="none"
                      id="mui-pickers-date"
                      label="Date of Birth"
                      inputVariant="standard"
                      type="text"
                      autoOk={true}
                      value={dob}
                      onChange={this.handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextValidator
                    className="mb-16 w-100 "
                    label="Customer #"
                    type="text"
                    name="cid"
                    value={cid}
                    disabled={true}
                  />
                  <TextValidator
                    className="mb-16 w-100"
                    label="Email"
                    onChange={this.handleChange}
                    type="email"
                    name="email"
                    value={email}
                    validators={["required", "isEmail"]}
                    errorMessages={["Required", "Email is not valid"]}
                    disabled={true}
                  />

                  <TextValidator
                    className="mb-16 w-100"
                    label="Phone Number"
                    onChange={this.handleChange}
                    type="text"
                    name="phone"
                    value={phone}
                    validators={["required"]}
                    errorMessages={["Required"]}
                  />
                  <RadioGroup
                    className="mb-16"
                    value={gender}
                    name="gender"
                    onChange={this.handleChange}
                    row
                  >
                    <FormControlLabel
                      value="Male"
                      control={<Radio color="secondary" />}
                      label="Male"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="Female"
                      control={<Radio color="secondary" />}
                      label="Female"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
              <Button color="primary" variant="contained" type="submit">
                <Icon>send</Icon>
                <span className="pl-8 capitalize">SAVE</span>
              </Button>
            </ValidatorForm>
          </div>
        </SimpleCard>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  success: state.login.success,
  loading: state.login.loading
});

export default connect(mapStateToProps)(AccountSettings);
