import {useState} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {change } from '../../store/slice/information'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './index.module.scss'
import {SUCCESS,FAIL} from '../../config'
function Login() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const information = useSelector(state => {
    // console.log('-----------',state)
    // // return state.information.value
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
        if(type==FAIL) toast.error(message[0], {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        else{
          dispatch(change({payload:data}))
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
      <ToastContainer />
    </div>
  );
}

export default Login;