import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { IMainReducerState, IDoctor, ICity, ISpecialty  } from "../../interfaces";
import { RootState } from "../../store";

const initialState: IMainReducerState = {
    loading: false,
    doctorsList: [],
    specialtyList: [],
    cityList: []
}

export const fetchDoctors = createAsyncThunk<IDoctor[]>(
    'catalogs/fetchDoctors',
    async ( )  => {
        const response = await axios.get(`https://run.mocky.io/v3/3d1c993c-cd8e-44c3-b1cb-585222859c21`)
        return response.data
    }
);
export const fetchCities = createAsyncThunk<ICity[]>(
    'catalogs/fetchCities',
    async ( )  => {
        const response = await axios.get(`https://run.mocky.io/v3/9fcb58ca-d3dd-424b-873b-dd3c76f000f4`)
        return response.data
    }
);
export const fetchDoctorsSpecialty = createAsyncThunk<ISpecialty[]>(
    'catalogs/fetchDoctorsSpecialty',
    async ( )  => {
        const response = await axios.get(`https://run.mocky.io/v3/e8897b19-46a0-4124-8454-0938225ee9ca`)
        return response.data
    }
);


const CatalogsSlice = createSlice({
    name: 'catalogs',
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            ////// Doctors
            .addCase(fetchDoctors.pending, state => {
                state.loading = true; })
            .addCase(fetchDoctors.fulfilled, (state, action) => {
                state.loading = false;
                state.doctorsList = action.payload;
            })
            .addCase(fetchDoctors.rejected, state => {
                state.loading = false;
            })
            //////// Specialty
            .addCase(fetchDoctorsSpecialty.pending, state => {
                state.loading = true; })
            .addCase(fetchDoctorsSpecialty.fulfilled, (state, action) => {
                state.loading = false;
                state.specialtyList = action.payload;
            })
            .addCase(fetchDoctorsSpecialty.rejected, state => {
                state.loading = false;
            })
            ////// City
            .addCase(fetchCities.pending, state => {
                state.loading = true; })
            .addCase(fetchCities.fulfilled, (state, action) => {
                state.loading = false;
                state.cityList = action.payload;
            })
            .addCase(fetchCities.rejected, state => {
                state.loading = false;
            })

            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = CatalogsSlice;

export default reducer;
// export const {

// } = actions;

export const getDoctorsList = (state:RootState) => state.catalogs.doctorsList
export const getCityList = (state:RootState) => state.catalogs.cityList
export const getSpecialityList = (state:RootState) => state.catalogs.specialtyList