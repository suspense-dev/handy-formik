# FormikRadioGroup

FormikRadioGroup helps to connect `<input type="radio"/>` to Formik state.

## Interface

### Input props

* `render: (props: FormikRadioOutputProps) => React.ReactNode`
* `name: string`
* `options: Option[]`

### Output props

* `name: string`
* `value: any`
* `error: any | null`
* `isTouched: boolean`
* `isValid: boolean | null`
* `isInvalid: boolean | null`
* `checkedOption: FormikRadioOption | null`
* `options: FormikRadioOption[]`
* `onBlur: (e: React.SyntheticEvent) => Promise<void> | void`
* `onChange: (e: React.SyntheticEvent) => Promise<void> | void`

#### FormikRadioOption
* `label: React.ReactNode`
* `value: any`

## Usage

```js
import React from 'react';
import { Formik, Form } from "formik";
import { FormikRadioGroup } from 'handy-formik';

export const AwesomeForm = (props) => {
  const genderOptions = React.useMemo(() => ([
    {
      label: 'I am a man',
      value: 'MALE'
    }, {
      label: 'I am a woman',
      value: 'FEMALE'
    }
  ]), []);

  const handleSubmit = React.useCallback(values => {
    // do something...
  }, []);

  return (
    <Formik
      initialValues={{
        gender: ''
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form {...props}>
          <FormikRadioGroup name="gender" options={genderOptions} render={({ value, options, onChange, onBlur }) => {
            return options.map((item) => (
              <input
                key={item.value}
                type="radio"
                value={item.value}
                checked={item.value === value}
                onChange={onChange}
                onBlur={onBlur}
              />
            ))
          }}/>
          <button type="submit">{isSubmitting ? 'submitting' : 'submit'}</button>
        </Form>
      )}
    </Formik>
  );
};
```
