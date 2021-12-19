# FormikCustom

FormikCustom helps to connect a custom input element to Formik state.
It might be useful if you have a complex input which does not fit to any of connectors.

## Interface

### Input props

* `render: (props: OutputProps) => React.ReactNode`
* `name: string`

### Output props

* `name: string`
* `value: any`
* `error: any | null`
* `isTouched: boolean`
* `isValid: boolean | null`
* `isInvalid: boolean | null`
* `onChange: (value: any) => void`
* `onBlur: FormikHandlers['handleBlur']`

## Usage

```js
import React from 'react';
import { Formik, Form } from "formik";
import { FormikCustom } from 'handy-formik';

import { AwesomeComplexInput } from './../components';

export const AwesomeForm = (props) => {
  const handleSubmit = React.useCallback(values => {
    // do something...
  }, []);

  return (
    <Formik
      initialValues={{
        data: {}
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form {...props}>
          <FormikCustom name="data" render={(connectorProps) => (
            <AwesomeComplexInput {...connectorProps}/>
          )}/>
          <button type="submit">{isSubmitting ? 'submitting...' : 'submit'}</button>
        </Form>
      )}
    </Formik>
  );
};
```
