import { combineReducers } from 'redux';
import {
  SET_USERS,
  PUSH_NEW_USER,
  SET_USER_COUNT,
  SET_USER_LIST_LOADED,
  SET_SELECTED_USER,
} from 'state/users/types';

const toMap = array => array.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});

export const map = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_USERS: {
      return toMap(action.payload.users);
    }
    case PUSH_NEW_USER:
    case SET_SELECTED_USER: {
      return { ...state, [action.payload.id]: action.payload };
    }
    default: return state;
  }
};

export const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_USERS: {
      return [...action.payload.users];
    }
    case PUSH_NEW_USER: {
      return [...state, action.payload];
    }
    default: return state;
  }
};

export const loaded = (state = false, action = {}) => {
  switch(action.type) {
    case SET_USER_LIST_LOADED: {
      return action.payload;
    }
    default: return state;
  }
};

export const total = (state = 0, action = {}) => {
  switch (action.type) {
    case SET_USER_COUNT: {
      return action.payload;
    }
    default: return state;
  }
};

export default combineReducers({ map, list, total, loaded });
