import React from 'react';
import * as Yup from 'yup';

import { ERROR_REQUIRED } from '../../lib/test-fixtures';

export const OPTIONS = [
  {
    label: 'Man',
    value: 'MALE',
  },
  {
    label: 'Woman',
    value: 'FEMALE',
  },
];

export const schema = Yup.object().shape({
  gender: Yup.string().required(ERROR_REQUIRED),
});
