import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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

export default function FAQExpansionPanel(props) {
  console.log(props);
  const { data } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {data.map( (faq,ind) => (
        <ExpansionPanel key={ind}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              {faq.q}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: faq.a
                }}>
              </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}

    </div>
  );
}
