import React from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RenderTextField from 'ui/controls/forms/RenderTextField';

const EDIT_MODE = 'userform/edit';
const NEW_MODE = 'userform/new';

const UserFormBody = ({ intl }) => {

  const themeSpacing = theme => theme.spacing(2);

  return (
    <Paper sx={{ p: themeSpacing }}>
      <Box sx={{ pb: themeSpacing }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }} component="h2"><FormattedMessage id="caption.user.form" /></Typography>
      </Box>
      <Form>
        <FormControl fullWidth>
          <Field
            component={RenderTextField}
            name="name"
            label={intl.formatMessage({ id: 'label.user.name' })}
          />
          <Field
            component={RenderTextField}
            name="email"
            label={intl.formatMessage({ id: 'label.user.email' })}
          />
        </FormControl>
        <Box sx={{ pb: theme => themeSpacing, textAlign: 'right' }}>
          <Button variant="outlined" sx={{ mr: themeSpacing }}>Cancel</Button>
          <Button type="submit" variant="contained" color="success">Submit</Button>
        </Box>
      </Form>
    </Paper>

  )
};

UserFormBody.propTypes = {
  intl: intlShape.isRequired,
};

const UserForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ initialValues }) => initialValues,
  mapPropsToErrors: ({ mode }) => {
    switch (mode) {
      default:
      case NEW_MODE:
        return { name: '', email: '' };
      case EDIT_MODE:
        return {};
    }
  },
  validationSchema: ({ intl }) => (
    Yup.object().shape({
      name: Yup.string()
        .required(intl.formatMessage({ id: 'label.form.fieldRequired' })),
      code: Yup.string()
        .required(intl.formatMessage({ id: 'label.form.fieldRequired' })),
    })
  ),
  handleSubmit: (values, { setSubmitting, props: { onSubmit } }) => {
    onSubmit(values).then(() => setSubmitting(false));
  },
  displayName: 'groupForm',
})(UserFormBody);

export default injectIntl(UserForm);
