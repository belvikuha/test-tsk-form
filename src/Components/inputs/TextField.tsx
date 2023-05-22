import { useField,  Field} from 'formik';
  
interface IFieldProps {
    label?: string;
    className?: string;
    name: string;
    pattern?: string;
    onChange?: (a:any)=>void;
    type?: string
}


const TextField : React.FC<IFieldProps>= ({name, label, className='', ...props}) => {

    const [field, meta]  = useField(name);


    return (
        <div className={`form_input text_input ${meta.touched && meta.error ? 'error': null}`}  >
            
            {label && <label htmlFor={name}>{label}</label>}
            <Field  {...field}  {...props}/>
            {meta.touched && meta.error ?(<p>{meta.error}</p>): null}

        </div>
    )
}



export default TextField 