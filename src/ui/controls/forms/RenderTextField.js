import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

import { getTouchErrorByField } from 'helpers/form';

export const RenderTextInputBody = ({
  field,
  append,
  label,
  alignClass,
  placeholder,
  form,
  help,
  disabled,
  type,
  hasLabel,
  xsClass,
  forwardedRef,
  endButtons,
  ...others
}) => {
  const { restProps } = others;
  const { touched, error } = getTouchErrorByField(field.name, form);
  return (
    <TextField
      {...field}
      type={type}
      error={touched && error}
      id={field.name}
      label={label}
      helperText={append}
      disabled={disabled}
      sx={{ mb: theme => theme.spacing(3) }}
      inputProps={{ ...restProps }}
    />
  );
};

RenderTextInputBody.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
  }),
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  label: PropTypes.node,
  placeholder: PropTypes.string,
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
  }),
  help: PropTypes.node,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  labelSize: PropTypes.number,
  inputSize: PropTypes.number,
  append: PropTypes.string,
  mainGroup: PropTypes.string,
  langCode: PropTypes.string,
  alignClass: PropTypes.string,
  xsClass: PropTypes.string,
  hasLabel: PropTypes.bool,
  endButtons: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

RenderTextInputBody.defaultProps = {
  field: {},
  label: '',
  placeholder: '',
  help: null,
  disabled: false,
  type: 'text',
  labelSize: 2,
  inputSize: null,
  append: '',
  mainGroup: '',
  langCode: '',
  alignClass: 'text-right',
  hasLabel: true,
  xsClass: 'mobile-left',
  forwardedRef: null,
  endButtons: null,
  form: {},
};

export default React.forwardRef((props, ref) => (
  <RenderTextInputBody {...props} forwardedRef={ref} />
));
