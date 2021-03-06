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
    dispatch(change('H??A ????N'))
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
      showErrorMess('X??c th???c token th???t b???i')
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
        let mess=action=='transport'?'????n h??ng ??ang v???n chuy???n':action=='success'?'????n h??ng ???? giao':'????n h??ng ???? h???y'
        showSuccessMess(mess)
      }
    })
    .catch((error)=> {
      let{data,status}=error.response
      if(data=='Invalid Token'&&status==401) navigate("/login", { replace: true });
      showErrorMess('X??c th???c token th???t b???i')
    });
  }
  const getListBillId=(bottomNavigation)=>{// 0-tatCa   1-cho  2-giao   3-daGiao   4-h???y  
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
      showErrorMess('X??c th???c token th???t b???i')
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
          renderInput={(params) => <TextField {...params} label='M?? h??a ????n' />}
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
          <BottomNavigationAction label="T???t c???" icon={<FunctionsIcon />} />
          <BottomNavigationAction label="??ang ch???" icon={<InfoOutlinedIcon />} />
          <BottomNavigationAction label="??ang giao" icon={<LocalShippingOutlinedIcon />} />
          <BottomNavigationAction label="???? giao" icon={<CheckCircleOutlinedIcon />} />
          <BottomNavigationAction label="???? h???y" icon={<CancelOutlinedIcon />} />
        </BottomNavigation>
      </div>
      {bill._id&&<div className={styles.row}>
        <div className={styles.colLeft}  ref={ref}>
          <BillDetail bill={bill} />
        </div>
        <div className={styles.colRight}>
          <Button variant="contained" sx={{marginBottom:'20px',width:120}}  >In </Button>
          <Pdf targetRef={ref} filename="code-example.pdf"  scale={0.9}>
            {({ toPdf }) =><Button variant="contained" sx={{marginBottom:'20px',width:120}} onClick={toPdf} >Xu???t file </Button>}
          </Pdf>
     
          {bill.type==1&&<>
            <Divider   sx={{width:'100%'}} />
            <Button variant="contained" fullWidth color="success" sx={{marginTop:'20px'}}
              onClick={()=>{setAction('transport');setOpen(true)}}
            >
              X??c nh???n h??a ????n
            </Button>
            <Button variant="contained" fullWidth color="error" sx={{marginTop:'20px'}}
              onClick={()=>{setAction('cancel');setOpen(true)}}
            >
              H???y ????n h??ng
            </Button>
          </>}
          {bill.type==2&&<>
            <Divider   sx={{width:'100%'}} />
            <Button variant="contained" fullWidth color="success" sx={{marginTop:'20px'}}
              onClick={()=>{setAction('success');setOpen(true)}}
            >
              X??c nh???n ???? giao 
            </Button>
            <Button variant="contained" fullWidth color="error" sx={{marginTop:'20px'}}
              onClick={()=>{setAction('cancel');setOpen(true)}}
            >
              H???y ????n h??ng
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
          X??c nh???n
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div style={{minWidth:400}}>
            {action=='transport'?'????n h??ng ???? x??c nh???n v?? ??ang ???????c v???n chuy???n?':action=='success'?'????n h??ng ???? giao?':'H???y ????n h??ng?'}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>H???y</Button>
          <Button onClick={handleConfirm} autoFocus>
            X??c nh???n
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default Bill;
