import { configureStore } from '@reduxjs/toolkit'
import informationReducer from './slice/information'
export default configureStore({
  reducer: {
    information:informationReducer
  }
})