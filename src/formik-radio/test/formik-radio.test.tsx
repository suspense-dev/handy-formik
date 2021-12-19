import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { FormikRadio } from '../formik-radio';
import { ERROR_REQUIRED, renderComponent } from '../../lib/test-fixtures';
import { OPTIONS, schema } from './fixtures';

describe('FormikRadio', () => {
  it('renders correctly', () => {
    const { getByTestId } = renderComponent({
      name: 'gender',
      initialValue: '',
      component: FormikRadio,
      schema,
      connectorProps: {
        options: OPTIONS,
      },
    });

    expect(getByTestId('div')).toBeTruthy();
  });

  it('changes value correctly', async () => {
    const { props } = renderComponent({
      name: 'gender',
      initialValue: '',
      component: FormikRadio,
      schema,
      connectorProps: {
        options: OPTIONS,
      },
    });

    act(() => {
      props.onChange({ target: { value: 'MALE' } });
    });

    await waitFor(() => {
      expect(props.value).toBe('MALE');
      expect(props.checkedOption).toEqual({
        label: 'Man',
        value: 'MALE',
      });
    });

    act(() => {
      props.onChange({ target: { value: 'FEMALE' } });
    });

    await waitFor(() => {
      expect(props.value).toBe('FEMALE');
      expect(props.checkedOption).toEqual({
        label: 'Woman',
        value: 'FEMALE',
      });
    });
  });

  it('validates correctly', async () => {
    const { getByTestId, props } = renderComponent({
      name: 'gender',
      initialValue: '',
      component: FormikRadio,
      schema,
      connectorProps: {
        options: OPTIONS,
      },
    });

    expect(props.error).toBe(null); // no error if not touched and value === false
    expect(props.isValid).toBe(null); // no isValid status if not touched and value === false
    expect(props.isInvalid).toBe(null); // no isInvalid status if not touched and value === false

    fireEvent.submit(getByTestId('form'));

    await waitFor(() => {
      expect(props.error).toBe(ERROR_REQUIRED); // has error if touched and value === false
      expect(props.isValid).toBe(false); // no isValid status if touched and value === false
      expect(props.isInvalid).toBe(true); // is invalid if touched and value === false
    });

    act(() => {
      props.onChange({ target: { value: 'FEMALE' } });
    });

    await waitFor(() => {
      expect(props.error).toBe(null); // no error if touched and value === true
      expect(props.isValid).toBe(true); // is valid if is not touched and value === true
      expect(props.isInvalid).toBe(false); // not invalid if is not touched and value === true
    });
  });
});
