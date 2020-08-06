import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%",
    margin: '0 auto',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold
  }
}));



export default function AgreementDoc() {
  const classes = useStyles();
  const [values, loading, error] = useCollectionData(
    firebase.firestore().collection('agreement'),
    {
      snapshotListenOptions: { includeMetadataChanges: false },
    }
  );

  return (

    <div className={classes.root}>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Loading...</span>}

        {values && values[0] && (
          <div
            dangerouslySetInnerHTML={{
              __html: values[0].text
            }}>
          </div>
        )}
    </div>
  );
}
