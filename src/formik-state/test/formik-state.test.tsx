import React from 'react';

import { FormikState } from '../formik-state';
import { renderComponent } from '../../lib/test-fixtures';

describe('FormikState', () => {
  it('renders correctly', () => {
    const { getByTestId } = renderComponent({
      name: 'name',
      initialValue: '',
      component: FormikState,
    });

    expect(getByTestId('div')).toBeTruthy();
  });
});
