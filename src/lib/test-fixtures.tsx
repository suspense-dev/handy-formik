import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Form, Formik } from 'formik';
import { FormikConfig } from 'formik/dist/types';
import { ObjectSchema } from 'yup';

import { FormikFileProps } from '../formik-file';

import { FormikTextField } from '../formik-text-field';

export const ERROR_REQUIRED = 'This is required field!';
export const ERROR_NEED_MORE_FILES = 'You must submit more files!';

export type RenderComponentHandler = ({
  connectorProps,
  formikProps,
  schema,
}: {
  name: string;
  initialValue: any;
  component: any;
  connectorProps?: Omit<FormikFileProps, 'render' | 'name'> & Record<any, any>;
  formikProps?: Partial<FormikConfig<any>>;
  schema?: ObjectSchema;
}) => RenderResult & {
  props: Record<string, any>;
};

export const renderComponent: RenderComponentHandler = ({
  name,
  initialValue,
  component: ReactComponent,
  connectorProps = {},
  formikProps = {},
  schema,
}) => {
  const outerProps = {};
  const renderResult = render(
    <Formik
      initialValues={{
        [name]: initialValue,
      }}
      onSubmit={jest.fn()}
      {...(schema ? { validationSchema: schema } : {})}
      {...formikProps}
    >
      <Form data-testid='form'>
        <ReactComponent
          {...connectorProps}
          name={name}
          render={(props: any) => {
            Object.assign(outerProps, props);
            return <div data-testid='div' />;
          }}
        />
      </Form>
    </Formik>,
  );

  return {
    ...renderResult,
    props: outerProps,
  };
};
