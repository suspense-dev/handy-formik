import React from 'react';
import { useFormikContext } from 'formik';

import { FormikStateProps } from './formik-state.types';

export const FormikState = ({ render }: FormikStateProps) => <>{render(useFormikContext())}</>;
