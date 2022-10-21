import { createSlice } from '@reduxjs/toolkit'
// import { Bank } from "./types/bank.interface";

export const coordinatesSlice = createSlice({
  name: 'banks',
  initialState:{
    coordinates: {
      x:0,
      y:0
    }
  },
  reducers: {
    coordinates:(state,action)=>{
        console.log("pay ",action.payload);
        state.coordinates.x= action.payload.x
        state.coordinates.y= action.payload.y
    }
  },
})

export const data = (state:any) => state.coordinates



export const { coordinates } = coordinatesSlice.actions
export default coordinatesSlice.reducer