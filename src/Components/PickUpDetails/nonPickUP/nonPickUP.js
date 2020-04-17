import React, {useState} from 'react';

import RadioButtons from './RadioButtons/RadioButtons'

import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

const nonPickUP = (props) =>{
  const [open, setOpen] = useState(true);  

  const handleClose = (value) => {
    console.log('value', value)
    setOpen(false);
    props.clicked(value)
  };

    const { fullScreen } = props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Reason for Non-PickUp"}</DialogTitle>
          <DialogContent>
               <RadioButtons clicked={handleClose.bind(this)}/>
             <DialogActions>
          </DialogActions>
          </DialogContent>
          
        </Dialog>
      </div>
    );
  }

nonPickUP.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(nonPickUP);



