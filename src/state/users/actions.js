import {
  SET_USERS,
  SET_USER_COUNT,
  PUSH_NEW_USER,
  SET_SELECTED_USER,
  PUT_USER,
  DELETE_USER,
  SET_USER_LIST_LOADED,
  SET_USER_LIST_SORT,
} from 'state/users/types';
import { getUsers, postUser, getUser, putUser, deleteUser } from 'api/users';
import { toggleLoading } from 'state/loading/actions';
import {
  getUserListLoaded,
  getUserCount,
  getUserById,
  getLastUserId,
} from 'state/users/selectors';

export const setUsersList = users => ({
  type: SET_USERS,
  payload: {
    users,
  },
});

export const setUserCount = count => ({
  type: SET_USER_COUNT,
  payload: count,
});

export const pushNewUser = user => ({
  type: PUSH_NEW_USER,
  payload: user,
});

export const setSelectedUser = user => ({
  type: SET_SELECTED_USER,
  payload: user,
});

export const setPutUser = user => ({
  type: PUT_USER,
  payload: user,
});

export const setDeleteUser = user => ({
  type: DELETE_USER,
  payload: user,
});

export const setUserListSort = (column, direction = 'asc') => ({
  type: SET_USER_LIST_SORT,
  payload: { column, direction },
});

export const markUserListLoaded = () => ({
  type: SET_USER_LIST_LOADED,
  payload: true,
});

export const fetchUsers = () => (dispatch, getState) => (
  new Promise((resolve) => {
    const loaded = getUserListLoaded(getState());
    if (!loaded) {
      dispatch(toggleLoading('userlist'));
      getUsers().then((response) => {
        response.json().then((json) => {
          if (response.ok) {
            dispatch(setUsersList(json));
            dispatch(setUserCount(json.length));
            dispatch(markUserListLoaded());
          }
          dispatch(toggleLoading('userlist'));
          resolve();
        });
      }).catch(() => {});
    } else {
      resolve();
    }
  })
);

export const fetchUser = userId => (dispatch, getState) => (
  new Promise((resolve) => {
    const user = getUserById(userId)(getState());
    dispatch(toggleLoading('selecteduser'));
    getUser(user).then((response) => {
      if (response.ok) {
        dispatch(setSelectedUser(response.payload));
      }
      dispatch(toggleLoading('selecteduser'));
      resolve();
    }).catch(() => {});
  })
);

export const sendPostUser = user => (dispatch, getState) => (
  new Promise((resolve) => {
    const state = getState();
    const count = getUserCount(state);
    const newId = getLastUserId(state) + 1;
    postUser({ ...user, id: newId }).then((response) => {
      if (response.ok) {
        dispatch(pushNewUser(response.payload));
        dispatch(setUserCount(count + 1));
      }
      resolve();
    }).catch(() => {});
  })
);

export const sendPutUser = user => dispatch => (
  new Promise((resolve) => {
    putUser(user).then((response) => {
      if (response.ok) {
        dispatch(setPutUser(response.payload));
      }
      resolve();
    }).catch(() => {});
  })
);

export const sendDeleteUser = user => dispatch => (
  new Promise((resolve) => {
    deleteUser(user).then((response) => {
      if (response.ok) {
        dispatch(setDeleteUser(response.payload));
      }
      resolve();
    }).catch(() => {});
  })
);
