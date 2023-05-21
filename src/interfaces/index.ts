
export type genderType = 'Female' | 'Male'

export interface IOption {
    value: string | number;
    label: string;
  }

export interface ICity{
    id: number,
    name: string
}

export interface ISpecialtyParams{
    gender: genderType,
    maxAge: number,
    minAge:number
}

export interface ISpecialty{
    id: number,
    name: string
    params: ISpecialtyParams
}

export interface IDoctor{
    id: number,
    name: string
    surname:string,
    specialityId: number,
    isPediatrician: boolean,
    cityId: number
}

export interface IMainReducerState{
    loading: boolean
    doctorsList: IDoctor[]
    specialtyList: ISpecialty[]
    cityList: ICity[]
}

export interface IMainFormState{
    name: string,
    birthDate : string,
    sex: genderType,
    city : string,
    specialty: string,
    doctor : string,
    email: string
}
