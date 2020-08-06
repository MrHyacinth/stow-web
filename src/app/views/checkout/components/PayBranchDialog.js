import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { priceFormat } from 'app/functions/functions';
import { withRouter } from "react-router-dom";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(3)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

class PayBranchDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    console.log(this.props);
    const { history, uid, unm, pid, pnm, tid, payToday, } = this.props;
    const oid = tid && tid.slice(0,6).toUpperCase();
    return (
      <div>
        <Button
          variant="contained"
          color="secondary"
          style={{
            margin: '1em 0 0 0',
            width: '100%',
          }}
          onClick={this.handleClickOpen}
        >
          PAY IN BRANCH
        </Button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Order# {oid}
          </DialogTitle>

          <DialogContent dividers>
            <Typography gutterBottom>
              Amount to Pay: {`₦ ${priceFormat(payToday)}`}
            </Typography>
            <Typography gutterBottom>
              Bank Account Details:
              <br />
              Branch Name
              <br />
              Account Name
              <br />
              Transaction reference: <b>STOW {oid}</b>
            </Typography>
          </DialogContent>

          <DialogContent dividers>
            <Typography gutterBottom>
              <b>
                Payments made in branch may take up to 2 business days to reflect in your account.
                Details will also be sent to your email address.
              </b>
            </Typography>

          </DialogContent>

          <DialogActions>
            <Button 
              variant="contained"
              color="secondary"
              onClick={ () => history.replace('/user/properties')} 
              color="primary"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withRouter(PayBranchDialog);
