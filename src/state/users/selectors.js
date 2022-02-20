import { createSelector } from 'reselect';
import { max, get, orderBy } from 'lodash';

export const getUsers = state => state.users;
export const getUsersList = state => state.users.list;
export const getUsersMap = state => state.users.map;
export const getUserListSort = state => state.users.listSort;
export const getSelectedUser = state => state.users.selected;
export const getUserListLoaded = state => state.users.loaded;
export const getUserCount = state => state.users.total;

export const getUserById = id => createSelector(
  getUsersMap,
  users => users[id],
);

export const getUsersListCondensed = createSelector(
  [getUsersList, getUserListSort],
  (users, { column, direction }) => {
    const condensed = users.map(({ id, name, username, email, address }) => (
      { id, name, username, email, city: get(address, 'city', '') }
    ));
    return orderBy(condensed, [column], [direction]);
  },
);

export const getUserIds = createSelector(
  getUsersList,
  users => users.map(({ id }) => id),
);

export const getLastUserId = createSelector(
  getUserIds,
  userIds => max(userIds),
);
