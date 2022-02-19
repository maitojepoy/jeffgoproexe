import { createSelector } from 'reselect';
import { max } from 'lodash';

export const getUsers = state => state.users;
export const getUsersList = state => state.users.list;
export const getUsersMap = state => state.users.map;
export const getUserListLoaded = state => state.users.loaded;
export const getUserCount = state => state.users.total;

export const getUsersListCondensed = createSelector(
  getUsersList,
  users => users.map(({ id, name, username, email, address: { city } }) => (
    { id, name, username, email, city }
  )),
);

export const getUserIds = createSelector(
  getUsersList,
  users => users.map(({ id }) => id),
);

export const getLastUserId = createSelector(
  getUserIds,
  userIds => max(userIds),
);
