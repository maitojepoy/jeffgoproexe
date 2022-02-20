import { connect } from 'react-redux';
import { removeToast } from 'state/toasts/actions';
import { getToasts } from 'state/toasts/selectors';
// import { withSnackbar } from 'notistack';
import ToastProvider from 'ui/controls/ToastProvider';

const mapStateToProps = state => ({
  notifications: getToasts(state),
});

export const mapDispatchToProps = dispatch => ({
  removeSnackbar: key => dispatch(removeToast(key)),
});

const ToastProviderContainer = connect(mapStateToProps, mapDispatchToProps)(ToastProvider);

export default ToastProviderContainer;
