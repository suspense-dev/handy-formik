import React, { ChangeEvent } from 'react';
import { useFormikContext } from 'formik';

import { serializeFiles } from './lib';
import { FormikFileCustomFile, FormikFileProps } from './FormikFile.types';

export const FormikFile = ({ render, name, maxFiles, multiple, maxSize, accept, format }: FormikFileProps) => {
    if (!name) throw new Error(`FormikFile: prop "name" was not passed!`);
    if (!render) throw new Error(`FormikFile: prop "render" was not passed!`);

    const inputRef = React.useRef<HTMLInputElement>(null);
    const [ filesState, setFilesState ]: any = React.useState <FormikFileCustomFile[] | string | null>([]);
    const [ isUploading, setUploading ]: any = React.useState(false);
    const {
        values,
        errors,
        touched,
        setFieldValue,
        getFieldProps
    }: any = useFormikContext();

    const handleChange = ({ target: { files: dropped } }: ChangeEvent<HTMLInputElement>) => {
        if (!dropped) return;

        setUploading(true);
        const droppedFilesAmount = dropped.length;
        const existingFilesAmount = filesState.length;
        let acceptedFiles = Array.from(dropped); // TODO: понять превращается ли в массив

        // cut excess files
        if (multiple && maxFiles && existingFilesAmount + droppedFilesAmount > maxFiles) {
            acceptedFiles = acceptedFiles.slice(
                0, -1 * (existingFilesAmount + droppedFilesAmount - maxFiles)
            );
        }

        // convert raw files into serialized ones
        const serializedFiles = serializeFiles(acceptedFiles, format);

        // update Formik and component state with serialized files
        let interval = setInterval(() => {
            if (acceptedFiles.length === serializedFiles.length) {
                setUploading(false);
                setFilesState(multiple ? [...filesState, ...serializedFiles] : serializedFiles.slice(0, 1));
                if (multiple) {
                    const currentValues = Array.isArray(values[name]) ? values[name] : [];
                    setFieldValue(name, [...currentValues, ...serializedFiles.map(item => item.src)]);
                } else {
                    setFieldValue(name, serializedFiles[0].src);
                }
                clearInterval(interval);
            }
        }, 100);
    }

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleDelete = (targetIndex: number) => {
        let newFilesState = filesState;
        newFilesState.splice(targetIndex, 1);
        setFilesState(newFilesState);

        if (Array.isArray(values[name])) {
            let newFormikValue = values[name];
            newFormikValue.splice(targetIndex, 1);
            setFieldValue(name, newFormikValue);
        } else {
            setFieldValue(name, null);
        }
    };

    const isValid = touched[name] ? !errors[name] && (Array.isArray(values[name]) ? !!values[name].length : !!values[name]) : null;
    const isInvalid = touched[name] ? !!errors[name] : null;
    const error = touched[name] ? errors[name] || null : null;

    const extendedProps = getFieldProps(name);
    delete extendedProps.onChange;

    return (
        <>
            <input
                ref={inputRef}
                name={name}
                accept={accept}
                multiple={multiple}
                size={maxSize}
                type="file"
                hidden
                onChange={handleChange}
            />
            {
                render({
                    ...extendedProps,
                    files: filesState,
                    error,
                    touched: !!touched[name],
                    isValid,
                    isInvalid,
                    isUploading,
                    onClick: handleClick,
                    onDelete: handleDelete,
                })
            }
        </>
    )
}
