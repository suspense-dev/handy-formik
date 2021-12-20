
# FormikFile

FormikFile helps to upload files to Formik state.

## Interface

### Input props

* `render: (props: FormikFileOutputProps) => React.ReactNode`
* `name: string`
* `maxFiles?: number`
* `maxSize?: number`
* `multiple?: boolean`
* `accept?: string`
* `onExceedMaxFiles?: (excessFiles: File[]) => any`
* `onExceedMaxSize?: (excessFiles: File | File[]) => any`

### Output props

* `name: string`
* `value: FormikFileCustomFile | FormikFileCustomFile[]`
* `error: any | null`
* `isTouched: boolean`
* `isValid: boolean | null`
* `isInvalid: boolean | null`
* `isUploading: boolean`
* `onClick: () => void`
* `onDrop: (React.DragEvent) => void`
* `onDelete: (targetIndex: number) => void`
* `onBlur: FormikHandlers['handleBlur']`

#### FormikFileCustomFile
* `name: string`
* `size: number`
* `src: string`
* `raw: File`
* `base64?: string`

## Usage

```js
import React from 'react';
import { Formik, Form } from "formik";
import { FormikFile } from 'handy-formik';

import { AwesomeButton } from './../components';

export const AwesomeForm = (props) => {
  const handleSubmit = React.useCallback(values => {
    // do something...
  });

  return (
    <Formik
      initialValues={{
        files: []
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form {...props}>
          <FormikFile name="files" format="base64" multiple render={(connectorProps) => (
            <AwesomeButton {...connectorProps}>Upload!</AwesomeButton>
          )}/>
          <button type="submit">{isSubmitting ? 'submitting' : 'submit'}</button>
        </Form>
      )}
    </Formik>
  );
};
```

