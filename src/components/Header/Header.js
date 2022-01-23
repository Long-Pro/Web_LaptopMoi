import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import styles from './index.module.scss'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';

import StaffDetail from '../StaffDetail/StaffDetail';

import {SUCCESS,FAIL} from '../../config'
import {showErrorMess,showSuccessMess} from '../../lib/util'

function Header() {
  let navigate = useNavigate();
  const title = useSelector(state =>state.title.value)
  const {account,_id} = useSelector(state =>state.information.value)

  const [anchorEl, setAnchorEl] = useState(null);
  const [openInfo, setOpenInfo] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);

  const [staff, setStaff] = useState({});
  const [password, setPassword] = useState({
    currentPassword:'',
    newPassword:'',
    reNewPassword:''
  });
  const [errorMessPassword, setErrorMessPassword] = useState({
    currentPassword:'',
    newPassword:'',
    reNewPassword:''
  });



  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleGetInfoStaff=()=>{
    let token=localStorage.getItem("token");
    axios.get(`/staffs/information?id=${_id}`,{
      headers: {
        'x-access-token':token,
      }
    })
    .then(res=>{
      let {data:{data,message,type}}=res
      if(type==FAIL) showErrorMess(message[0])
      else{ 
        console.log(data)
        setStaff(data)
        setOpenInfo(true)
      }
    })
    .catch((error)=> {
      let{data,status}=error.response
      if(data=='Invalid Token'&&status==401) navigate("/login", { replace: true });
      showErrorMess('Xác thực token thất bại')
    });
  }
  const handleChangePass=()=>{
    let {currentPassword,newPassword,reNewPassword}=password
    console.log('password',password)
    let messCurrentPassword,messNewPassword,messReNewPassword
    if(currentPassword.length<6) messCurrentPassword='Vui lòng nhập >= 6 kí tự'
      else messCurrentPassword=''
    if(newPassword.length<6) messNewPassword='Vui lòng nhập >= 6 kí tự'
      else messNewPassword=''
    if(newPassword!=reNewPassword) messReNewPassword='Xác nhận mật khẩu mới không đúng'
      else messReNewPassword=''
    setErrorMessPassword({
      currentPassword:messCurrentPassword,
      newPassword:messNewPassword,
      reNewPassword:messReNewPassword
    })
    console.log({messCurrentPassword,messNewPassword,messReNewPassword})
    if(messCurrentPassword!=''||messNewPassword!=''||messReNewPassword!='') return
    console.log(111)
    let token=localStorage.getItem("token");
    axios.patch(`/staffs/${account}/password`,{password:currentPassword,newPassword:newPassword},{
      headers: {
        'x-access-token':token,
      }
    })
    .then(res=>{
      let {data,message,type}=res.data
      console.log( {data,message,type})
      if(type==FAIL) showErrorMess(message[0])
      else{ 
        console.log(data)
        setOpenPassword(false)
        showSuccessMess(message[0])
        setPassword({
          currentPassword:'',
          newPassword:'',
          reNewPassword:''
        });
      }
    })
    .catch((error)=> {
      let{data,status}=error.response
      if(data=='Invalid Token'&&status==401) navigate("/login", { replace: true });
      showErrorMess('Xác thực token thất bại')
    });
  }
  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate("/login");
  }

  const test=()=>{
    console.log('password',password)
    console.log('errorMessPassword',errorMessPassword)
  }


  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.title}>
          {title}
        </div>
        <div  className={styles.user}  onClick={handleClick}>
          <div className={styles.account}>
            {account}
          </div>
          <ArrowDropDownIcon/>
          <Avatar alt="Cindy Baker" src="https://loremflickr.com/100/100" />
        </div>
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleGetInfoStaff}>Thông tin cá nhân</MenuItem>
          <MenuItem onClick={()=>setOpenPassword(true)}>Đổi mật khẩu</MenuItem>
          <MenuItem onClick={()=>setOpenLogout(true)}>Đăng xuất</MenuItem>
        </Menu>
        <Modal
          open={openInfo}
          onClose={()=>setOpenInfo(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className={styles.wrapInfo}>
            <StaffDetail staff={staff}/>
            
          </div>
        </Modal>
        <Modal
          open={openPassword}
          onClose={()=>setOpenPassword(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className={styles.modalPassword}>
            <div className={styles.wrapPassword} >
              <div className={styles.changePassText}>Thay đổi mật khẩu</div>
              <TextField
                required
                label="Mật khẩu hiện tại"
                value={password.currentPassword}
                error={Boolean(errorMessPassword.currentPassword)}
                helperText={errorMessPassword.currentPassword}
                fullWidth 
                margin="normal"
                type='password'
                onChange={(event)=>{setPassword({...password,currentPassword:event.target.value})}}
              /> 
              <TextField
                required
                label="Mật khẩu mới"
                value={password.newPassword}
                error={Boolean(errorMessPassword.newPassword)}
                helperText={errorMessPassword.newPassword}
                fullWidth 
                margin="normal"
                type='password'
                
                onChange={(event)=>{setPassword({...password,newPassword:event.target.value})}}
              />
              <TextField
                required
                label="Xác nhận mật khẩu mới"
               
                value={password.reNewPassword}
                error={Boolean(errorMessPassword.reNewPassword)}
                helperText={errorMessPassword.reNewPassword}
                fullWidth 
                margin="normal"
                type='password'
                onChange={(event)=>{setPassword({...password,reNewPassword:event.target.value})}}
              />
              <div style={{display:'flex',justifyContent:'end',marginTop:'10px'}}>
                <Button variant="text" sx={{width:100}} onClick={()=>setOpenPassword(false)} >Hủy</Button>
                <Button variant="contained"  sx={{width:100,marginLeft:'20px'}} onClick={handleChangePass}>Đổi</Button>
              </div>

            </div>
            
          </div>
        </Modal>
        <Dialog
          open={openLogout}
          onClose={()=>setOpenLogout(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <div style={{minWidth:300}}>Xác nhận</div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Đăng xuất khỏi thiết bị?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>setOpenLogout(false)}>Hủy</Button>
            <Button onClick={handleLogout} autoFocus>
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
        <ToastContainer />
    </>
  );
}

export default Header;