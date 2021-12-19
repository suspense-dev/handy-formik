import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { FormikSelect } from '../formik-select';
import { ERROR_REQUIRED, renderComponent } from '../../lib/test-fixtures';
import { OPTIONS, schema } from './fixtures';

describe('FormikSelect', () => {
  it('renders correctly', () => {
    const { getByTestId } = renderComponent({
      name: 'country',
      initialValue: null,
      component: FormikSelect,
      connectorProps: {
        options: OPTIONS,
      },
      schema,
    });

    expect(getByTestId('div')).toBeTruthy();
  });

  it('correctly toggles value', async () => {
    const { props } = renderComponent({
      name: 'country',
      initialValue: '1',
      component: FormikSelect,
      connectorProps: {
        options: OPTIONS,
      },
      schema,
    });

    expect(props.value).toBe('1');
    expect(props.selectedOption).toEqual(OPTIONS[0]);
    expect(props.options).toEqual([OPTIONS[1], OPTIONS[2]]);

    act(() => {
      props.onChange('2');
    });

    await waitFor(() => {
      expect(props.value).toBe('2');
      expect(props.selectedOption).toEqual(OPTIONS[1]);
      expect(props.options).toEqual([OPTIONS[0], OPTIONS[2]]);
    });
  });

  it('validates correctly', async () => {
    const { getByTestId, props } = renderComponent({
      name: 'country',
      initialValue: null,
      component: FormikSelect,
      connectorProps: {
        options: OPTIONS,
      },
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
      props.onChange(2);
    });

    await waitFor(() => {
      expect(props.error).toBe(null); // no error if touched and value === true
      expect(props.isValid).toBe(true); // is valid if is not touched and value === true
      expect(props.isInvalid).toBe(false); // not invalid if is not touched and value === true
    });
  });
});
