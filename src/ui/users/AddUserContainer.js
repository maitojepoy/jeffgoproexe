import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DEFAULT_FORM_VALUES } from 'state/users/const';
import { sendPostUser } from 'state/users/actions';
import { ROUTE_DASHBOARD } from 'routes';
import UserForm from 'ui/users/UserForm';

const mapStateToProps = () => ({
  loading: false,
  initialValues: DEFAULT_FORM_VALUES,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  onSubmit: values => dispatch(sendPostUser(values)).then(() => history.push(ROUTE_DASHBOARD)),
  onDiscard: () => history.push(ROUTE_DASHBOARD),
});

const AddUserContainer = connect(mapStateToProps, mapDispatchToProps)(UserForm);

export default withRouter(AddUserContainer);
