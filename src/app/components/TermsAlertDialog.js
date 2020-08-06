import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function TermsAlertDialog(props) {
  const { onAccept, onReject } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReject = () => {
    onReject();
    handleClose();
  };

  const handleAccept = () => {
    onAccept();
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Accept Terms
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Accept Terms of Purchase?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Clicking agree means you are subject to the terms of the agreement.
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{
            padding: '0em 1.6em 1em 1.6em',
            justifyContent: 'space-between',
          }} 
        >
          <Button
            onClick={handleReject} 
            variant="outlined"
            color="secondary"
          >
            Reject
          </Button>
          <Button
            onClick={handleAccept} 
            variant="contained"
            color="primary" 
            autoFocus
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
