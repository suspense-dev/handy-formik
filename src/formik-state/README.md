# FormikSate

FormikSate helps to pass Formik state to underneath component.
It might be useful if you need to have access to Formik state in a low-level component.
It's used as an alternative to `useFormikContext`.

## Interface

### Input props

* `render: (props: OutputProps) => React.ReactNode`

### Output props

* `FormikContextType<Record<any, any>>`

## Usage

```js
import React from 'react';
import { FormikState } from 'handy-formik';

// to be used within <Formik/> component
export const AwesomeFormButton = ({ children, ...rest }) => {
  return (
    <FormikState render={({ isSubmitting }) => (
      <button type="submit" {...rest}>{isSubmitting ? 'submitting' : children}</button>
    )}/>
  );
};
```
