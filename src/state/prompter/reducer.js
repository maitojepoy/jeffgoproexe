import {
  SHOW_PROMPTER,
  HIDE_PROMPTER,
  SET_PROMPT_TITLE,
  SET_PROMPT_DESC,
  SET_PROMPT_CHOICES,
  SET_PROMPT_ANSWER,
  RESET_PROMPT_PROPS,
  SET_PROMPT_PROMISE,
} from './types';

const initialState = {
  Id: -1,
  show: false,
  title: 'Confirmation',
  description: 'Are you sure?',
  promise: null,
  choices: {
    no: {
      label: 'No',
      default: true,
    },
    yes: {
      label: 'Yes',
    },
  },
  answer: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_PROMPTER: {
      return { ...state, show: true, Id: action.payload.Id };
    }
    case HIDE_PROMPTER: {
      return { ...state, show: false, Id: -1 };
    }
    case SET_PROMPT_TITLE: {
      return { ...state, title: action.payload.title };
    }
    case SET_PROMPT_DESC: {
      return { ...state, description: action.payload.desc };
    }
    case SET_PROMPT_CHOICES: {
      return { ...state, choices: action.payload.choices };
    }
    case SET_PROMPT_ANSWER: {
      return { ...state, answer: action.payload.value };
    }
    case RESET_PROMPT_PROPS: {
      return { ...initialState };
    }
    case SET_PROMPT_PROMISE: {
      return { ...state, promise: action.payload.promise };
    }
    default: return state;
  }
};

export default reducer;
