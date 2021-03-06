import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { visuallyHidden } from '@mui/utils';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import { ROUTE_USER_ADD } from 'routes';

const UsersList = ({ users, loaded, loading, sortSettings, onSetUserListSort, onClickEditUser, onConfirmDelete }) => {
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
              {['id', 'name', 'username', 'email', 'city'].map(column => (
                <TableCell
                  key={column}
                  align="center"
                  sortDirection={sortSettings.column === column ? sortSettings.direction : false}
                >
                  <TableSortLabel
                    active={sortSettings.column === column}
                    direction={sortSettings.column === column ? sortSettings.direction : 'asc'}
                    onClick={() => {
                      const { column: currentColumn, direction: currentDir } = sortSettings;
                      const oppositeCurrDir = currentDir === 'asc' ? 'desc' : 'asc';
                      onSetUserListSort(column, currentColumn === column ? oppositeCurrDir : 'asc');
                    }}
                  >
                    <FormattedMessage id={`label.user.${column}`} />
                    {sortSettings.column === column ? (
                      <Box component="span" sx={visuallyHidden}>
                        {sortSettings.direction === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
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
                  <Button variant="contained" color="error" onClick={() => onConfirmDelete(user)}>
                    <FormattedMessage id="label.button.delete" />
                  </Button>
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
  sortSettings: PropTypes.shape({
    column: PropTypes.string,
    direction: PropTypes.string,
  }).isRequired,
  loaded: PropTypes.bool,
  loading: PropTypes.bool,
  onSetUserListSort: PropTypes.func.isRequired,
  onClickEditUser: PropTypes.func.isRequired,
  onConfirmDelete: PropTypes.func.isRequired,
};

UsersList.defaultProps = {
  users: [],
  loaded: false,
  loading: true,
};

export default UsersList;
