import { combineReducers } from 'redux';

import users from 'state/users/reducer';
import loading from 'state/loading/reducer';
import locale from 'state/locale/reducer';

// app root reducer
const reducer = combineReducers({ users, loading, locale });

export default reducer;
