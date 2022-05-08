import { useSelector, useDispatch } from 'react-redux'
import React,{useEffect,useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import NumberFormat from 'react-number-format';
import clsx from 'clsx';
import Pdf from "react-to-pdf";



import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import FunctionsIcon from '@mui/icons-material/Functions';
import BottomNavigation from '@mui/material/BottomNavigation';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';



import {change } from '../../store/slice/title'
import styles from './index.module.scss'
import {SUCCESS,FAIL} from '../../config'
import {showErrorMess,showSuccessMess} from '../../lib/util'
import {YMDTHMtoDMY,YMDTHMtoHMDMY} from '../../lib/myLib'
import BillDetail from '../../components/BillDetail/BillDetail';

const ref = React.createRef();
function Bill() {
  const dispatch = useDispatch()
  let navigate = useNavigate();

  // const [value, setValue] = useState('');
  const [ids, setIds] = useState([]);
  const [id, setId] = useState('');
  const [bill, setBill] = useState({});
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState('transport');// transport success  cancel
  const [bottomNavigation, setBottomNavigation] = useState(0);



  useEffect(()=>{
    dispatch(change('HÓA ĐƠN'))
    getListBillId(bottomNavigation)
  },[])
  const handleChangeValue = (event, newValue) => {
    setId(newValue);
    console.log(newValue)
    let token=localStorage.getItem("token");
    // console.log('token',token)
    
    axios.get(`/bills/id/${newValue}`,{
      headers: {
        'x-access-token':token,
      }
    })
    .then(res=>{
      let {data:{data,message,type}}=res
      if(type==FAIL) showErrorMess(message[0])
      else{ 
        // console.log(data)
        let total=data.products.reduce((a,b)=>a+b.price*b.quantity,0)
        data.total=total
        setBill(data)   
      }
    })
    .catch((error)=> {
      console.log({error})
      let{data,status}=error.response
      if(data=='Invalid Token'&&status==401) navigate("/login", { replace: true });
      showErrorMess('Xác thực token thất bại')
    });
    
  };
  const handleConfirm=()=>{
    let token=localStorage.getItem("token");
    let typeBill=action=='transport'?2:action=='success'?3:0
    axios.patch(`/bills/id`,{id:bill._id,type:typeBill},{
      headers: {
        'x-access-token':token,
      }
    })
    .then(res=>{
      let {data:{data,message,type}}=res
      if(type==FAIL) showErrorMess(message[0])
      else{ 
        setBill({...bill,type:typeBill})   
        setOpen(false)
        let mess=action=='transport'?'Đơn hàng đang vận chuyển':action=='success'?'Đơn hàng đã giao':'Đơn hàng đã hủy'
        showSuccessMess(mess)
      }
    })
    .catch((error)=> {
      let{data,status}=error.response
      if(data=='Invalid Token'&&status==401) navigate("/login", { replace: true });
      showErrorMess('Xác thực token thất bại')
    });
  }
  const getListBillId=(bottomNavigation)=>{// 0-tatCa   1-cho  2-giao   3-daGiao   4-hủy  
    let link='/bills/ids'//:`/bills/ids/type/${bottomNavigation-1}`
    if(bottomNavigation==1) link='/bills/ids/type/1'
    if(bottomNavigation==2) link='/bills/ids/type/2'
    if(bottomNavigation==3) link='/bills/ids/type/3'
    if(bottomNavigation==4) link='/bills/ids/type/0'



    let token=localStorage.getItem("token");
    axios.get(link,{
      headers: {
        'x-access-token':token,
      }
    })
    .then(res=>{
      let {data:{data,message,type}}=res
      if(type==FAIL) showErrorMess(message[0])
      else{ 
        // console.log(data)
        setIds(data.ids)
      }
    })
    .catch((error)=> {
      let{data,status}=error.response
      if(data=='Invalid Token'&&status==401) navigate("/login", { replace: true });
      showErrorMess('Xác thực token thất bại')
    });
  }


  return (
    <div className={styles.wrap}>
      <div className={styles.wrapFilter}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={ids}
          sx={{ width: '320px'}}
          renderInput={(params) => <TextField {...params} label='Mã hóa đơn' />}
          onChange={handleChangeValue}
        />
        <BottomNavigation
          showLabels
          value={bottomNavigation}
          onChange={(event, newValue) => {
            // console.log(newValue)
            setBottomNavigation(newValue);
            getListBillId(newValue)
          }}
          sx={{
            flex:'1'
          }}
        >
          <BottomNavigationAction label="Tất cả" icon={<FunctionsIcon />} />
          <BottomNavigationAction label="Đang chờ" icon={<InfoOutlinedIcon />} />
          <BottomNavigationAction label="Đang giao" icon={<LocalShippingOutlinedIcon />} />
          <BottomNavigationAction label="Đã giao" icon={<CheckCircleOutlinedIcon />} />
          <BottomNavigationAction label="Đã hủy" icon={<CancelOutlinedIcon />} />
        </BottomNavigation>
      </div>
      {bill._id&&<div className={styles.row}>
        <div className={styles.colLeft}  ref={ref}>
          <BillDetail bill={bill} />
        </div>
        <div className={styles.colRight}>
          <Button variant="contained" sx={{marginBottom:'20px',width:120}}  >In </Button>
          <Pdf targetRef={ref} filename="code-example.pdf"  scale={0.9}>
            {({ toPdf }) =><Button variant="contained" sx={{marginBottom:'20px',width:120}} onClick={toPdf} >Xuất file </Button>}
          </Pdf>
     
          {bill.type==1&&<>
            <Divider   sx={{width:'100%'}} />
            <Button variant="contained" fullWidth color="success" sx={{marginTop:'20px'}}
              onClick={()=>{setAction('transport');setOpen(true)}}
            >
              Xác nhận hóa đơn
            </Button>
            <Button variant="contained" fullWidth color="error" sx={{marginTop:'20px'}}
              onClick={()=>{setAction('cancel');setOpen(true)}}
            >
              Hủy đơn hàng
            </Button>
          </>}
          {bill.type==2&&<>
            <Divider   sx={{width:'100%'}} />
            <Button variant="contained" fullWidth color="success" sx={{marginTop:'20px'}}
              onClick={()=>{setAction('success');setOpen(true)}}
            >
              Xác nhận đã giao 
            </Button>
            <Button variant="contained" fullWidth color="error" sx={{marginTop:'20px'}}
              onClick={()=>{setAction('cancel');setOpen(true)}}
            >
              Hủy đơn hàng
            </Button>
          </>}
        </div>
      </div>}
      <Dialog
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle id="alert-dialog-title">
          Xác nhận
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div style={{minWidth:400}}>
            {action=='transport'?'Đơn hàng đã xác nhận và đang được vận chuyển?':action=='success'?'Đơn hàng đã giao?':'Hủy đơn hàng?'}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Hủy</Button>
          <Button onClick={handleConfirm} autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default Bill;
