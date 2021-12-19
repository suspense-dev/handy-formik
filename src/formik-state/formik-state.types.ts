import { FormikContextType } from 'formik/dist/types';
import * as React from 'react';

export type FormikStateProps = {
  render: (props: FormikContextType<Record<any, any>>) => React.ReactNode;
};
