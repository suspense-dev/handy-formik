import React from 'react';
import * as Yup from 'yup';

import { ERROR_REQUIRED } from '../../lib/test-fixtures';

export const schema = Yup.object().shape({
  check: Yup.mixed().test('Is checked', ERROR_REQUIRED, (value: any) => value === true),
});
