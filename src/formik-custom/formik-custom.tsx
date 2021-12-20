import React from 'react';
import { useFormikContext } from 'formik';

import { FormikCustomProps } from './formik-custom.types';

export const FormikCustom = ({ name, render }: FormikCustomProps) => {
  const { getFieldProps, setFieldValue, values, errors, touched }: any = useFormikContext();

  const handleChange = React.useCallback(
    (value: any) => {
      setFieldValue(name, value);
    },
    [setFieldValue, name],
  );

  const { onBlur } = getFieldProps(name);
  const isTouched = !!touched[name];
  const error = isTouched ? errors[name] || null : null;
  const isValid = isTouched ? !error : null;
  const isInvalid = isTouched ? !!error : null;
  const value = values[name];

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
