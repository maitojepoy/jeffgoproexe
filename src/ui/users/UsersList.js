import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import { ROUTE_USER_ADD } from 'routes';

const UsersList = ({ users, loaded, loading, onClickEditUser }) => {
  if (!loaded || loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: theme => theme.spacing(2) }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }} component="h2"><FormattedMessage id="caption.user.list" /></Typography>
        <Button variant="contained" component={Link} to={ROUTE_USER_ADD}><FormattedMessage id="label.button.add" /></Button>
      </Toolbar>
      <TableContainer>
        <Table aria-label="Users List Table">
          <TableHead>
            <TableRow>
              <TableCell align="center"><FormattedMessage id="label.user.id" /></TableCell>
              <TableCell align="center"><FormattedMessage id="label.user.name" /></TableCell>
              <TableCell align="center"><FormattedMessage id="label.user.username" /></TableCell>
              <TableCell align="center"><FormattedMessage id="label.user.email" /></TableCell>
              <TableCell align="center"><FormattedMessage id="label.user.city" /></TableCell>
              <TableCell align="center"><FormattedMessage id="label.button.edit" /></TableCell>
              <TableCell align="center"><FormattedMessage id="label.button.delete" /></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="right">
                  {user.id}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.city}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="warning" onClick={() => onClickEditUser(user.id)}>
                    <FormattedMessage id="label.button.edit" />
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="error"><FormattedMessage id="label.button.delete" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
  })),
  loaded: PropTypes.bool,
  loading: PropTypes.bool,
  onClickEditUser: PropTypes.func.isRequired,
};

UsersList.defaultProps = {
  users: [],
  loaded: false,
  loading: true,
};

export default UsersList;
