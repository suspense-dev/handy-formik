import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { FormikFile } from '../formik-file';
import { ERROR_NEED_MORE_FILES, renderComponent } from '../../lib/test-fixtures';
import { FILE1, FILE2, expectFile, schema } from './fixtures';

describe('FormikFile', () => {
  beforeAll(() => {
    global.URL.createObjectURL = jest.fn().mockReturnValue('url');
  });

  it('renders correctly', () => {
    const { getByTestId } = renderComponent({
      name: 'files',
      initialValue: [],
      component: FormikFile,
      schema,
    });

    expect(getByTestId('div')).toBeTruthy();
  });

  describe('multiple is false', () => {
    it('accepts only 1 file', async () => {
      const { container, props } = renderComponent({
        name: 'files',
        initialValue: [],
        component: FormikFile,
        schema,
      });

      fireEvent.change(container.querySelector('input[type="file"]') as any, {
        target: { files: [FILE1, FILE1, FILE1] },
      });

      await waitFor(() => {
        expectFile(props.value, 'test-1.txt');
      });

      fireEvent.change(container.querySelector('input[type="file"]') as any, { target: { files: [FILE2] } });

      await waitFor(() => {
        expectFile(props.value, 'test-2.txt');
      });
    });

    it('transforms file into base64 if asBase64 is true', async () => {
      const { container, props } = renderComponent({
        name: 'files',
        initialValue: [],
        component: FormikFile,
        schema,
        connectorProps: {
          asBase64: true,
        },
      });

      fireEvent.change(container.querySelector('input[type="file"]') as any, {
        target: { files: [FILE1, FILE1, FILE1] },
      });

      await waitFor(() => {
        expectFile(props.value, 'test-1.txt', true);
      });
    });
  });

  describe('multiple is true', () => {
    it('accepts multiple files is multiple is true', async () => {
      const { container, props } = renderComponent({
        name: 'files',
        initialValue: [],
        component: FormikFile,
        schema,
        connectorProps: {
          multiple: true,
        },
      });

      fireEvent.change(container.querySelector('input[type="file"]') as any, { target: { files: [FILE1, FILE1] } });

      await waitFor(() => {
        expect(props.value.length).toBe(2);
        expectFile(props.value[0], 'test-1.txt');
        expectFile(props.value[1], 'test-1.txt');
      });

      fireEvent.change(container.querySelector('input[type="file"]') as any, { target: { files: [FILE2] } });

      await waitFor(() => {
        expect(props.value.length).toBe(3);
        expectFile(props.value[0], 'test-1.txt');
        expectFile(props.value[1], 'test-1.txt');
        expectFile(props.value[2], 'test-2.txt');
      });
    });

    it('transforms multiple files into base64 if asBase64 is true', async () => {
      const { container, props } = renderComponent({
        name: 'files',
        initialValue: [],
        component: FormikFile,
        schema,
        connectorProps: {
          multiple: true,
          asBase64: true,
        },
      });

      fireEvent.change(container.querySelector('input[type="file"]') as any, { target: { files: [FILE1, FILE2] } });

      await waitFor(() => {
        expectFile(props.value[0], 'test-1.txt', true);
        expectFile(props.value[1], 'test-2.txt', true);
      });
    });

    it("doesn't accept more than maxFiles", async () => {
      const { container, props } = renderComponent({
        name: 'files',
        initialValue: [],
        component: FormikFile,
        schema,
        connectorProps: {
          multiple: true,
          maxFiles: 2,
        },
      });

      fireEvent.change(container.querySelector('input[type="file"]') as Element, {
        target: { files: [FILE1, FILE1, FILE1] },
      });

      await waitFor(() => {
        expect(props.value.length).toBe(2);
        expect(props.value.length).toBe(2);
      });

      act(() => {
        props.onDeleteAll();
      });

      fireEvent.change(container.querySelector('input[type="file"]') as Element, { target: { files: [FILE1] } });
      fireEvent.change(container.querySelector('input[type="file"]') as Element, { target: { files: [FILE1, FILE1] } });

      await waitFor(() => {
        expect(props.value.length).toBe(2);
        expect(props.value.length).toBe(2);
      });
    });
  });

  it('validates correctly', async () => {
    const { getByTestId, container, props } = renderComponent({
      name: 'files',
      initialValue: [],
      component: FormikFile,
      schema,
      connectorProps: {
        multiple: true,
      },
    });

    expect(props.error).toBe(null); // no error if not touched and no value
    expect(props.isValid).toBe(null); // no isValid status if not touched and no value
    expect(props.isInvalid).toBe(null); // no isInvalid status if not touched and no value

    fireEvent.submit(getByTestId('form'));

    await waitFor(() => {
      expect(props.error).toBe(ERROR_NEED_MORE_FILES); // has error if touched and no value
      expect(props.isValid).toBe(false); // no isValid status if touched and no value
      expect(props.isInvalid).toBe(true); // is invalid if touched and no value
    });

    fireEvent.change(container.querySelector('input[type="file"]') as any, {
      target: { files: [FILE1, FILE1, FILE1] },
    });

    await waitFor(() => {
      expect(props.error).toBe(null); // no error if touched and has value
      expect(props.isValid).toBe(true); // is valid if is not touched and has value
      expect(props.isInvalid).toBe(false); // not invalid if is not touched and has value
    });
  });
});
