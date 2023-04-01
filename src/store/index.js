import {configureStore} from "@reduxjs/toolkit";
import ProductSlice from "../slice/productSlice";

export default configureStore({
    reducer:{
        product:ProductSlice
    },
    devTools: process.env.NODE_ENV !== 'production',
})