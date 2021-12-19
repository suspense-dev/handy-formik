# FormikTextField

FormikTextField helps to connect text `<input type="text"/>` to Formik state.

## Interface

### Input props

* `render: (props: FormikTextFieldOutputProps) => React.ReactNode`
* `name: string`

### Output props

* `name: string`
* `value: string`
* `error: any | null`
* `isTouched: boolean`
* `isValid: boolean | null`
* `isInvalid: boolean | null`
* `onChange: (event: React.ChangeEvent) => void`
* `onBlur: FormikHandlers['handleBlur']`

## Usage

```js
import React from 'react';
import { Formik, Form } from 'formik';
import { FormikTextField } from 'handy-formik';

export const AwesomeForm = (props) => {
  const handleSubmit = React.useCallback(values => {
    // do something...
  });

  return (
    <Formik
      initialValues={{
        newPassword: ''
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form {...props}>
          <FormikInput name="newPassword" render={({ value, onChange, onBlur }) => (
            <input type="text" value={value} onChange={onChange} onBlur={onBlur}/>
          )}/>
          <button type="submit">{isSubmitting ? 'submitting' : 'submit'}</button>
        </Form>
      )}
    </Formik>
  );
};
```
