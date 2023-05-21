import {useMemo, useEffect} from 'react';
import { Formik, Form} from 'formik';
import { IMainFormState } from '../../interfaces';
import { useDispatch,useSelector,  } from 'react-redux';
import DoctorForm from './DoctorForm';
import { fetchCities, fetchDoctors, fetchDoctorsSpecialty } from './CatalogSlice';
import * as Yup from 'yup';

const DoctorFormContainer = () => {

    const dispatch = useDispatch<any>();

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



    return (
        <div>
             <Formik
            initialValues={ initialValues }
            validationSchema ={ 
                Yup.object().shape({
                    email: Yup.string().email('Invalid email format').required('Required'),
                    name: Yup.string().required('Required'),
                    birthDate: Yup.date().required('Required'),
                    sex: Yup.string().required('Required'),
                    city : Yup.string().required('Required'),
                    specialty: Yup.string(),
                    doctor : Yup.string().required('Required'),
                    phoneNumber : Yup.string().test ('', 'не співпадає',
                    function(item) {
                        return (this.parent.email !== '')
                    })
            })
         }
            validateOnChange={true}
            validateOnBlur={false}
            enableReinitialize
            onSubmit={(values, {resetForm}) => {console.log(values) }}
            >
            
                <Form className="" >
                    <DoctorForm/>
                    <button type="submit">submit</button>
                </Form> 
                
            </Formik>
        </div>
    );
};


export default DoctorFormContainer;