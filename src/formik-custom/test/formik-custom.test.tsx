import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { FormikCustom } from '../formik-custom';
import { schema } from './fixtures';
import { ERROR_REQUIRED, renderComponent } from '../../lib/test-fixtures';

describe('FormikCustom', () => {
  it('renders correctly', () => {
    const { getByTestId } = renderComponent({
      name: 'data',
      initialValue: {
        name: '',
      },
      component: FormikCustom,
      schema,
    });

    expect(getByTestId('div')).toBeTruthy();
  });

  it('changes value correctly', async () => {
    const { props } = renderComponent({
      name: 'data',
      initialValue: {
        name: '',
      },
      component: FormikCustom,
      schema,
    });

    expect(props.value.name).toBe('');

    act(() => {
      props.onChange({ name: 'A' });
    });

    await waitFor(() => {
      expect(props.value.name).toBe('A');
    });

    act(() => {
      props.onChange({ name: '' });
    });

    await waitFor(() => {
      expect(props.value.name).toBe('');
    });
  });

  it('validates correctly', async () => {
    const { getByTestId, props } = renderComponent({
      name: 'data',
      initialValue: {
        name: '',
      },
      component: FormikCustom,
      schema,
    });

    expect(props.error).toBe(null); // no error if not touched and value === false
    expect(props.isValid).toBe(null); // no isValid status if not touched and value === false
    expect(props.isInvalid).toBe(null); // no isInvalid status if not touched and value === false

    fireEvent.submit(getByTestId('form'));

    await waitFor(() => {
      expect(props.error.name).toBe(ERROR_REQUIRED); // has error if touched and value === false
      expect(props.isValid).toBe(false); // no isValid status if touched and value === false
      expect(props.isInvalid).toBe(true); // is invalid if touched and value === false
    });

    act(() => {
      props.onChange({ name: 'A' });
    });

    await waitFor(() => {
      expect(props.error).toBe(null); // no error if touched and value === true
      expect(props.isValid).toBe(true); // is valid if is not touched and value === true
      expect(props.isInvalid).toBe(false); // not invalid if is not touched and value === true
    });
  });
});
