type ValidateFilesBySizeResult = {
  validFiles: File[];
  invalidFiles: File[];
};

export const validateFilesBySize = (files: File[], maxSize: number): ValidateFilesBySizeResult => {
  const invalidFiles = [];
  const validFiles = [];

  for (let i = 0; i < files.length; i++) {
    if (files[i].size > maxSize) {
      invalidFiles.push(files[i]);
    } else {
      validFiles.push(files[i]);
    }
  }

  return {
    invalidFiles,
    validFiles,
  };
};
