import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Switch, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SnackbarProvider } from 'notistack';

import { ROUTE_DASHBOARD, ROUTE_USER_ADD, ROUTE_USER_EDIT } from 'routes';

import ToastProviderContainer from 'ui/controls/ToastProviderContainer';
import ConfirmDialogContainer from 'ui/controls/dialog/ConfirmDialogContainer';
import UsersListContainer from 'ui/users/UsersListContainer';
import AddUserContainer from 'ui/users/AddUserContainer';
import EditUserContainer from 'ui/users/EditUserContainer';

const App = ({ onAppMount }) => {
  useEffect(() => {
    onAppMount();
  }, [onAppMount]);
  return (
    <SnackbarProvider maxSnack={3}>
      <Box sx={{ margin: 'auto', maxWidth: 960 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h3" component="h1"><FormattedMessage id="caption.dashboard" /></Typography>
          </Grid>
          <Grid item xs={12}>
            <Switch>
              <Route exact path={ROUTE_DASHBOARD} component={UsersListContainer} />
              <Route exact path={ROUTE_USER_ADD} component={AddUserContainer} />
              <Route path={ROUTE_USER_EDIT} component={EditUserContainer} />
            </Switch>
          </Grid>
        </Grid>
        <ConfirmDialogContainer />
        <ToastProviderContainer />
      </Box>
    </SnackbarProvider>
  );
};

App.propTypes = {
  onAppMount: PropTypes.func.isRequired,
};

export default App;
