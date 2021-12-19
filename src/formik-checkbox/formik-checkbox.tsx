import React from 'react';
import { useFormikContext } from 'formik';

import { FormikCheckboxProps } from './formik-checkbox.types';

export const FormikCheckbox = ({ name, render }: FormikCheckboxProps) => {
  const { getFieldProps, setFieldValue, errors, touched }: any = useFormikContext();
  const { value, onBlur } = getFieldProps(name);

  // value must be boolean
  React.useEffect(() => {
    if (typeof value !== 'boolean') {
      setFieldValue(name, false);
    }
  }, [value, name, setFieldValue]);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue(name, event.target.checked);
    },
    [setFieldValue, name],
  );

  const validValue = typeof value !== 'boolean' ? false : value;
  const isTouched = !!touched[name];
  const isValid = isTouched ? !errors[name] : null;
  const isInvalid = isTouched ? !!errors[name] : null;
  const error = isTouched ? errors[name] || null : null;

  return (
    <>
      {render({
        value: validValue,
        name,
        error,
        isTouched,
        isValid,
        isInvalid,
        onChange: handleChange,
        onBlur,
      })}
    </>
  );
};
