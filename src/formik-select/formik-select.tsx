import React from 'react';
import { useFormikContext } from 'formik';

import { FormikSelectProps, FormikSelectOption, FormikSelectSelectedOption } from './formik-select.types';

export const FormikSelect = ({ name, render, options }: FormikSelectProps) => {
  const { getFieldProps, setFieldValue, errors, touched }: any = useFormikContext();
  const { value, onBlur } = getFieldProps(name);

  const selectedOption = React.useMemo<FormikSelectSelectedOption>(
    () => options.find((option: FormikSelectOption) => option.value === value) || null,
    [options, value],
  );

  const restOptions = React.useMemo<FormikSelectOption[]>(
    () =>
      options.filter((option: FormikSelectOption) =>
        selectedOption ? option.value !== selectedOption.value : option.value,
      ),
    [selectedOption, options],
  );

  const handleChange = React.useCallback(
    (value: any) => {
      setFieldValue(name, value);
    },
    [setFieldValue, name],
  );

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
        selectedOption,
        options: restOptions,
        onChange: handleChange,
        onBlur,
      })}
    </>
  );
};
