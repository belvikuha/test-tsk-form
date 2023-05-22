import {useEffect } from 'react'
import { useField,  useFormikContext} from 'formik';
import { IOption } from '../../interfaces';
import Select, { ActionMeta} from 'react-select'


interface ISelectFieldProps {
    label?: string;
    notEmpty?: boolean
    className?: string;
    name: string;
    options: IOption[];
}


const SelectField : React.FC<ISelectFieldProps>= ({name, label,  options})  => {

    const [field, meta]  = useField(name);

    const {setFieldValue, } = useFormikContext()


    useEffect(()=>{
        console.log(field.value)
    },[field.value])

    const onChangeU = (option: IOption | null, actionMeta: ActionMeta<IOption>) => {
        console.log(option)
        if(option !== null){
            console.log(option.value)
             setFieldValue(name, option.value);
           
        }
        else{
            setFieldValue(name, '');
        }  
     }

    return (
        <div className={'form_input'}  >
             {label && <label htmlFor={name}>{label}</label>}
             <div className={`${meta.touched && meta.error ? 'error': ''}`}>
                <Select
                    className={`react-select-container `}
                    classNamePrefix="react-select"
                    isClearable={true}
                    isSearchable={true}
                    options={options}
                    onChange={onChangeU}
                    value={options.find(op=>op.value === field.value) || null}
                />
                
                {meta.touched && meta.error ?(<p >{meta.error}</p>): null}

             </div>
            
        </div>
    )
}




export default SelectField 