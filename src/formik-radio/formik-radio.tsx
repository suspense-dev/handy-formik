import React from 'react';
import { useFormikContext } from 'formik';

import { FormikRadioProps, FormikRadioOption } from './formik-radio.types';

export const FormikRadio = ({ name, render, options }: FormikRadioProps) => {
  const { getFieldProps, setFieldValue, errors, touched }: any = useFormikContext();
  const { onBlur, value } = getFieldProps(name);

  const checkedOption = React.useMemo(
    () => options.find((option: FormikRadioOption) => option.value === value) || null,
    [options, value],
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue(name, event.target.value);
    },
    [name, setFieldValue],
  );

  const isTouched = !!touched[name];
  const isValid = isTouched ? !errors[name] : null;
  const isInvalid = isTouched ? !!errors[name] : null;
  const error = isTouched ? errors[name] || null : null;

  return (
    <>
      {render({
        name,
        value,
        error,
        isTouched,
        isValid,
        isInvalid,
        checkedOption,
        options,
        onChange: handleChange,
        onBlur,
      })}
    </>
  );
};
