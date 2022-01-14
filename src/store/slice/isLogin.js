import { createSlice } from '@reduxjs/toolkit'

export const isLoginSlice = createSlice({
  name: 'isLogin',
  initialState: {
    value: false
  },
  reducers: {
    changeIsLogin: (state, action) => {
      state.value = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const {changeIsLogin } = isLoginSlice.actions

export default isLoginSlice.reducer