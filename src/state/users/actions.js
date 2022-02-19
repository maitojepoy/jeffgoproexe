import {
  SET_USERS,
  SET_USER_COUNT,
  PUSH_NEW_USER,
  SET_SELECTED_USER,
  SET_USER_LIST_LOADED,
} from 'state/users/types';
import { getUsers, postUser, putUser } from 'api/users';
import { toggleLoading } from 'state/loading/actions';
import { getUserListLoaded, getUserCount, getLastUserId } from 'state/users/selectors';

export const setUsersList = users => ({
  type: SET_USERS,
  payload: {
    users,
  },
});

export const setUserCount = count => ({
  type: SET_USER_COUNT,
  payload: { count },
});

export const pushNewUser = user => ({
  type: PUSH_NEW_USER,
  payload: user,
});

export const setSelectedUser = user => ({
  type: SET_SELECTED_USER,
  payload: user,
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
          } else {
            // dispatch(addErrors(json.errors.map(err => err.message)));
            // json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
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

export const sendPostUser = user => (dispatch, getState) => (
  new Promise((resolve) => {
    const state = getState();
    const count = getUserCount(state);
    const newId = getLastUserId(state) + 1;
    postUser({ ...user, id: newId }).then((response) => {
      if (response.ok) {
        dispatch(pushNewUser(response.payload));
        dispatch(setUserCount(count + 1));
      } else {
        // dispatch(addErrors(json.errors.map(e => e.message)));
        // json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
      }
      resolve();
    }).catch(() => {});
  })
);
  