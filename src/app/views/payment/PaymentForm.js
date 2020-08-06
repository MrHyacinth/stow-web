import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import sha512 from "js-sha512";

import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore();

const mac =
  "D3D1D05AFE42AD50818167EAC73C109168A0F108F32645C8B59E897FA930DA44F9230910DAC9E20641823799A107A02068F7BC0F4CC41D2952E249552255710F";
const prodid = 1076;
const payitemid = 101;
const qurl =
  "https://sandbox.interswitchng.com/collections/api/v1/gettransaction.json?";
const sitename = "www.stow.ng";

// End Interswitch Variables

function priceFormat(num) {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export default function PaymentForm(props) {
  // console.log(props);
  const { location, history } = props;

  const {
    rurl,
    amt,
    cur,
    pid,
    pnm,
    uid,
    unm,
    paymentPlan,
    paymentPlanPrice,
    paymentOption,
    tid
  } = location.state;
  var amtt = +(Math.round(amt + "e+2") + "e-2") * 100;
  var amount = +(Math.round(amtt + "e+2") + "e-2");
  var trf = "INT-";
  for (var i = 0; i < 6; i++) {
    trf += Math.floor(Math.random() * (9 - 0) + 0).toString();
  }
  var hashv = trf + prodid + payitemid + amount + rurl + mac;
  var hash = sha512(hashv);
  var dateTr = new Date();
  const dateTrans = dateTr.toDateString();

  return (
    <div
      style={{
        margin: "3em",
        backgroundColor: "#fff",
        padding: "5%"
      }}
    >
      <h4
        style={{ position: "relative", fontWeight: "bold", marginBottom: "5%" }}
      >
        PAYMENT SUMMARY
      </h4>
      <table
        className="paymentTable"
        style={{ backgroundColor: "#fafafa", width: "100%" }}
      >
        <tr
          style={{
            display: "block",
            marginBottom: 15,
            marginTop: 10,
            paddingLeft: 10
          }}
        >
          <td style={{ width: "35%", display: "inline-block" }}>
            <b>Customer Name:</b>
          </td>
          <td style={{ display: "inline-block" }}>{unm}</td>
        </tr>
        <tr style={{ display: "block", marginBottom: 15, paddingLeft: 10 }}>
          <td style={{ width: "35%", display: "inline-block" }}>
            <b>Property Name:</b>
          </td>
          <td style={{ display: "inline-block" }}>{pnm}</td>
        </tr>
        <tr style={{ display: "block", marginBottom: 15, paddingLeft: 10 }}>
          <td style={{ width: "35%", display: "inline-block" }}>
            <b>Payment Plan:</b>
          </td>
          <td style={{ display: "inline-block" }}>{paymentPlan}</td>
        </tr>
        <tr style={{ display: "block", marginBottom: 15, paddingLeft: 10 }}>
          <td style={{ width: "35%", display: "inline-block" }}>
            <b>Payment Option:</b>
          </td>
          <td style={{ display: "inline-block" }}>{paymentOption}</td>
        </tr>
        <tr style={{ display: "block", marginBottom: 15, paddingLeft: 10 }}>
          <td style={{ width: "35%", display: "inline-block" }}>
            <b>Transaction Date:</b>
          </td>
          <td style={{ display: "inline-block" }}>{dateTrans}</td>
        </tr>
        <tr style={{ display: "block", marginBottom: 15, paddingLeft: 10 }}>
          <td style={{ width: "35%", display: "inline-block" }}>
            <b>Transaction Reference:</b>
          </td>
          <td style={{ display: "inline-block" }}>{trf}</td>
        </tr>
        <tr style={{ display: "block", marginBottom: 15, paddingLeft: 10 }}>
          <td style={{ width: "35%", display: "inline-block" }}>
            <b>Amount:</b>
          </td>
          <td style={{ display: "inline-block" }}>{`₦ ${priceFormat(amt)}`}</td>
          <td style={{ display: "inline-block", textAlign: "right" }}>
            <img
              style={{ width: "75%" }}
              src="https://firebasestorage.googleapis.com/v0/b/stow-62251.appspot.com/o/web%2Fassets%2Fimg%2Fisw_logo.png?alt=media&token=3c1a4880-5241-4143-b7f3-9bb179fa144a"
            />
          </td>
        </tr>
      </table>

      <form
        action="https://sandbox.interswitchng.com/collections/w/pay"
        method="POST"
        style={{ margin: "5% auto 10%" }}
      >
        <input name="amount" type="hidden" value={amt * 100} />
        <input name="currency" type="hidden" value={cur} />
        <input name="cust_id" type="hidden" value={uid} />

        <input name="hash" type="hidden" value={hash} />
        <input name="txn_ref" type="hidden" value={trf} />
        <input name="pay_item_id" type="hidden" value={payitemid} />
        <input name="product_id" type="hidden" value={prodid} />
        <input name="site_redirect_url" type="hidden" value={rurl} />
        <input name="site_name" type="hidden" value={sitename} />

        <input name="cust_id_desc" type="hidden" value={uid} />
        <input name="cust_name" type="hidden" value={unm} />
        <input name="cust_name_desc" type="hidden" value={unm} />
        <input
          style={{
            outline: "none",
            border: "1px solid #ddd",
            padding: "1% 2%",
            background: "#fff",
            height: "40px",
            cursor: "pointer"
          }}
          type="reset"
          value="Cancel"
          onClick={async e => {
            history.go(-1);
          }}
        />
        <input
          style={{
            backgroundColor: "#7cc244",
            color: "#fff",
            float: "right",
            outline: "none",
            border: "none",
            padding: "1% 2%",
            height: "40px",
            cursor: "pointer"
          }}
          type="submit"
          value="Pay via Interswitch"
          onClick={async e => {
            console.log(e);
            const paymentValid = false;

            const paymData = {
              paymentValid,
              tid
            };

            const addPay = await db
              .collection("payments")
              .doc(trf)
              .set(paymData);

            const addPayToTrans = await db
              .collection("transactions")
              .doc(tid)
              .collection("payments")
              .doc(trf)
              .set(paymData);
          }}
        />
      </form>
    </div>
  );
}
