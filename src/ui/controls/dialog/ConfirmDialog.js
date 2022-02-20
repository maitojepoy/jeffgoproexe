import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

class ConfirmDialog extends Component {
  componentDidMount() {
    this.handleClose = this.handleClose.bind(this);
  }
  handleClose(answer) {
    this.props.confirmAnswer(answer);
  }
  render() {
    const {
      open,
      title,
      message,
      choicevals,
      choices,
    } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          aria-labelledby="loading-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
          </DialogContent>
          <DialogActions>
            {choicevals.map(vals => (
              <Button
                key={vals}
                onClick={() => this.handleClose(vals)}
                color="primary"
                autoFocus={choices[vals].default || false}
              >
                {choices[vals].label}
              </Button>
            ))}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ConfirmDialog.propTypes = {
  choices: PropTypes.shape({}).isRequired,
  choicevals: PropTypes.arrayOf(PropTypes.string).isRequired,
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  confirmAnswer: PropTypes.func.isRequired,
};

export default ConfirmDialog;
