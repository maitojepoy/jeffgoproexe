import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RenderTextField from 'ui/controls/forms/RenderTextField';
import { FORM_NEW_MODE, FORM_EDIT_MODE } from 'state/users/const';

const UserFormBody = ({
  intl,
  onDiscard,
  isValid,
  isSubmitting,
}) => {

  const themeSpacing = theme => theme.spacing(2);

  return (
    <Paper sx={{ p: themeSpacing }}>
      <Box sx={{ pb: themeSpacing }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }} component="h2"><FormattedMessage id="caption.user.form" /></Typography>
      </Box>
      <Form>
        <Field
          component={RenderTextField}
          name="name"
          label={intl.formatMessage({ id: 'label.user.name' })}
        />
        <Field
          component={RenderTextField}
          name="email"
          type="email"
          label={intl.formatMessage({ id: 'label.user.email' })}
        />
        <Box sx={{ pb: themeSpacing, textAlign: 'right' }}>
          <Button variant="outlined" sx={{ mr: themeSpacing }} onClick={onDiscard}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={!isValid || isSubmitting}
          >Submit</Button>
        </Box>
      </Form>
    </Paper>

  )
};

UserFormBody.propTypes = {
  intl: intlShape.isRequired,
  onDiscard: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool,
};

UserFormBody.defaultProps = {
  isValid: false,
  isSubmitting: false,
};

const UserForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ initialValues }) => initialValues,
  mapPropsToErrors: ({ mode }) => {
    switch (mode) {
      default:
      case FORM_NEW_MODE:
        return { name: '', email: '' };
      case FORM_EDIT_MODE:
        return {};
    }
  },
  validationSchema: ({ intl }) => (
    Yup.object().shape({
      name: Yup.string()
        .required(intl.formatMessage({ id: 'label.form.fieldRequired' })),
      email: Yup.string()
        .required(intl.formatMessage({ id: 'label.form.fieldRequired' })),
    })
  ),
  handleSubmit: (values, { setSubmitting, props: { onSubmit } }) => {
    onSubmit(values).then(() => setSubmitting(false));
  },
  displayName: 'groupForm',
})(UserFormBody);

export default injectIntl(UserForm);
