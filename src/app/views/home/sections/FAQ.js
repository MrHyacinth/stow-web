import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FAQExpansionPanel from '../components/FAQExpansionPanel'
import faqs from '../components/faqs';

import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    margin: '0 auto',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold
  }
}));



export default function FAQ() {
  const classes = useStyles();
  const [values, loading, error] = useCollectionData(
    firebase.firestore().collection('faq'),
    {
      snapshotListenOptions: { includeMetadataChanges: false },
    }
  );

  return (

    <div className={classes.root}>
      <div id="faq" className="sectionWrapper">
        <div className="wpb_text_column wpb_content_element ">
          <div className="wpb_wrapper text-center">
            <h2>FAQS</h2>
          </div> 
        </div> 
        
        <div className="separator  small center separator separatorAbout "></div>

        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Loading...</span>}

        {values && (
          <FAQExpansionPanel
            data={values}
          />
        )}
       
      </div>
    </div>
  );
}
