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
        // console.log(data)
        setStaff(data)
        setOpenInfo(true)
      }
    })
    .catch((error)=> {
      let{data,status}=error.response
      if(data=='Invalid Token'&&status==401) navigate("/login", { replace: true });
      showErrorMess('X??c th???c token th???t b???i')
    });
  }
  const handleChangePass=()=>{
    let {currentPassword,newPassword,reNewPassword}=password
    // console.log('password',password)
    let messCurrentPassword,messNewPassword,messReNewPassword
    if(currentPassword.length<6) messCurrentPassword='Vui l??ng nh???p >= 6 k?? t???'
      else messCurrentPassword=''
    if(newPassword.length<6) messNewPassword='Vui l??ng nh???p >= 6 k?? t???'
      else messNewPassword=''
    if(newPassword!=reNewPassword) messReNewPassword='X??c nh???n m???t kh???u m???i kh??ng ????ng'
      else messReNewPassword=''
    setErrorMessPassword({
      currentPassword:messCurrentPassword,
      newPassword:messNewPassword,
      reNewPassword:messReNewPassword
    })
    // console.log({messCurrentPassword,messNewPassword,messReNewPassword})
    if(messCurrentPassword!=''||messNewPassword!=''||messReNewPassword!='') return
    // console.log(111)
    let token=localStorage.getItem("token");
    axios.patch(`/staffs/${account}/password`,{password:currentPassword,newPassword:newPassword},{
      headers: {
        'x-access-token':token,
      }
    })
    .then(res=>{
      let {data,message,type}=res.data
      // console.log( {data,message,type})
      if(type==FAIL) showErrorMess(message[0])
      else{ 
        // console.log(data)
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
      showErrorMess('X??c th???c token th???t b???i')
    });
  }
  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate("/login");
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
          <MenuItem onClick={handleGetInfoStaff}>Th??ng tin c?? nh??n</MenuItem>
          <MenuItem onClick={()=>setOpenPassword(true)}>?????i m???t kh???u</MenuItem>
          <MenuItem onClick={()=>setOpenLogout(true)}>????ng xu???t</MenuItem>
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
              <div className={styles.changePassText}>Thay ?????i m???t kh???u</div>
              <TextField
                required
                label="M???t kh???u hi???n t???i"
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
                label="M???t kh???u m???i"
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
                label="X??c nh???n m???t kh???u m???i"
               
                value={password.reNewPassword}
                error={Boolean(errorMessPassword.reNewPassword)}
                helperText={errorMessPassword.reNewPassword}
                fullWidth 
                margin="normal"
                type='password'
                onChange={(event)=>{setPassword({...password,reNewPassword:event.target.value})}}
              />
              <div style={{display:'flex',justifyContent:'end',marginTop:'10px'}}>
                <Button variant="text" sx={{width:100}} onClick={()=>setOpenPassword(false)} >H???y</Button>
                <Button variant="contained"  sx={{width:100,marginLeft:'20px'}} onClick={handleChangePass}>?????i</Button>
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
            <div style={{minWidth:300}}>X??c nh???n</div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ????ng xu???t kh???i thi???t b????
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>setOpenLogout(false)}>H???y</Button>
            <Button onClick={handleLogout} autoFocus>
              X??c nh???n
            </Button>
          </DialogActions>
        </Dialog>
    </>
  );
}

export default Header;