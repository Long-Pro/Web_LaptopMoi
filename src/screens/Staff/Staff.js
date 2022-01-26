import { useSelector, useDispatch } from 'react-redux'
import React,{useEffect,useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import NumberFormat from 'react-number-format';
import clsx from 'clsx';



import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';



import {change } from '../../store/slice/title'
import styles from './index.module.scss'
import {SUCCESS,FAIL,staffType,adminType,rePhone,reEmail,reAccount,rePassword} from '../../config'//
import {showErrorMess,showSuccessMess} from '../../lib/util'
import {YMDTHMtoDMY,YMDTHMtoHMDMY,DatetimeToYMD,YMDTHMtoObjDate} from '../../lib/myLib'
import StaffDetail from '../../components/StaffDetail/StaffDetail'
function Staff() {
  // console.log('re-render')
  const infoStaffLogin = useSelector(state =>state.information.value)
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const [value, setValue] = useState('');
  const [phones, setPhones] = useState([]);
  const [ids, setIds] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [filter, setFilter] = useState('phone');
  const [staff, setStaff] = useState({});
  const [openAddStaff, setOpenAddStaff] = useState(false);
  const [openEditStaff, setOpenEditStaff] = useState(false);
  const [objEditStaff, setObjEditStaff] = useState({});
  const [objAddStaff, setObjAddStaff] = useState({
    name:'',
    address:'',
    birthday:'',
    phone:'',
    account:'',
    password:'',
    confirmPassword:'',
    email:'',
    type:1,
    gender:'Nam'
  });
  const [objErrMessAddStaff,setObjErrMessAddStaff]=useState({
    name:'',
    address:'',
    birthday:'',
    phone:'',
    account:'',
    password:'',
    confirmPassword:'',
    email:'',
  })
  const [objErrMessEditStaff,setObjErrMessEditStaff]=useState({
    name:'',
    address:'',
    birthday:'',
    phone:'',
    email:'',
  })


  useEffect(()=>{
    dispatch(change('NHÂN VIÊN'))
    getIdentifications()
  },[])
  const getIdentifications=()=>{
    let token=localStorage.getItem("token");
    axios.get('/staffs/identifications',{
      headers: {
        'x-access-token':token,
      }
    })
    .then(res=>{
      let {data:{data,message,type}}=res
      if(type==FAIL) showErrorMess(message[0])
      else{ 
        // console.log(data)
        setPhones(data.phones)
        setIds(data.ids)
        setAccounts(data.accounts)

      } 
    })
    .catch((error)=> {
      let{data,status}=error.response
      if(data=='Invalid Token'&&status==401) navigate("/login", { replace: true });
      showErrorMess('Xác thực token thất bại')
    });
  }
  const handleChangeValue = (event, newValue) => {
    setValue(newValue);
    let token=localStorage.getItem("token");
    // console.log('token',token)
    
    axios.get(`/staffs/information?${filter}=${newValue}`,{
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
      }
    })
    .catch((error)=> {
      let{data,status}=error.response
      if(data=='Invalid Token'&&status==401) navigate("/login", { replace: true });
      showErrorMess('Xác thực token thất bại')
    });
    
  };
  const handleChangeFilter=(event)=>{
    setFilter(event.target.value);
    setValue('')
  }
  const handleAddStaff=()=>{
    let {name,address,birthday,phone,account,password,confirmPassword,email,type,gender }=objAddStaff
    name=name.trim()
    address=address.trim()
    birthday=birthday.trim()
    phone=phone.trim()
    account=account.trim()
    password=password.trim()
    confirmPassword=confirmPassword.trim()
    email=email.trim()
    setObjAddStaff({...objAddStaff,name,address,birthday,phone,account,password,confirmPassword,email})
    // console.log({name,address,birthday,phone,account,password,confirmPassword,email})

    let nameErrMess,addressErrMess,birthdayErrMess,phoneErrMess,accountErrMess,passwordErrMess,confirmPasswordErrMess,emailErrMess 
    if(name=='') nameErrMess='Không được bỏ trống'
      else nameErrMess='';      
    if(address=='') addressErrMess='Không được bỏ trống'
      else addressErrMess='';      
    if(birthday=='') birthdayErrMess='Không được bỏ trống'
      else birthdayErrMess='';      
    if(!rePhone.test(phone)) phoneErrMess='Số điện thoại không đúng'
      else phoneErrMess='';      
    if(!reEmail.test(email)) emailErrMess='Email không đúng'
      else emailErrMess='';      
    if(!reAccount.test(account)) accountErrMess='Tài khoản b/đ bằng a-zA-Z, >=6, gồm a-zA-Z0-9'
      else accountErrMess='';      
    if(!rePassword.test(password)) passwordErrMess='Mật khẩu >=8 kí tự, gồm a-Z, A-Z, 0-9'
      else passwordErrMess='';      
    if(confirmPassword!=password) confirmPasswordErrMess='Mật khẩu xác nhận không đúng'
      else confirmPasswordErrMess='';      

    setObjErrMessAddStaff({
      name:nameErrMess,
      address:addressErrMess,
      birthday:birthdayErrMess,
      phone:phoneErrMess,
      account:accountErrMess,
      password:passwordErrMess,
      confirmPassword:confirmPasswordErrMess,
      email:emailErrMess,
    })
    if(addressErrMess!=''||birthdayErrMess!=''||phoneErrMess!=''||nameErrMess!=''||accountErrMess!=''||passwordErrMess!=''||confirmPasswordErrMess!=''||emailErrMess!='') return
    console.log('validate successfully')

    let token=localStorage.getItem("token");
    axios.post(`/staffs`,{name,address,birthday,phone,account,password,email,type,gender},{
      headers: {
        'x-access-token':token,
      }
    })
    .then(res=>{
      let {data,message,type}=res.data
      if(type==FAIL) message.forEach(item=>showErrorMess(item)) 
      else{ 
        getIdentifications()
        showSuccessMess(message[0])
        setOpenAddStaff(false)

      }
    })
    .catch((error)=> {
      let{data,status}=error.response
      if(data=='Invalid Token'&&status==401) navigate("/login", { replace: true });
      showErrorMess('Xác thực token thất bại')
    });
  }
  const handleEditStaff=()=>{
    let {name,address,birthday,phone,email,type,gender,isWork }=objEditStaff
    // console.log(objEditStaff)
    name=name.trim()
    address=address.trim()
    birthday=birthday.trim()
    phone=phone.trim()
    email=email.trim()
    setObjEditStaff({...objEditStaff,name,address,birthday,phone,email})

    let nameErrMess,addressErrMess,birthdayErrMess,phoneErrMess,emailErrMess 
    if(name=='') nameErrMess='Không được bỏ trống'
      else nameErrMess='';      
    if(address=='') addressErrMess='Không được bỏ trống'
      else addressErrMess='';      
    if(birthday=='') birthdayErrMess='Không được bỏ trống'
      else birthdayErrMess='';      
    if(!rePhone.test(phone)) phoneErrMess='Số điện thoại không đúng'
      else phoneErrMess='';      
    if(!reEmail.test(email)) emailErrMess='Email không đúng'
      else emailErrMess='';      
    
      
    setObjErrMessEditStaff({
      name:nameErrMess,
      address:addressErrMess,
      birthday:birthdayErrMess,
      phone:phoneErrMess,
      email:emailErrMess,
    })
    if(addressErrMess!=''||birthdayErrMess!=''||phoneErrMess!=''||nameErrMess!=''||emailErrMess!='') return
    console.log('validate successfully')

    
    let token=localStorage.getItem("token");
    axios.patch(`/staffs/${staff._id}`,{name,address,birthday,phone,email,type,gender,isWork},{
      headers: {
        'x-access-token':token,
      }
    })
    .then(res=>{
      let {data,message,type}=res.data
      // console.log('data',data)
      setStaff(data)
      setOpenEditStaff(false)
      showSuccessMess(message[0])
      getIdentifications()

    })
    .catch((error)=> {
      let{data,status}=error.response
      if(data=='Invalid Token'&&status==401) navigate("/login", { replace: true });
      showErrorMess('Xác thực token thất bại')
    });
    
    
  }
  const clickAddStaff=()=>{
    setObjAddStaff({
      name:'',
      address:'',
      birthday:'',
      phone:'',
      account:'',
      password:'',
      confirmPassword:'',
      email:'',
      type:1,
      gender:'Nam'
    })
    setObjErrMessAddStaff({
      name:'',
      address:'',
      birthday:'',
      phone:'',
      account:'',
      password:'',
      confirmPassword:'',
      email:'',
    })
    setOpenAddStaff(true)
  }
  const clickEditStaff=()=>{
    setObjEditStaff({...staff})
    setObjErrMessEditStaff({
      name:'',
      address:'',
      birthday:'',
      phone:'',
      email:'',
    })
    setOpenEditStaff(true)
  }
  return (
    <div className={styles.wrap}>
      {infoStaffLogin.type==staffType&&
        <Alert severity="error">Chức năng chỉ dành cho Admin!</Alert>
      }
      {infoStaffLogin.type==adminType&&
      <>
        <div className={styles.wrapFilter}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={filter=='phone'?phones:filter=='id'?ids:accounts}
            sx={{ width: '300px',marginRight:'20px' }}
            value={value?value:null}
            renderInput={(params) => <TextField {...params} label='Giá trị' />}//{label={filter=='phone'?'SDT':'ID'}}
            onChange={handleChangeValue}
          />
          <Box sx={{ width:'120px'}}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Tìm kiếm</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select2"
                label="Tìm kiếm"
                value={filter}
                onChange={handleChangeFilter}
              >
                <MenuItem value={'phone'}>SDT</MenuItem>
                <MenuItem value={'id'}>ID</MenuItem>
                <MenuItem value={'account'}>Tài khoản</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button variant="contained" color="success" sx={{marginLeft:'auto' ,width:120,}} onClick={clickAddStaff}  >Thêm  </Button>
        </div>
        {staff._id&&<div className={styles.row}>
          <div className={styles.colLeft}  >
            <StaffDetail staff={staff}/>
          </div>
          <div className={styles.colRight}>
            <Button variant="contained" sx={{marginBottom:'20px',width:120}} onClick={clickEditStaff} >Chỉnh sửa </Button>
          </div>
        </div>}
        <Modal
          open={openAddStaff}
          onClose={()=>setOpenAddStaff(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className={styles.wrapModalAddStaff} >
            <div className={styles.formAddStaff}>
              <div className={styles.title}>Thêm nhân viên</div>
              <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-between'}}>
                
                <TextField sx={{ width:'300px'}} label="Họ tên" variant="outlined" value={objAddStaff.name} margin="normal"  
                  onChange={(event)=>setObjAddStaff({...objAddStaff,name:event.target.value})}
                  error={Boolean(objErrMessAddStaff.name)}
                  helperText={objErrMessAddStaff.name}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={['Nam','Nữ']}
                  sx={{ width: 300 }}
                  value={'Nam'}
                  onChange={(event, newValue) => {
                    setObjAddStaff({...objAddStaff,gender:newValue})
                  }}
                  renderInput={(params) => <TextField {...params} label="Giới tính" margin="normal"  />}
                />
                <TextField sx={{ width:'300px'}} label="SĐT" variant="outlined" value={objAddStaff.phone} margin="normal"  
                  onChange={(event)=>setObjAddStaff({...objAddStaff,phone:event.target.value})}
                  error={Boolean(objErrMessAddStaff.phone)}
                  helperText={objErrMessAddStaff.phone}
                />
                <LocalizationProvider dateAdapter={DateAdapter }>
                  <DatePicker
                    label="Ngày sinh"
                    value={objAddStaff.birthday?objAddStaff.birthday:null}
                    onChange={(newValue) => {
                      // console.log('newValue',newValue)
                      if(newValue!='Invalid Date')setObjAddStaff({...objAddStaff,birthday:DatetimeToYMD(newValue)})
                      else setObjAddStaff({...objAddStaff,birthday:''})
                    }}
                    renderInput={(params) => <TextField {...params} sx={{ width:'300px'}}  margin="normal" 
                      error={Boolean(objErrMessAddStaff.birthday)}
                      helperText={objErrMessAddStaff.birthday}
                    />}
                  />
                </LocalizationProvider>
                <TextField sx={{ width:'300px'}} label="Địa chỉ" variant="outlined" value={objAddStaff.address}  margin="normal" 
                  onChange={(event)=>setObjAddStaff({...objAddStaff,address:event.target.value})}
                  error={Boolean(objErrMessAddStaff.address)}
                  helperText={objErrMessAddStaff.address}
                />
                <TextField sx={{ width:'300px'}} label="Email" variant="outlined" value={objAddStaff.email}  margin="normal" 
                  onChange={(event)=>setObjAddStaff({...objAddStaff,email:event.target.value})}
                  error={Boolean(objErrMessAddStaff.email)}
                  helperText={objErrMessAddStaff.email}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={['Nhân viên','Admin']}
                  sx={{ width: 300 }}
                  value={objAddStaff.type==1?'Nhân viên':'Admin'}
                  onChange={(event, newValue) => {
                    let type=newValue=='Nhân viên'?1:2
                    setObjAddStaff({...objAddStaff,type})
                  }}
                  renderInput={(params) => <TextField {...params} label="Loại" margin="normal" />}
                />
                <TextField sx={{ width:'300px'}} label="Tài khoản" variant="outlined" value={objAddStaff.account} margin="normal" 
                  onChange={(event)=>setObjAddStaff({...objAddStaff,account:event.target.value})}
                  error={Boolean(objErrMessAddStaff.account)}
                  helperText={objErrMessAddStaff.account}
                />
                <TextField sx={{ width:'300px'}} label="Mật khẩu" type='password' variant="outlined" value={objAddStaff.password} margin="normal" 
                  onChange={(event)=>setObjAddStaff({...objAddStaff,password:event.target.value})}
                  error={Boolean(objErrMessAddStaff.password)}
                  helperText={objErrMessAddStaff.password}
                />
                <TextField sx={{ width:'300px'}} label="Xác nhận mật khẩu" type='password' variant="outlined" value={objAddStaff.confirmPassword} margin="normal" 
                  onChange={(event)=>setObjAddStaff({...objAddStaff,confirmPassword:event.target.value})}
                  error={Boolean(objErrMessAddStaff.confirmPassword)}
                  helperText={objErrMessAddStaff.confirmPassword}
                />
              </div>
              <div style={{display:'flex',justifyContent:'end',marginTop:'20px'}}>
                <Button variant="text" sx={{width:100}} onClick={()=>setOpenAddStaff(false)} >Hủy</Button>
                <Button variant="contained"  sx={{width:100,marginLeft:'20px'}} onClick={handleAddStaff}>Thêm</Button>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          open={openEditStaff}
          onClose={()=>setOpenEditStaff(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className={styles.wrapModalAddStaff} >
            <div className={styles.formAddStaff}>
              <div className={styles.title}>Chỉnh sửa nhân viên</div>
              <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-between'}}>
                <TextField sx={{ width:'300px'}} label="ID" variant="outlined" value={objEditStaff._id} margin="normal"  
                  InputProps={{readOnly: true}}
                />
                <TextField sx={{ width:'300px'}} label="Tài khoản" variant="outlined" value={objEditStaff.account} margin="normal" 
                  InputProps={{readOnly: true}}
                /> 
                <TextField sx={{ width:'300px'}} label="Họ tên" variant="outlined" value={objEditStaff.name} margin="normal"  
                  onChange={(event)=>setObjEditStaff({...objEditStaff,name:event.target.value})}
                  error={Boolean(objErrMessEditStaff.name)}
                  helperText={objErrMessEditStaff.name}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={['Nam','Nữ']}
                  sx={{ width: 300 }}
                  value={objEditStaff.gender}
                  onChange={(event, newValue) => {
                    setObjEditStaff({...objEditStaff,gender:newValue})
                  }}
                  renderInput={(params) => <TextField {...params} label="Giới tính" margin="normal"  />}
                />
                <TextField sx={{ width:'300px'}} label="SĐT" variant="outlined" value={objEditStaff.phone} margin="normal"  
                  onChange={(event)=>setObjEditStaff({...objEditStaff,phone:event.target.value})}
                  error={Boolean(objErrMessEditStaff.phone)}
                  helperText={objErrMessEditStaff.phone}
                />
                <LocalizationProvider dateAdapter={DateAdapter }>
                  <DatePicker
                    label="Ngày sinh"
                    value={objEditStaff.birthday?objEditStaff.birthday:null}
                    onChange={(newValue) => {
                      // console.log('newValue',newValue)
                      if(newValue!='Invalid Date')setObjEditStaff({...objEditStaff,birthday:DatetimeToYMD(newValue)})
                      else setObjEditStaff({...objEditStaff,birthday:''})
                    }}
                    renderInput={(params) => <TextField {...params} sx={{ width:'300px'}}  margin="normal" 
                      error={Boolean(objErrMessEditStaff.birthday)}
                      helperText={objErrMessEditStaff.birthday}
                    />}
                  />
                </LocalizationProvider>
                <TextField sx={{ width:'300px'}} label="Địa chỉ" variant="outlined" value={objEditStaff.address}  margin="normal" 
                  onChange={(event)=>setObjEditStaff({...objEditStaff,address:event.target.value})}
                  error={Boolean(objErrMessEditStaff.address)}
                  helperText={objErrMessEditStaff.address}
                />
                <TextField sx={{ width:'300px'}} label="Email" variant="outlined" value={objEditStaff.email}  margin="normal" 
                  onChange={(event)=>setObjEditStaff({...objEditStaff,email:event.target.value})}
                  error={Boolean(objErrMessEditStaff.email)}
                  helperText={objErrMessEditStaff.email}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={['Nhân viên','Admin']}
                  sx={{ width: 300 }}
                  value={objEditStaff.type==1?'Nhân viên':'Admin'}
                  onChange={(event, newValue) => {
                    let type=newValue=='Nhân viên'?1:2
                    setObjEditStaff({...objEditStaff,type})
                  }}
                  renderInput={(params) => <TextField {...params} label="Loại" margin="normal" />}
                />
                <Autocomplete
                  disablePortal
                  
                  options={['Đang làm việc','Đã nghĩ việc']}
                  sx={{ width: 300 }}
                  value={objEditStaff.isWork?'Đang làm việc':'Đã nghĩ việc'}
                  onChange={(event, newValue) => {
                    let isWork=newValue=='Đang làm việc'?true:false
                    setObjEditStaff({...objEditStaff,isWork})
                  }}
                  renderInput={(params) => <TextField {...params} label="Tình trạng" margin="normal" />}
                />
                
              </div>
              <div style={{display:'flex',justifyContent:'end',marginTop:'20px'}}>
                <Button variant="text" sx={{width:100}} onClick={()=>setOpenEditStaff(false)} >Hủy</Button>
                <Button variant="contained"  sx={{marginLeft:'20px'}} onClick={handleEditStaff}>Chỉnh sửa</Button>
              </div>
            </div>
          </div>
        </Modal>
      </>
      }
    </div>
  );
}

export default Staff;
