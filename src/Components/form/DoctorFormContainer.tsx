import {useMemo, useEffect} from 'react';
import { Formik, Form} from 'formik';
import { useDispatch,useSelector  } from 'react-redux';
import * as Yup from 'yup';


import { fetchCities, fetchDoctors, fetchDoctorsSpecialty, getLoading } from './CatalogSlice';
import { IMainFormState } from '../../interfaces';
import DoctorForm from './DoctorForm';

import './DoctorForm.scss'
import spinner from '../../Circles.gif'

const DoctorFormContainer = () => {

    const dispatch = useDispatch<any>();
    const loading = useSelector(getLoading)

    useEffect(() => {
        dispatch(fetchCities())
        dispatch(fetchDoctors())
        dispatch(fetchDoctorsSpecialty())
    }, []);

    const initialValues : IMainFormState = useMemo(()=>{
        return{
            name: '',
            birthDate : '',
            sex: 'Male',
            city : '',
            specialty: '',
            doctor : '',
            email: '',
            phoneNumber: ''
        }
    },[])

    const validationSchema = useMemo(()=> Yup.object().shape({
        email: Yup.string().email('Invalid email format')
            .matches(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu, 'Invalid mail format')
            .test('at-least-one-filled', "Required at least one: email or phone", function(item){
                return ((!!item && item !=='') || (!!this.parent.phoneNumber && this.parent.phoneNumber !== ''))
            }),
        name: Yup.string().required('Required'),
        birthDate: Yup.string()
            .matches(/^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, 'Invalid date format')
            .required('Required'),
        sex: Yup.string().required('Required'),
        city : Yup.string().required('Required'),
        specialty: Yup.string(),
        doctor : Yup.string().required('Required'),
        phoneNumber : Yup.string()
            .matches(/^\+38\(\d{3}\)-\d{3}-\d{2}-\d{2}$/, 'Invalid mobile number format')
            .test('at-least-one-filled', "Required at least one: email or phone", function(item){
                return ((!!item && item !=='') || (!!this.parent.email && this.parent.email !== ''))
              })
            
    })
    ,[])

    return (
        <div className='form_container'>
            <Formik
            initialValues={ initialValues }
            validationSchema ={ validationSchema }
            validateOnChange={true}
            validateOnBlur={true}
            enableReinitialize
            onSubmit={(values, {resetForm, setFieldValue}) => {
                alert(JSON.stringify(values, null, 4));
                resetForm()
            }}
            >
            
                <Form >
                    {loading ? <img src={spinner} alt="loading..." className='spiner' /> : <DoctorForm/> }
                </Form> 
                
            </Formik>
        </div>
    );
};


export default DoctorFormContainer;