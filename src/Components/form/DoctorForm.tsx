import React, { useEffect, useState , useCallback} from 'react';
import { useSelector } from 'react-redux';
import {useFormikContext, } from 'formik'

import { getDoctorsList, getCityList, getSpecialityList } from './CatalogSlice';
import { IMainFormState, IDoctor, ISpecialty, IOption, ICity } from '../../interfaces';
import { SelectField, TextField, MaskInput} from '../inputs';


function calculateAge(birthDate: string): number {
    const today: Date = new Date();
    const birth: Date = new Date(birthDate);

    let age: number = today.getFullYear() - birth.getFullYear();
    const monthDiff: number = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
  
    return age;
}

const DoctorForm : React.FC = () => {

    const doctors  = useSelector(getDoctorsList),
    cities = useSelector(getCityList),
    specialities = useSelector(getSpecialityList)

    const {values, setFieldValue} = useFormikContext<IMainFormState>();
    const {doctor, sex, specialty, city, birthDate} = values

    const [doctorsFilteredList, setDoctorsFilteredList]  =  useState<IDoctor[]>(doctors)
    const [specialtyFilteredList, setSpecialtyFilteredList]  =  useState<ISpecialty[]>(specialities)
    const [patientAge, setPatientAge] = useState<number>(18)
    

    const composeDocList = (docs: IDoctor[]): IOption[] =>{
       var t = docs.map(doc=>{return{value:doc.id, label:`${doc.name} ${doc.surname} ${ doc.isPediatrician ? '(pediatrician)': ''}` }})
       return t
    }
    const formOptions = (list: Array<ISpecialty | ICity>) : IOption[]=>{
        return list.map((item)=>{return {value:item.id, label: item.name}})
    }


    useEffect(()=>{
        setDoctorsFilteredList(doctors)
    },[doctors])
    useEffect(()=>{
        setSpecialtyFilteredList(specialities)
    },[specialities])

   



    const findUniqueSpecIds = useCallback(()=>{
        return new Set(specialtyFilteredList.map(obj => obj.id));
    },[specialtyFilteredList])

   


    const filterDoctors = useCallback(()=>{
        var befittingDocs : IDoctor[] = doctors;

        var uniqueSpecIds =  findUniqueSpecIds()
        befittingDocs = befittingDocs.filter(doc => uniqueSpecIds.has(doc.specialityId))

        if(city !== ''){
            befittingDocs = befittingDocs.filter(doc => (+doc.cityId === +city)) 
        }
        if(specialty !== ''){ 
            befittingDocs = befittingDocs.filter(doc => (+doc.specialityId === +specialty)) 
        }
        if(patientAge < 18){ 
            befittingDocs = befittingDocs.filter(doc => doc.isPediatrician) 
        }

        setDoctorsFilteredList(befittingDocs)
    },[doctors, city, specialty, patientAge, specialtyFilteredList])

    const filterSpecialty = useCallback(()=>{
        var spec = specialities.filter(spec =>
            (!spec?.params?.gender || spec?.params?.gender === sex ) &&
            (!spec?.params?.maxAge || spec?.params?.maxAge >= patientAge) &&
            (!spec?.params?.minAge || spec?.params?.minAge <= patientAge)
        )
        setSpecialtyFilteredList(spec)
    },[sex, patientAge, specialities])

    useEffect(() => {
        filterDoctors()
    }, [doctors, city, specialty, patientAge, specialtyFilteredList]);

    
    useEffect(() => {
        filterSpecialty()
    }, [sex, patientAge, specialities]);


    useEffect(() => {
        if(birthDate !== ''){
            var age : number = calculateAge(birthDate)
            setPatientAge(age) 
        }
    }, [birthDate]);


    useEffect(() => {
        if(doctor!==''){
            var currentDoctor : IDoctor | undefined  = doctors.find(doc => +doc.id === +doctor)
            setFieldValue('specialty', currentDoctor?.specialityId)
            setFieldValue('city', currentDoctor?.cityId)
        }    
    }, [doctor, doctors]);



    const nameValidate = useCallback((e: any)=>{
        setFieldValue('name', e.target.value.replace(/[0-9]/gi, ''))
    },[])


    return (
        <div className='form'>
             
            <div>
                <TextField
                    name="name"
                    label='Name'
                    onChange={nameValidate}
                />

                <MaskInput
                    label='Birthday Date' 
                    name="birthDate"
                    mask="99/99/9999"
                />

                <SelectField
                    name="sex"
                    options={[{value:'Male', label:'Male'},{value:'Female', label:'Female'}]}
                    notEmpty={true}
                    label="Sex"
                />

                <TextField 
                    name = "email"
                    label= "Email"
                    type="email"
                />
                <MaskInput
                    name="phoneNumber"
                    label="Mobile number"
                    mask="+38(099)-999-99-99"
                    maskPlaceholder="_"
                />
            </div>
            <div>
                <SelectField
                    name="city"
                    options={formOptions(cities)}
                    label="City"
                />
                <SelectField
                    name="specialty"
                    options={formOptions(specialtyFilteredList)}
                    label="Specialty"
                />
                <SelectField
                    name="doctor"
                    options={composeDocList(doctorsFilteredList)}
                    label= "Doctor"
                />
           
            </div>
             <button type="submit">submit</button>
        </div>
    );
};

export default DoctorForm;