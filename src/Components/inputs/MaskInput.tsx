import React from 'react';
import { Field, useField } from 'formik';
import InputMask from 'react-input-mask';

interface IFieldProps {
    label?: string;
    name: string;
    mask?: string;
    maskPlaceholder?:string
}


const MaskInput : React.FC<IFieldProps>= ({name, label, mask, maskPlaceholder="_",  ...props}) => {

    const [field, meta]  = useField(name);
    return (
        <div className={`form_input text_input ${meta.touched && meta.error ? 'error': null}`}>
        <label htmlFor="phoneNumber">{label}</label>
        
        <Field name={name}>
            {({ field }: { field: any }) => (
            <InputMask
              {...field}
              mask={mask}
              maskPlaceholder={maskPlaceholder}
            />
           
          )}   
        </Field>
        {meta.touched && meta.error ?(<p>{meta.error}</p>): null}
      </div>
    );
};

export default MaskInput;