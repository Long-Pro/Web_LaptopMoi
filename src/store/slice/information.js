import { createSlice } from '@reduxjs/toolkit'

export const informationSlice = createSlice({
  name: 'information',
  initialState: {
    value: {}
  },
  reducers: {
    change: (state, action) => {
      state.value = action.payload
    }
   
  }
})

// Action creators are generated for each case reducer function
export const { change } = informationSlice.actions

export default informationSlice.reducer