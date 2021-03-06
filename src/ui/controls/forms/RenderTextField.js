import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

import { getTouchErrorByField } from 'helpers/form';

export const RenderTextField = ({
  field,
  append,
  label,
  form,
  disabled,
  type,
}) => {
  const { touched, error } = getTouchErrorByField(field.name, form);
  return (
    <TextField
      {...field}
      fullWidth
      type={type}
      error={touched && error}
      id={field.name}
      label={label}
      helperText={error || append}
      disabled={disabled}
      variant="outlined"
      InputLabelProps={{ shrink: true }}
      sx={{ mb: theme => theme.spacing(3) }}
    />
  );
};

RenderTextField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
  }),
  label: PropTypes.node,
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
  }),
  help: PropTypes.node,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  append: PropTypes.string,
  editMode: PropTypes.bool,
};

RenderTextField.defaultProps = {
  field: {},
  label: '',
  disabled: false,
  type: 'text',
  append: '',
  form: {},
  editMode: false,
};

export default RenderTextField;
