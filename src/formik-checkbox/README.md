# FormikCheckbox

FormikCheckbox helps to connect `<input type="checkbox"/>` to Formik state.

## Interface

### Input props

- `render: (props: OutputProps) => React.ReactNode`
- `name: string`

### Output props

- `name: string`
- `value: boolean`
- `error: any | null`
- `isTouched: boolean`
- `isValid: boolean | null`
- `isInvalid: boolean | null`
- `onChange: (event: React.ChangeEvent<HTMLInputElement>) => void`
- `onBlur: FormikHandlers['handleBlur']`

## Usage

```js
import React from 'react';
import { Formik, Form } from "formik";
import { FormikCheckbox } from 'handy-formik';

import { AwesomeCheckbox } from './../components';

export const AwesomeForm = props => {
  const handleSubmit = React.useCallback(values => {
    // do something...
  }, []);

  return (
    <Formik
      initialValues={{
        agree: false
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form {...props}>
          <FormikCheckbox name="agree" render={({ value, onChange, onBlur }) => (
            <input type="checkbox" checked={value} onChange={onChange} onBlur={onBlur}/>
          )}/>
          <button type="submit">{isSubmitting ? 'submitting' : 'submit'}</button>
        </Form>
      )}
    </Formik>
  );
};
```
