import React from 'react';
import { useFormikContext } from 'formik';

import { FormikTextFieldProps } from './formik-text-field.types';

export const FormikTextField = ({ name, render }: FormikTextFieldProps) => {
  const { getFieldProps, setFieldValue, errors, touched }: any = useFormikContext();

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue(name, event.target.value);
    },
    [setFieldValue, name],
  );

  const { value, onBlur } = getFieldProps(name);
  const isTouched = !!touched[name];
  const error = isTouched ? errors[name] || null : null;
  const isValid = isTouched ? !error : null;
  const isInvalid = isTouched ? !!error : null;

  return (
    <>
      {render({
        name,
        value,
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
