import { connect } from 'react-redux';
import { get } from 'lodash';
import { withRouter } from 'react-router-dom';
import { getLoading } from 'state/loading/selectors';
import { getUserListLoaded, getUsersListCondensed } from 'state/users/selectors';
import { routeConverter } from 'helpers/url';
import { ROUTE_USER_EDIT } from 'routes';

import UsersList from 'ui/users/UsersList';

const mapStateToProps = state => ({
  loaded: getUserListLoaded(state),
  loading: get(getLoading(state), 'userlist', false),
  users: getUsersListCondensed(state),
});

const mapDispatchToProps = (dispatch, { history }) => ({
  onClickEditUser: id => history.push(routeConverter(ROUTE_USER_EDIT, { id })),
});

const UsersListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersList);

export default withRouter(UsersListContainer);
