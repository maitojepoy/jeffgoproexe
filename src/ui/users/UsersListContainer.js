import { connect } from 'react-redux';
import { get } from 'lodash';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';

import { getLoading } from 'state/loading/selectors';
import { sendDeleteUser, setUserListSort } from 'state/users/actions';
import { getUserListLoaded, getUsersListCondensed, getUserListSort } from 'state/users/selectors';
import { openAskDialog } from 'state/prompter/actions';
import { addToast } from 'state/toasts/actions';
import { TOAST_INFO } from 'state/toasts/const';
import { routeConverter } from 'helpers/url';
import { ROUTE_USER_EDIT } from 'routes';

import UsersList from 'ui/users/UsersList';

const mapStateToProps = state => ({
  loaded: getUserListLoaded(state),
  sortSettings: getUserListSort(state),
  loading: get(getLoading(state), 'userlist', false),
  users: getUsersListCondensed(state),
});

const mapDispatchToProps = (dispatch, { history, intl }) => ({
  onClickEditUser: id => history.push(routeConverter(ROUTE_USER_EDIT, { id })),
  onConfirmDelete: user => (
    dispatch(openAskDialog({
      title: intl.formatMessage({ id: 'caption.dialog.deleteuser' }),
      msg: intl.formatMessage({ id: 'label.dialog.askdelete' }, { name: user.name }),
    })).then((answer) => {
      if (answer === 'yes') {
        dispatch(sendDeleteUser(user)).then(() => (
          dispatch(addToast(intl.formatMessage({ id: 'toast.form.removesuccess' }, { name: user.name }), TOAST_INFO))
        ));
      }
    })
  ),
  onSetUserListSort: (column, direction) => dispatch(setUserListSort(column, direction)),
});

const UsersListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersList);

export default withRouter(injectIntl(UsersListContainer));
