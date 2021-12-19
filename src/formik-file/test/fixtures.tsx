import React from 'react';
import * as Yup from 'yup';

import { FormikFileCustomFile } from '../formik-file.types';
import { ERROR_NEED_MORE_FILES } from '../../lib/test-fixtures';

export const FILE1 = new File(['TEST'], 'test-1.txt', { type: 'text/plain' });
export const FILE2 = new File(['TEST'], 'test-2.txt', { type: 'text/plain' });
export const FILE_AS_BASE64 = 'data:text/plain;base64,VEVTVA==';

export const schema = Yup.object().shape({
  files: Yup.mixed().test('more than 1', ERROR_NEED_MORE_FILES, (value: any) => {
    if (!Array.isArray(value) || value.length <= 2) {
      return false;
    }
    return true;
  }),
});

export const expectFile = (file: FormikFileCustomFile, name: string, isBase64?: boolean): void => {
  expect(file.size).toBe(4);
  expect(file.name).toBe(name);
  expect(file.src).toBe('url');
  expect(file.raw).toBeInstanceOf(File);

  if (isBase64) {
    expect(file.base64).toBe(FILE_AS_BASE64);
  }
};
