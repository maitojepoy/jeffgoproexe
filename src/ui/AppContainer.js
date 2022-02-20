import { connect } from 'react-redux';
import { fetchUsers } from 'state/users/actions';

import App from 'ui/App';

const mapDispatchToProps = (dispatch) => ({
  onAppMount: () => dispatch(fetchUsers()),
});

const AppContainer = connect(null, mapDispatchToProps)(App);

export default AppContainer;
