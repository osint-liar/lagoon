import React, {useState, Fragment} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from "@mui/material/IconButton";
import {getApplicationToken, setApplicationToken} from "../../utils/applicationToken";
import {TextField} from "@mui/material";
import TokenIcon from '@mui/icons-material/Token';


export default function ApplicationKeyTokenDialog(props) {

  const [open, setOpen] = useState(false)
  const [appToken, setAppToken] = useState(getApplicationToken() ?? '')

  const updateToken = () => {
    setApplicationToken(appToken)
  }

  return (
    <Fragment>
      <IconButton
        onClick={() => setOpen(true)}
        size="large">
        <TokenIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => { setOpen(false)} }
        aria-labelledby="form-dialog-title"
        maxWidth={'md'}
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">Application Key Token</DialogTitle>
        <DialogContent>
          <DialogContentText>Set the OSINT LIAR application key token. Learn More <a href={'https://osintliar.com/application-key-token/'} target={'_blank'} rel="noreferrer">here</a></DialogContentText>
          <form noValidate autoComplete="off">
            <div>
              <TextField
                fullWidth={true}
                name="applicationToken"
                id="applicationToken"
                label="Required"
                defaultValue={appToken}
                helperText="The application token from OSINT LIAR"
                onChange={(evt) => { setAppToken(evt.target.value) }}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="cancel" variant={'contained'}>
            Cancel
          </Button>
          <Button onClick={() => { updateToken(); setOpen(false) }} color="primary" variant={'contained'}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}