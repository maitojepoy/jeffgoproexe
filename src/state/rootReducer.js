import { combineReducers } from 'redux';

import users from 'state/users/reducer';
import loading from 'state/loading/reducer';
import locale from 'state/locale/reducer';
import prompter from 'state/prompter/reducer';
import toasts from 'state/toasts/reducer';

// app root reducer
const reducer = combineReducers({ users, loading, locale, prompter, toasts });

export default reducer;
