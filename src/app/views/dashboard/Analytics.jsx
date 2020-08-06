import React, { Component, Fragment } from "react";
import {
  Grid,
  Card
} from "@material-ui/core";

import ModifiedAreaChart from "./shared/ModifiedAreaChart";

import DashboardCards from "./components/DashboardCards";
import ReferralCard from "./components/ReferralCard";

import { withStyles } from "@material-ui/styles";

class Dashboard1 extends Component {
  state = {};

  render() {
    let { theme } = this.props;

    return (
      <Fragment>
        <div className="pb-86 pt-30 px-30 bg-secondary">
        <h3 className="text-white"> Upcoming Milestones </h3>
          <ModifiedAreaChart
           height="280px"
           option={{
             series: [
               {
                 data: [0, 0, 0, 0, 10, 10, 15, 20, 27, 40, 70, 100],
                 type: "line"
               }
             ],
             xAxis: {
               data: [
                 "Jan",
                 "Feb",
                 "Mar",
                 "Apr",
                 "May",
                 "Jun",
                 "Jul",
                 "Aug",
                 "Sep",
                 "Oct",
                 "Nov",
                 "Dec",
               ]
             }
           }}
         ></ModifiedAreaChart>
        </div>

        <div className="analytics m-sm-30 mt--72">
          <Grid container spacing={2}>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <DashboardCards theme={theme}/>
            </Grid>

            <Grid item lg={4} md={4} sm={12} xs={12}>
              <ReferralCard/>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

export default withStyles({}, { withTheme: true })(Dashboard1);
