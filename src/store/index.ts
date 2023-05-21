import { configureStore } from '@reduxjs/toolkit';
import catalogs from '../Components/form/CatalogSlice'


export const store = configureStore({
    reducer: {
        catalogs
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

