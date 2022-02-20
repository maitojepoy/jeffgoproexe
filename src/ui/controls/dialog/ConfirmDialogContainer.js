import { connect } from 'react-redux';

import {
  isItShowingDialog,
  getDialogTitle,
  getDialogMessage,
  getDialogChoiceValues,
  getDialogChoices,
} from 'state/prompter/selectors';

import { confirmDialog } from 'state/prompter/actions';

import ConfirmDialog from 'ui/controls/dialog/ConfirmDialog';

const mapStateToProps = state => ({
  open: isItShowingDialog(state),
  message: getDialogMessage(state),
  choicevals: getDialogChoiceValues(state),
  choices: getDialogChoices(state),
  title: getDialogTitle(state),
});

const mapDispatchToProps = dispatch => ({
  confirmAnswer: value => dispatch(confirmDialog(value)),
});

const ConfirmDialogContainer = connect(mapStateToProps, mapDispatchToProps)(ConfirmDialog);

export default ConfirmDialogContainer;
