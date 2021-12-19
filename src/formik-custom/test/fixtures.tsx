import React from 'react';
import * as Yup from 'yup';

import { ERROR_REQUIRED } from '../../lib/test-fixtures';

export const schema = Yup.object().shape({
  data: Yup.object().shape({
    name: Yup.string().required(ERROR_REQUIRED),
  }),
});
