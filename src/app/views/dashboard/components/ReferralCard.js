import React, { Component } from "react";
import {
  Card,
  Button
} from "@material-ui/core";
import { connect } from "react-redux";

const ReferralCard = props => {
  // console.log(props);
  const { user, success, loading } = props;
  const cid = user && user.uid && user.uid.slice(0,6).toUpperCase();

  return (
    <Card className="p-sm-24 mb-24">
      <Card elevation={0} className="upgrade-card bg-light-primary p-sm-24">
        <p className="text-muted m-0 ">
          Refer a friend to
          <br />
          earn <b>rewards</b>
        </p>  
       
          <br />
        
       <p className="text-muted m-0 ">
          Referral Code:
        </p>
        <Button
          className="uppercase"
          size="medium"
          variant="contained"
          color="primary"
        >
          {cid}
        </Button>
      </Card>
    </Card>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  success: state.login.success,
  loading: state.login.loading,
});

export default connect(
  mapStateToProps
)(ReferralCard);

// export default ReferralCard;
