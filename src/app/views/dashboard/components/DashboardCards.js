import React, { Component } from "react";
import {
  Grid,
  Card,
  Icon,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { withRouter, Link } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { priceFormat } from 'app/functions/functions';


const DashboardCards = ({theme}) => {
  const [ cuser, cuserSet ] = React.useState({ uid: '' });
  const [ userProperties, userPropertiesSet ] = React.useState([]);
  const db = firebase.firestore();

  React.useEffect( () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        cuserSet(user);
      } else {
        // No user is signed in.
      }
    });
  },[]);

  React.useEffect( () => {

    let transactionsRef
     = db.collection('transactions');
    let query = transactionsRef
    .where('uid', '==', cuser.uid)
    .where('paid', '>', 0)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        return;
      }  
      var uProperties = [];
      snapshot.forEach(doc => {
        uProperties.push({
          id:doc.id,
          ...doc.data(),
        })
      });
      userPropertiesSet(uProperties);
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });

  },[cuser]);

  return (
    <Grid container spacing={3} className="mb-24">
      <Grid item xs={12} md={6}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex flex-middle">
            <Icon
              style={{
                fontSize: "44px",
                opacity: 0.6,
                color: theme.palette.primary.main
              }}
            >
              add_box
            </Icon>
            <div className="ml-12">
              <h6 className="m-0 mt-4 text-primary font-weight-500">Buy a Property</h6>
              <small className="text-muted"></small>
            </div>
          </div>
          <Tooltip title="View Properties" placement="top">
            <Link to={`/properties`}>
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Link>
          </Tooltip>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex flex-middle">
            <Icon
              style={{
                fontSize: "44px",
                opacity: 0.6,
                color: theme.palette.primary.main
              }}
            >
              payment
            </Icon>
            <div className="ml-12">
              <h6 className="m-0 mt-4 text-primary font-weight-500">Last Payment</h6>
              <small className="text-muted">
                ₦{ userProperties[0] 
                  && userProperties[0].lastPayment 
                  && priceFormat(userProperties[0].lastPayment) 
                  || 0
                }
              </small>
            </div>
          </div>
          <Tooltip title="View Payment" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex flex-middle">
            <Icon
              style={{
                fontSize: "44px",
                opacity: 0.6,
                color: theme.palette.primary.main
              }}
            >
              store
            </Icon>
            <div className="ml-12">
              <h6 className="m-0 mt-4 text-primary font-weight-500">
                My Properties
              </h6>
              <small className="text-muted">
                {userProperties.length}
              </small>
            </div>
          </div>
          <Tooltip title="My Properties" placement="top">
            <Link to={`/user/properties`}>
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
            </Link>
          </Tooltip>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex flex-middle">
            <Icon
              style={{
                fontSize: "44px",
                opacity: 0.6,
                color: theme.palette.primary.main
              }}
            >
              shopping_cart
            </Icon>
            <div className="ml-12">
              <h6 className="m-0 mt-4 text-primary font-weight-500">
                Mortgage Calculator
              </h6>
              <small className="text-muted"></small>
            </div>
          </div>
          <Tooltip title="Calculate Mortgage" placement="top">
            <Link to={`/mortgage/calculator`}>
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Link>
          </Tooltip>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardCards;
