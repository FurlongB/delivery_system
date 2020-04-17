import React, {useState, useContext} from 'react';
import { Redirect } from 'react-router-dom';

import ValidContext from '../../valid-context';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AlertDialog = (props) => {
  const [open, setOpen] = useState(true);
  const validStatus = useContext( ValidContext);

  const handleClose = () => {
    validStatus.validStat({playerAddedStatus: false});
    setOpen(false);
  }

  return (
    <div>
       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {!open && props.redirect ? <Redirect to={props.redirect} /> : null}
    </div>
  );
}

export default AlertDialog;