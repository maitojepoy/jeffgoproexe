import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';

import { addToast } from 'state/toasts/actions';
import { TOAST_SUCCESS } from 'state/toasts/const';
import { DEFAULT_FORM_VALUES } from 'state/users/const';
import { sendPostUser } from 'state/users/actions';
import { ROUTE_DASHBOARD } from 'routes';
import UserForm from 'ui/users/UserForm';

const mapStateToProps = () => ({
  loading: false,
  initialValues: DEFAULT_FORM_VALUES,
});

const mapDispatchToProps = (dispatch, { history, intl }) => ({
  onSubmit: values => dispatch(sendPostUser(values)).then(() => {
    dispatch(addToast(intl.formatMessage({ id: 'toast.form.addsuccess' }, { name: values.name }), TOAST_SUCCESS));
    history.push(ROUTE_DASHBOARD);
  }),
  onDiscard: () => history.push(ROUTE_DASHBOARD),
});

const AddUserContainer = connect(mapStateToProps, mapDispatchToProps)(UserForm);

export default withRouter(injectIntl(AddUserContainer));
