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

import { getDialogChoices, getPromptResolve } from './selectors';

export const showPrompter = Id => ({
  type: SHOW_PROMPTER,
  payload: {
    Id: Id || `prompt${+new Date()}`,
  },
});

export const hidePrompter = () => ({
  type: HIDE_PROMPTER,
});

export const setPromptTitle = title => ({
  type: SET_PROMPT_TITLE,
  payload: { title },
});

export const setPromptPromise = promise => ({
  type: SET_PROMPT_PROMISE,
  payload: { promise },
});

export const setPromptDesc = desc => ({
  type: SET_PROMPT_DESC,
  payload: { desc },
});

export const resetDialog = () => ({
  type: RESET_PROMPT_PROPS,
});

export const setPromptChoices = choices => (dispatch) => {
  const choiceIns = {};
  let hasDefault = false;
  let lastkey = '';
  let item;
  for (let i = 0; i < choices.length; i += 1) {
    item = choices[i];
    if (typeof item === 'string') {
      choiceIns[item] = { label: item };
      lastkey = item;
    } else {
      const term = item.value;
      choiceIns[term] = { label: item.label };
      if (item.action) {
        choiceIns[term].action = item.action;
      }
      if (item.default) {
        choiceIns[term].default = true;
        hasDefault = true;
      }
      lastkey = term;
    }
  }
  if (!hasDefault) choiceIns[lastkey].default = true;
  dispatch({
    type: SET_PROMPT_CHOICES,
    payload: { choices: choiceIns },
  });
};

export const setPromptAnswer = value => ({
  type: SET_PROMPT_ANSWER,
  payload: { value },
});

export const openAskDialog = ({
  msg,
  title,
  Id,
  choices,
}) => (dispatch) => {
  if (msg) dispatch(setPromptDesc(msg));

  if (title) dispatch(setPromptTitle(title));

  if (choices && Array.isArray(choices)) {
    dispatch(setPromptChoices(choices));
  }
  dispatch(showPrompter(Id));
  return new Promise(resolve => dispatch(setPromptPromise(resolve)));
};

export const confirmDialog = answer => (dispatch, getState) => {
  const state = getState();
  const choices = getDialogChoices(state);
  if (answer && answer in choices) {
    dispatch(setPromptAnswer(answer));
    const resolve = getPromptResolve(state);
    if (resolve) resolve(answer);
  }
  dispatch(hidePrompter());
};
