import React, { Component } from "react";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  withStyles,
  CircularProgress,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { firebaseRegisterUser } from "../../redux/actions/LoginActions";

const logo = 'https://firebasestorage.googleapis.com/v0/b/stow-62251.appspot.com/o/web%2Fassets%2Fimg%2FlogoOutline.png?alt=media&token=7b54fd4e-ef58-4717-9c4b-2fb16a7f8bbf';

const styles = theme => ({
  wrapper: {
    position: "relative"
  },

  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

class SignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phone: "",
    password: "",
    referralCode: "",
  };

  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = event => {
    return this.props.firebaseRegisterUser({ ...this.state });
  };
  
  render() {
    let { firstName, lastName, email, country, phone, password, referralCode } = this.state;
    let { classes } = this.props;
    return (
      <div className="signup flex flex-center w-100 h-100vh">
        <div className="p-8">
          <Card className="signup-card position-relative y-center">
            <Grid container>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <div className="p-32 flex flex-center bg-light-gray flex-middle h-100">
                  <img
                    src={logo}
                    alt=""
                  />
                </div>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <div className="p-36 h-100">
                  <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                    <TextValidator
                      className="mb-24 w-100"
                      variant="outlined"
                      label="First Name"
                      onChange={this.handleChange}
                      type="text"
                      name="firstName"
                      value={firstName}
                      validators={["required"]}
                      errorMessages={["Required"]}
                    />
                     <TextValidator
                      className="mb-24 w-100"
                      variant="outlined"
                      label="Last Name"
                      onChange={this.handleChange}
                      type="text"
                      name="lastName"
                      value={lastName}
                      validators={["required"]}
                      errorMessages={["Required"]}
                    />
                     <TextValidator
                      className="mb-24 w-100"
                      variant="outlined"
                      label="Country"
                      onChange={this.handleChange}
                      type="text"
                      name="country"
                      value={country}
                      validators={["required"]}
                      errorMessages={["Required"]}
                    />
                    <TextValidator
                      className="mb-24 w-100"
                      variant="outlined"
                      label="Phone"
                      onChange={this.handleChange}
                      type="tel"
                      name="phone"
                      value={phone}
                      validators={["required"]}
                      errorMessages={["Required"]}
                    />
                    <TextValidator
                      className="mb-24 w-100"
                      variant="outlined"
                      label="Email"
                      onChange={this.handleChange}
                      type="email"
                      name="email"
                      value={email}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "Required",
                        "Email is not valid"
                      ]}
                    />
                    <TextValidator
                      className="mb-16 w-100"
                      label="Password"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      value={password}
                      validators={["required"]}
                      errorMessages={["Required"]}
                    />
                    <TextValidator
                      className="mb-16 w-100"
                      label="Referral Code (Optional)"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="referralCode"
                      type="text"
                      value={referralCode}
                    />
                    <div className="flex flex-middle">
                      <div className={classes.wrapper}>
                        <Button
                          className="capitalize"
                          variant="contained"
                          color="primary"
                          disabled={this.props.login.loading}
                          type="submit"
                        >
                          SIGN UP
                        </Button>
                        {this.props.login.loading && (
                            <CircularProgress
                              size={24}
                              className={classes.buttonProgress}
                            />
                        )}
                      </div>
                      <span className="ml-16 mr-8">or</span>
                      <Button
                        variant="outlined"
                        color="primary"
                        className="capitalize"
                        onClick={() =>
                          this.props.history.push("/signin")
                        }
                      >
                        LOGIN
                      </Button>
                    </div>
                  </ValidatorForm>
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  firebaseRegisterUser: PropTypes.func.isRequired,
  login: state.login
  // setUser: PropTypes.func.isRequired
});
export default withStyles(styles, { withTheme: true })(
   connect(
    mapStateToProps,
    {firebaseRegisterUser}
  )(SignUp)
);

