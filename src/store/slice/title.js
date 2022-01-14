import { createSlice } from '@reduxjs/toolkit'

export const titleSlice = createSlice({
  name: 'title',
  initialState: {
    value: ''
  },
  reducers: {
    change: (state, action) => {
      state.value = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { change } = titleSlice.actions

export default titleSlice.reducer