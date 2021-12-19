# FormikSelect

FormikSelect helps to connect a native/custom select to Formik state.

## Interface

### Input props

* `render: (props: FormikSelectOutputProps) => React.ReactNode`
* `name: string`
* `options: FormikSelectOption[];`

### Output props

* `name: string`
* `value: any`
* `error: any | null`
* `isTouched: boolean`
* `isValid: boolean | null`
* `isInvalid: boolean | null`
* `selectedOption: FormikSelectSelectedOption`
* `options: FormikSelectOption[]`
* `onChange: (value: any) => void`
* `onBlur: FormikHandlers['handleBlur']`

#### FormikSelectOption
* `label: React.ReactNode`
* `value: any`

#### FormikSelectSelectedOption
* `FormikSelectOption | null`

## Usage

```js
import React from 'react';
import { Formik, FormikForm } from "formik";
import { FormikSelect } from 'handy-formik';

export const AwesomeForm = (props) => {
  const countryOptions = React.useMemo(() => ([
    {
      label: 'United States',
      value: 'US'
    },
    {
      label: 'United Kingdom',
      value: 'UK'
    },
    {
      label: 'China',
      value: 'CN'
    }
  ]), []);

  const handleSubmit = React.useCallback(values => {
    // do something...
  }, []);

  return (
    <Formik
      initialValues={{
        country: ''
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <FormikForm {...props}>
          <FormikSelect name="country" options={countryOptions} render={({ value, options, onChange, onBlur }) => (
            <select value={value} onChange={(event) => onChange(event.target.value)} onBlur={onBlur}>
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          )}/>
          <button type="submit">{isSubmitting ? 'submitting' : 'submit'}</button>
        </FormikForm>
      )}
    </Formik>
  );
};
```
