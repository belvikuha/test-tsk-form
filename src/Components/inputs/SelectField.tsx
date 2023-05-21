import {useEffect, useMemo,useState} from 'react'
import { useField,  Field, useFormikContext} from 'formik';
import { IOption } from '../../interfaces';
import Select, { ActionMeta, StylesConfig, GroupBase, OnChangeValue} from 'react-select'
import { Props } from 'react-select/dist/declarations/src/Select';
// import  from 'react-select/dist/declarations/src/components/Option';
import  ValueType  from 'react-select';
// import { Option } from 'react-select';
//   react-select;
import { IMainFormState } from '../../interfaces';

interface ISelectFieldProps {
    label?: string;
    notEmpty?: boolean
    className?: string;
    name: string;
    options: IOption[];
}


type SelectedDevice = {
    label: any;
    value: any;
 }

type OptionType = { label: string; value: number };

const SelectField : React.FC<ISelectFieldProps>= 
({name, label, notEmpty, className='', options})  => {

    const [field, meta]  = useField(name);
    const [val, setVal] = useState<number>(0)

    const {setFieldValue, } = useFormikContext()

    // const optionList = useMemo(()=>{ 
    //     return options.map((option, i)=>{
    //         var {label, id} = option
    //         return (
    //             <option value={id} key={i+1}>{label}</option>
    //         )
    //     })
    // },[options]) 
    const colourStyles: StylesConfig = {
        control: (provided) => ({...provided,
            width: '15em',
            // zIndex:"1" 
            // border: 0,
            // borderBottom: '1px solid grey' ,
          }),
        input: (styles) => ({ ...styles, width:'100%', zIndex:"2" }),
        menu: (provided) => ({
            ...provided,
            zIndex:"3" 
          }),
        // placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
        // singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
      };

    //   const handleChange = 
    // //   (newValue: IOption | any, actionMeta: ActionMeta<any>) => {
    //     (selectedOption: ValueType<IOption> ) => {
    //     console.log(selectedOption)
    //     // console.log(field)
    //     // setFieldValue(field.name, newValue.value);   
    //   };

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
      const handleBlur = () => {
        // setFieldTouched(field.name, true);
      };

    return (
        <div className={'form_input'}  >
            
             {label && <label htmlFor={name}>{label}</label>}
             <div className={`${meta.touched && meta.error ? 'error': ''}`}>
                {/* <Field as="select" {...field}  >
                {!notEmpty && <option value={''} key={0}> </option>}
                    {optionList}
                </Field> */}
                <Select
                    className={`react-select-container `}
                     classNamePrefix="react-select"
                    // className="basic-single"
                    // classNamePrefix="select"
                    defaultValue={options[0]}
                    // isDisabled={isDisabled}
                    // isLoading={isLoading}
                    isClearable={true}
                    // isRtl={isRtl}
                    isSearchable={true}
                    options={options}
                    // styles={colourStyles}
                    onChange={onChangeU}
                    // onChange={(newValue: OnChangeValue<Option, IsMulti>, actionMeta: ActionMeta<Option>)=> {
                    //     console.log(newValue)
                    //   }}
                    
                    // name={name}
                    // onBlur={handleBlur}
                    // inputValue={options.find(op => op.value === field.value)?.label}
                    value={options.find(op=>op.value === field.value)}
                />
                {/* <CustomSelect
                 classNamePrefix="select"
                //  defaultValue={options[0]}
                 // isDisabled={isDisabled}
                 // isLoading={isLoading}
                 isClearable={true}
                 // isRtl={isRtl}
                 isSearchable={true}
                 options={options}
                 styles={colourStyles}
                //  onChange={onChangeU}
                 // name={name}
                 // onBlur={handleBlur}
                 inputValue={field.value}
                /> */}
                {/* <CustomSelect /> */}
                {meta.touched && meta.error ?(<p >{meta.error}</p>): null}

             </div>
            
        </div>
    )
}



function CustomSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  return (
    <Select {...props} theme={(theme) => ({ ...theme, borderRadius: 0 })} 
    onChange={(newValue: OnChangeValue<Option, IsMulti>, actionMeta: ActionMeta<Option>)=> {
        console.log(newValue)
      }}
    />
  );
}

export default SelectField 