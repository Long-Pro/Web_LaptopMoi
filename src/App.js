import { Routes, Route, Link, Outlet ,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import Menu from './components/Menu/Menu'
import Header from './components/Header/Header'

import styles from './App.module.scss';

function App() {
  // const isLogin = useSelector(state => state.isLogin.value)
  // let navigate = useNavigate();
  // useEffect(()=>{
    
  //   console.log('isLogin',isLogin)
  //   if(!isLogin) navigate("/login");

  // },[])
  return (
    <div style={{display:'flex'}}>
      <Menu/>
      <div style={{flex:1}}>
        <Header/>
        <div className={styles.content}>
          <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default App;
