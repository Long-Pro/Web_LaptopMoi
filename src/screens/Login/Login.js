import {useState} from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import styles from './index.module.scss'
// console.log(styles)
function Login() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const handleChangeAccount = (event) => {
    setAccount(event.target.value);
    console.log(event.target.value)
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    console.log(event.target.value)
  };
  const handleLogin=()=>{
    console.log({account,password})
    axios.post('/staff/login',{account,password})
      .then(res=>{
        console.log(res)
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