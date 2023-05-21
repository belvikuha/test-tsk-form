import React, { useEffect, useState , useCallback} from 'react';
import { SelectField, TextField } from '../inputs';
import { useSelector } from 'react-redux';
import { getDoctorsList, getCityList, getSpecialityList } from './CatalogSlice';
import {useFormikContext,Field} from 'formik'
import { IMainFormState, IDoctor, ISpecialty, IOption, ICity } from '../../interfaces';



function calculateAge(birthDate: string): number {
    const today: Date = new Date();
    const birth: Date = new Date(birthDate);

    let age: number = today.getFullYear() - birth.getFullYear();
    const monthDiff: number = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    console.log(age)
    return age;
}

const DoctorForm = () => {

    const doctors  = useSelector(getDoctorsList),
    cities = useSelector(getCityList),
    specialities = useSelector(getSpecialityList)

    const {values, setFieldValue} = useFormikContext<IMainFormState>();
    const {doctor, sex, specialty, city, birthDate} = values

    const [doctorsFilteredList, setDoctorsFilteredList]  =  useState<IOption[]>([])
    const [specialtyFilteredList, setSpecialtyFilteredList]  =  useState<ISpecialty[]>(specialities)
    const [patientAge, setPatientAge] = useState<number>(18)
    

    const composeDocList = (docs: IDoctor[]): IOption[] =>{
       var t = docs.map(doc=>{return{value:doc.id, label:`${doc.name} ${doc.surname} ${ doc.isPediatrician && ('(pediatrician)')}` }})
       return t
    }

    useEffect(()=>{
        setDoctorsFilteredList(composeDocList(doctors))
    },[doctors])
    useEffect(()=>{
        setSpecialtyFilteredList(specialities)
    },[specialities])

    // const filterDocList = useCallback(( condition: (item : IDoctor) => boolean ) =>{
    //     const befittingDocs : IDoctor[] =  doctorsFilteredList.filter(condition) 
    //     setDoctorsFilteredList(befittingDocs)
    //  },[doctorsFilteredList])

    useEffect(() => {
        if(birthDate !== ''){
            var age : number = calculateAge(birthDate)
            setPatientAge(age) 
        }
    }, [birthDate]);


    // useEffect(()=>{
    //     if(patientAge < 18){
    //         filterDocList(doc => doc.isPediatrician) 
    //     }
    // },[patientAge])

    // useEffect(() => {
    //     filterDocList(doc => (+doc.specialityId === +specialty) )
    // }, [specialty]);

    // useEffect(() => {
    //     filterDocList(doc => (+doc.cityId === +city)) 
    // }, [ city]);

    const findUniqueSpecIds = useCallback(()=>{
        return new Set(specialtyFilteredList.map(obj => obj.id));
    },[specialtyFilteredList])

    const formOptions = useCallback((list: Array<ISpecialty | ICity>) : IOption[]=>{
        return list.map((item)=>{return {value:item.id, label: item.name}})
    },[])

    useEffect(() => {

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

        setDoctorsFilteredList(composeDocList(befittingDocs))
    }, [doctors, city, specialty, patientAge, specialtyFilteredList]);

    useEffect(() => {
        var spec = specialities.filter(spec =>
            (!spec?.params?.gender || spec?.params?.gender === sex ) &&
            (!spec?.params?.maxAge || spec?.params?.maxAge >= patientAge) &&
            (!spec?.params?.minAge || spec?.params?.minAge <= patientAge)
        )
        setSpecialtyFilteredList(spec)
    }, [sex, patientAge, specialities]);


    useEffect(() => {
        if(doctor!==''){
            var currentDoctor : IDoctor | undefined  = doctors.find(doc => +doc.id === +doctor)
            setFieldValue('specialty', currentDoctor?.specialityId)
            setFieldValue('city', currentDoctor?.cityId)
        }
        
    }, [doctor, doctors]);


    // useEffect(() => {
    //     console.log(doctorsFilteredList)
    // }, [doctorsFilteredList]);
    // useEffect(() => {
    //     console.log(specialtyFilteredList)
    // }, [specialtyFilteredList]);

    const nameValidate = useCallback((e: any)=>{
        setFieldValue('name', e.target.value.replace(/[0-9]/gi, ''))
    },[])

    return (
        <div style={{padding: '1em'}}>
             <TextField
                 name="name"
                 label='Name'
                 onChange={nameValidate}
             />
            <Field type="date" name="birthDate"/>
            <SelectField
                name="sex"
                options={[{value:'Male', label:'Male'},{value:'Female', label:'Female'}]}
                notEmpty={true}
                label="Sex"
            />

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
                options={doctorsFilteredList}
                label= "Doctor"
            />
            <TextField 
                name = "email"
                label= "Email"
            />
             <TextField 
                name = "phoneNumber"
                label= "phoneNumber"
            />
            
        </div>
    );
};

export default DoctorForm;