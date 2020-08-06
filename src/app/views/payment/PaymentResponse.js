import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";

import { useDocumentData } from "react-firebase-hooks/firestore";

import firebase from "firebase/app";
import "firebase/firestore";

// End Interswitch Variables

function priceFormat(num) {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export default function PaymentResponse(props) {
  // console.log(props);
  const { location, history } = props;

  const trfPath = location.pathname.split("/");
  var trf = trfPath && trfPath[trfPath.length - 1];

  const [value, loading, error] = useDocumentData(
    firebase
      .firestore()
      .collection("payments")
      .doc(trf),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );
  if (loading) {
    return <span>Document: Loading...</span>;
  }

  if (error) {
    return <strong>Error: {JSON.stringify(error)}</strong>;
  }

  if (!value) return null;
  // {error && }

  const {
    c_respCode,

    c_respDsc,
    c_date,
    c_transRef,
    c_amt
  } = value;
  var resCol = c_respCode == "00" ? "green" : "red";

  var resMsg = c_respCode == "00" ? "SUCCESSFUL" : "FAILED";

  if (!c_respCode || !c_date) {
    return (
      <div
        style={{
          margin: "3em",
          backgroundColor: "#fff",
          padding: "5%"
        }}
      >
        <b
          style={{
            position: "relative",
            fontWeight: "bold",
            marginBottom: "5%",
            color: resCol
          }}
        >
          Payment Processing. Please Wait.
        </b>
      </div>
    );
  }
  return (
    <div
      style={{
        margin: "3em",
        backgroundColor: "#fff",
        padding: "5%"
      }}
    >
      <b
        style={{
          position: "relative",
          fontWeight: "bold",
          marginBottom: "5%",
          color: resCol
        }}
      >
        {`PAYMENT ${resMsg}`}
      </b>

      <table style={{ backgroundColor: "#fafafa", width: "100%" }}>
        <tr
          style={{
            display: "block",
            marginBottom: 15,
            marginTop: 10,
            paddingLeft: 10,
            color: resCol
          }}
        >
          <td style={{ width: "35%", display: "inline-block" }}>
            <b>Reason:</b>
          </td>
          <td style={{ display: "inline-block" }}>{c_respDsc}</td>
        </tr>

        <tr style={{ display: "block", marginBottom: 15, paddingLeft: 10 }}>
          <td style={{ width: "35%", display: "inline-block" }}>
            <b>Date:</b>
          </td>
          <td style={{ display: "inline-block" }}>
            {new Date(c_date).toDateString()}
          </td>
        </tr>

        <tr style={{ display: "block", marginBottom: 15, paddingLeft: 10 }}>
          <td style={{ width: "35%", display: "inline-block" }}>
            <b>Reference:</b>
          </td>
          <td style={{ display: "inline-block" }}>{c_transRef}</td>
        </tr>

        <tr style={{ display: "block", marginBottom: 15, paddingLeft: 10 }}>
          <td style={{ width: "35%", display: "inline-block" }}>
            <b>Amount:</b>
          </td>
          <td style={{ display: "inline-block" }}>{c_amt}</td>
        </tr>

        <div style={{ display: "block", marginBottom: 15, paddingLeft: 10 }}>
          <input
            style={{
              float: "right",
              outline: "none",
              border: "1px solid #ddd",
              padding: "1% 2%",
              margin: "1% 2%",
              background: "#fff",
              height: "40px",
              cursor: "pointer"
            }}
            type="button"
            value="Back To Dashboard"
            onClick={e => {
              history.push("/dashboard");
            }}
          />

          {c_respCode != "00" && (
            <input
              style={{
                backgroundColor: "#d5d5d5",
                color: "#000",
                border: "1px solid #c5c5c5",
                float: "right",
                outline: "none",
                padding: "1% 2%",
                margin: "1% 2%",
                height: "40px",
                cursor: "pointer"
              }}
              type="button"
              value="Retry Payment"
              onClick={e => {
                history.go(-3);
              }}
            />
          )}
        </div>
      </table>
    </div>
  );
}
