import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Switch, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ROUTE_DASHBOARD, ROUTE_USER_ADD, ROUTE_USER_EDIT } from 'routes';

import UsersListContainer from 'ui/users/UsersListContainer';
import AddUserContainer from 'ui/users/AddUserContainer';

const App = () => (
  <Box sx={{ margin: 'auto', maxWidth: 960 }}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3" component="h1"><FormattedMessage id="caption.dashboard" /></Typography>
      </Grid>
      <Grid item xs={12}>
        <Switch>
          <Route exact path={ROUTE_DASHBOARD} component={UsersListContainer} />
          <Route exact path={ROUTE_USER_ADD} component={AddUserContainer} />
        </Switch>
      </Grid>
    </Grid>
  </Box>
);

export default App;
