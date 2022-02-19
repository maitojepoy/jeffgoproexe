import { SET_LANGUAGE } from 'state/locale/types';

export const setLanguage = locale => ({
  type: SET_LANGUAGE,
  payload: { locale },
});
