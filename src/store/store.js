import { configureStore } from '@reduxjs/toolkit'
import informationReducer from './slice/information'
import titleReducer from './slice/title'
import isLoginReducer from './slice/isLogin'


export default configureStore({
  reducer: {
    information:informationReducer,
    title:titleReducer,
    isLogin:isLoginReducer
  }
})