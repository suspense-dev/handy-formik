import React from 'react';
import * as Yup from 'yup';

import { ERROR_REQUIRED } from '../../lib/test-fixtures';

export const OPTIONS = [
  {
    label: 'China',
    value: '1',
  },
  {
    label: 'USA',
    value: '2',
  },
  {
    label: 'UK',
    value: '3',
  },
];

export const schema = Yup.object().shape({
  country: Yup.string().nullable().required(ERROR_REQUIRED),
});
