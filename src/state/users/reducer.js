import { combineReducers } from 'redux';
import {
  SET_USERS,
  PUSH_NEW_USER,
  SET_USER_COUNT,
  SET_USER_LIST_LOADED,
  SET_SELECTED_USER,
  SET_USER_LIST_SORT,
  PUT_USER,
  DELETE_USER,
} from 'state/users/types';
import { toMap, removePropFromObject } from 'helpers/collection';

export const map = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_USERS: {
      return toMap(action.payload.users);
    }
    case PUSH_NEW_USER:
    case PUT_USER: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case DELETE_USER: {
      return removePropFromObject(state, action.payload.id);
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
    case PUT_USER: {
      return state.map((user) => {
        if (user.id === action.payload.id) {
          return { ...user, ...action.payload };
        }
        return user;
      });
    }
    case DELETE_USER: {
      return state.filter(user => user.id !== action.payload.id);
    }
    default: return state;
  }
};

export const listSort = (state = { column: 'id', direction: 'asc' }, action = {}) => {
  switch(action.type) {
    case SET_USER_LIST_SORT: {
      return action.payload;
    }
    default: return state;
  }
};

export const selected = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_USER: {
      return action.payload;
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

export default combineReducers({ map, list, listSort, selected, total, loaded });
