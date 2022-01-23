import { useSelector, useDispatch } from 'react-redux'
import React,{useEffect,useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import NumberFormat from 'react-number-format';
import clsx from 'clsx';
import { ToastContainer, toast } from 'react-toastify';
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



  useEffect(()=>{
    dispatch(change('SẢN PHẨM'))
    let token=localStorage.getItem("token");
    // console.log('token',token)
    axios.get('/bills/ids',{
      headers: {
        'x-access-token':token,
      }
    })
    .then(res=>{
      let {data:{data,message,type}}=res
      if(type==FAIL) showErrorMess(message[0])
      else{ 
        console.log(data)
        setIds(data.ids)
      }
    })
    .catch((error)=> {
      let{data,status}=error.response
      if(data=='Invalid Token'&&status==401) navigate("/login", { replace: true });
      showErrorMess('Xác thực token thất bại')
    });
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
        console.log(data)
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
      <ToastContainer/>
    </div>
  );
}

export default Bill;
