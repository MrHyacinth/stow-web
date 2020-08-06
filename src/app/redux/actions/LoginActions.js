import FirebaseAuthService from "../../services/firebase/firebaseAuthService";
import { setUserData } from "./UserActions";
import history from "history.js";
import { message } from 'antd';

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const RESET_PASSWORD = "RESET_PASSWORD";


export function resetPassword({ email }) {
  return dispatch => {
    dispatch({
      type: LOGIN_LOADING
    });

    FirebaseAuthService.passwordReset(email)
      .then(res => {
        message.success('Instructions have been sent to your email address.');
        history.push({
          pathname: "/signin"
        });
        return dispatch({
          payload: email,
          type: RESET_PASSWORD
        });
      })
      .catch(error => {
        message.error(error.message);
        return dispatch({
          type: LOGIN_ERROR,
          payload: error
        });
      })

  };
}

export function firebaseLoginEmailPassword({ email, password }) {
  return dispatch => {
    dispatch({
      type: LOGIN_LOADING
    });

    FirebaseAuthService.signInWithEmailAndPassword(email, password)
      .then( res => {
        const { user } = res;
        if (user) {
          dispatch(setUserData(user));

          history.push({
            pathname: "/dashboard"
          });

          return dispatch({
            type: LOGIN_SUCCESS
          });
        }
      })
      .catch(error => {
        message.error(error.message);
        return dispatch({
          type: LOGIN_ERROR,
          payload: error
        });
      });
  };
}


export function firebaseRegisterUser(userData) {
  return dispatch => {
    const { email, password } = userData;

    dispatch({
      type: LOGIN_LOADING
    });

    FirebaseAuthService.signUpWithEmailAndPassword(email, password)
      .then(res => {
        const { user } = res;
        if (user) {
          const { uid } = user;
          FirebaseAuthService.saveUserData(uid,userData)
            .then(() => {
              dispatch(setUserData(user));

              history.push({
                pathname: "/dashboard"
              });
              return dispatch({
                type: LOGIN_SUCCESS
              });
          })
          .catch(error => {
            message.error(error.message);
            return dispatch({
              type: LOGIN_ERROR,
              payload: error
            });
          });
        }
      })
      .catch(error => {
        message.error(error.message);
        return dispatch({
          type: LOGIN_ERROR,
          payload: error
        });
      });
  };
}
