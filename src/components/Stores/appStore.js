import { configureStore } from "@reduxjs/toolkit";
import detailReducer from './detailSlice'
import recomendationReducer from './recomendationSlice';
import authReducer from './authSlice';

const appStore = configureStore(
    {
        reducer: {
            detail: detailReducer,
            recomend: recomendationReducer,
            auth : authReducer,
        } 
    }
)

export default appStore;
