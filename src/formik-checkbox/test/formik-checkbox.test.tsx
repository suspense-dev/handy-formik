import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { FormikCheckbox } from '../formik-checkbox';
import { schema } from './fixtures';
import { ERROR_REQUIRED, renderComponent } from '../../lib/test-fixtures';

describe('FormikCheckbox', () => {
  it('renders a component returned from render callback', () => {
    const { getByTestId } = renderComponent({
      name: 'check',
      initialValue: false,
      component: FormikCheckbox,
      schema,
    });

    expect(getByTestId('div')).toBeTruthy();
  });

  it('toggles correctly', async () => {
    const { props } = renderComponent({
      name: 'check',
      initialValue: false,
      component: FormikCheckbox,
      schema,
    });

    expect(props.isTouched).toBe(false);

    act(() => {
      props.onChange({ target: { checked: true } });
    });

    await waitFor(() => {
      expect(props.value).toBe(true);
    });

    act(() => {
      props.onChange({ target: { checked: false } });
    });

    await waitFor(() => {
      expect(props.value).toBe(false);
    });
  });

  it('corrects invalid initial value', async () => {
    const { props } = renderComponent({
      name: 'check',
      initialValue: 'invalid',
      component: FormikCheckbox,
      schema,
    });

    await waitFor(() => {
      expect(props.value).toBe(false);
    });
  });

  it('is validated correctly', async () => {
    const { getByTestId, props } = renderComponent({
      name: 'check',
      initialValue: false,
      component: FormikCheckbox,
      schema,
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
      props.onChange({ target: { checked: true } });
    });

    await waitFor(() => {
      expect(props.error).toBe(null); // no error if touched and value === true
      expect(props.isValid).toBe(true); // is valid if is not touched and value === true
      expect(props.isInvalid).toBe(false); // not invalid if is not touched and value === true
    });
  });
});
