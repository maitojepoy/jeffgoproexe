import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';

let displayed = [];

const ToastProvider = ({
  notifications,
  history,  
}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    const storeDisplayed = (id) => {
      displayed = [...displayed, id];
    };
    const removeDisplayed = (e, id) => {
      closeSnackbar(id);
      displayed = [...displayed.filter(key => id !== key)];
    };
    Object.entries(notifications).forEach(([key, { action, message, type: variant }]) => {
      if (displayed.includes(key)) return;

      const options = {
        variant,
        onExited: removeDisplayed,
      };
      if (action) {
        options.action = () => (
          <Button onClick={() => (
            history.push(action.link)
          )}>{action.label}</Button>
        )
      }
      enqueueSnackbar(message, options);

      storeDisplayed(key);
    });
  }, [notifications, closeSnackbar, enqueueSnackbar, history]);
  return null;
};

ToastProvider.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  notifications: PropTypes.shape({}).isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(ToastProvider);
