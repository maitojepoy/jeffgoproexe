import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { get } from 'lodash';

import { addToast } from 'state/toasts/actions';
import { TOAST_SUCCESS } from 'state/toasts/const';
import { sendPutUser, fetchUser } from 'state/users/actions';
import { getSelectedUser } from 'state/users/selectors';
import { getLoading } from 'state/loading/selectors';
import { FORM_EDIT_MODE, DEFAULT_FORM_VALUES } from 'state/users/const';
import { ROUTE_DASHBOARD } from 'routes';
import UserForm from 'ui/users/UserForm';

const mapStateToProps = (state, { match: { params } }) => ({
  mode: FORM_EDIT_MODE,
  userId: Number(params.id),
  loading: get(getLoading(state), 'selecteduser', true),
  initialValues: getSelectedUser(state) || DEFAULT_FORM_VALUES,
});

const mapDispatchToProps = (dispatch, { history, intl }) => ({
  onPageMount: (userId) => dispatch(fetchUser(userId)),
  onSubmit: values => dispatch(sendPutUser(values)).then(() => {
    dispatch(addToast(intl.formatMessage({ id: 'toast.form.updatesuccess' }, { name: values.name }), TOAST_SUCCESS));
    history.push(ROUTE_DASHBOARD);
  }),
  onDiscard: () => history.push(ROUTE_DASHBOARD),
});

const EditUserContainer = connect(mapStateToProps, mapDispatchToProps)(UserForm);

export default withRouter(injectIntl(EditUserContainer));
