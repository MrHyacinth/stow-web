import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { setUserData } from "../redux/actions/UserActions";
import firebaseAuthService from "../services/firebase/firebaseAuthService";
import history from "history.js";

class Auth extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
    this.checkFirebaseAuth();
  }

  checkFirebaseAuth = () => {

    const { setUserData } = this.props;

    firebaseAuthService.checkAuthStatus(user => {
      if ( user ) {
        // console.log(user);
        setUserData(user);
      } else {
        // history.replace({
        //   pathname: "/signin"
        // });
      }
    });
  };

  render() {
    const { children } = this.props;
    return <Fragment>{children}</Fragment>;
  }
}

const mapStateToProps = state => ({
  setUserData: PropTypes.func.isRequired,
  login: state.login
});

export default connect(
  mapStateToProps,
  { setUserData }
)(Auth);
