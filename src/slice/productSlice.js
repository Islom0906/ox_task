import {createSlice} from "@reduxjs/toolkit";

const initialState={
    data:{},
    isLoading:false,
    error:''
}

export const productSlice= createSlice({
    name:'product',
    initialState,
    reducers:{
        getProductStart:(state)=>{
            state.isLoading=true
        },
        getProductSuccess:(state,{payload})=>{
            state.isLoading=false
            state.data=payload
        },
        getProductFailure:(state)=>{
          state.error='Get product error'
        }
    }
})

export const {getProductStart,getProductSuccess,getProductFailure}=productSlice.actions
export default productSlice.reducer