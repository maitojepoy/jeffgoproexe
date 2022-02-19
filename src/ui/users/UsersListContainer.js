import { connect } from 'react-redux';
import { get } from 'lodash';
import { getLoading } from 'state/loading/selectors';
import { fetchUsers } from 'state/users/actions';
import { getUserListLoaded, getUsersListCondensed } from 'state/users/selectors';
import UsersList from 'ui/users/UsersList';

const mapStateToProps = state => ({
  loaded: getUserListLoaded(state),
  loading: get(getLoading(state), 'userlist', false),
  users: getUsersListCondensed(state),
});

const mapDispatchToProps = dispatch => ({
  onPageMount: () => dispatch(fetchUsers()),
});

const UsersListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersList);

export default UsersListContainer;
