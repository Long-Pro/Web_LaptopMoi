import {useState} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {change } from '../../store/slice/information'
import {changeIsLogin } from '../../store/slice/isLogin'

import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import 'react-toastify/dist/ReactToastify.css';
import styles from './index.module.scss'
import {SUCCESS,FAIL} from '../../config'
import {showErrorMess,FAIL2} from '../../lib/util'
function Login() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const information = useSelector(state => {
  })
  const dispatch = useDispatch()
  let navigate = useNavigate();
  const handleChangeAccount = (event) => {
    setAccount(event.target.value);
    // console.log(event.target.value)
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    // console.log(event.target.value)
  };
  const handleLogin=()=>{
    console.log({account,password})
    axios.post('/staff/login',{account,password})
      .then(res=>{
        let {data:{data,message,type,token}}=res
        // console.log({data,message,type,token})
        // console.log(res)
        if(type==FAIL) showErrorMess(message[0]) 
        else{
          dispatch(change(data))
          dispatch(changeIsLogin(true))
          
          localStorage.setItem('token', token);
          navigate("/");
        }
        
      })
      .catch((error)=> {
        console.log(error);
      });
  }
  return (
    <div className={styles.wrap}>
      <div className={styles.top}></div>
      <div className={styles.form}>
        <div className={styles.title} >ĐĂNG NHẬP</div>
        <TextField
          required
          label="Tài khoản"
          value={account}
          fullWidth 
          margin="normal"
          onChange={handleChangeAccount}
        />
        <TextField
          required

          label="Mật khẩu"
          value={password}
          fullWidth 
          margin="normal"
          type='password'
          onChange={handleChangePassword}
        />
        <div style={{height:30}}></div>
        <Button 
          variant="contained" 
          fullWidth 
          size="large" 
          style={{height:56}}
          onClick={handleLogin}
        >Đăng nhập</Button>
      </div>

    </div>
  );
}

export default Login;