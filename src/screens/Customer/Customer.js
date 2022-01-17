import { useSelector, useDispatch } from 'react-redux'
import {useEffect,useState } from 'react'
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
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';

import { ToastContainer, toast } from 'react-toastify';

import {change } from '../../store/slice/title'
import styles from './index.module.scss'
import {SUCCESS,FAIL} from '../../config'
import {showErrorMess} from '../../lib/util'
import {YMDTHMtoDMY,YMDTHMtoHMDMY} from '../../lib/myLib'



function Customer() {
  const dispatch = useDispatch()

  const [info, setInfo] = useState({});
  const [bills, setBills] = useState([]);

  const [value, setValue] = useState('');
  const [phones, setPhones] = useState([]);
  const [ids, setIds] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [filter, setFilter] = useState('phone');



  useEffect(()=>{
    dispatch(change('KHÁCH HÀNG'))

    let token=localStorage.getItem("token");
    // console.log('token',token)
    axios.get('/customers/identifications',{
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
      console.log(error);
    });
  },[])
  const handleChangeValue = (event, newValue) => {
    setValue(newValue);
    let token=localStorage.getItem("token");
    // console.log('token',token)
    
    axios.get(`/customers/information?${filter}=${newValue}`,{
      headers: {
        'x-access-token':token,
      }
    })
    .then(res=>{
      let {data:{data,message,type}}=res
      if(type==FAIL) showErrorMess(message[0])
      else{ 
        // console.log(data)
        setInfo(data)
        axios.get(`/bills/customer/${data._id}`,{
          headers: {
            'x-access-token':token,
          }
        })
        .then(res=>{
          let {data:{data,message,type}}=res
          // console.log(data)
          data.forEach(item=>{
            let totalBill=item.products.reduce((a,b)=>a+b.price*b.quantity,0)
            item.totalBill=totalBill
            item.id=item._id
          })
          // console.log(data)
          setBills(data)

        })
        .catch(err=>console.log(err))
      }
    })
    .catch((error)=> {
      console.log(error);
    });
    
  };
  const handleChangeFilter=(event)=>{
    setFilter(event.target.value);
    setValue('')
  }
  const columns = [
    { field: 'id', headerName: 'Mã hóa đơn',flex: 1,},
    { field: 'createdAt', headerName: 'Thời gian',width: 140,
      valueFormatter: (params) => {
        return YMDTHMtoHMDMY(params.value)
      },
    },
    { field: 'totalBill', headerName: 'Tổng hóa đơn',width: 120,align: "center",
      renderCell: (params) =>{
        return <span className={styles.infoBill} style={{color:'blue'}} >
          <NumberFormat value={params.value} displayType={'text'} thousandSeparator={true} />
        </span>
      },
    },
    { field: 'staff', headerName: 'Nhân viên thực hiện',width: 160,
      valueFormatter: (params) => {
        return params.value?params.value.account:''
      },
    },
    { field: 'type', headerName: 'Trạng thái',flex: 1,align: "center",
      renderCell: (params) =>{

        let {value}=params
        let text= value==0?'Đã hủy':value==1?'Đang chờ xác nhận':value==2?'Đang giao':'Thành công'
        let c=value==0?styles.danger:value==1?styles.info:value==2?styles.primary:styles.success
        return (
          <div className={clsx(styles.badge, c)}>
            {text}
          </div>
      )
      }
    },
  ]

  return (
    <div className={styles.wrap}>
      <div className={styles.wrapFilter}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={filter=='phone'?phones:filter=='id'?ids:accounts}
          sx={{ width: '290px',marginRight:'20px' }}
          value={value}
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
      </div>
      <div className={styles.row}>
        {info._id&&<div className={styles.colLeft}>
          <div className={styles.title}>Thông tin khách hàng</div>
          <TextField sx={{ width:'250px'}}  label="ID" variant="outlined" value={info._id} margin="normal"  InputProps={{readOnly: true}}/>
          <TextField sx={{ width:'250px'}} label="Tài khoản" variant="outlined" value={info.account} margin="normal"  InputProps={{readOnly: true}}/>
          <TextField sx={{ width:'250px'}} label="Họ tên" variant="outlined" value={info.name} margin="normal"  InputProps={{readOnly: true}}/>
          <TextField sx={{ width:'250px'}} label="SĐT" variant="outlined" value={info.phone} margin="normal"  InputProps={{readOnly: true}}/>
          <TextField sx={{ width:'250px'}} label="Ngày sinh" variant="outlined" value={YMDTHMtoDMY(info.birthday)} margin="normal"  InputProps={{readOnly: true}}/>
          <TextField sx={{ width:'250px'}} label="Địa chỉ" variant="outlined" value={info.address}  margin="normal" InputProps={{readOnly: true}}/>
        </div>}
        <div className={styles.colRight}>
          <div className={styles.title} style={{marginBottom:36}}>Lịch sử mua hàng</div>
          <DataGrid
            rows={bills.length?bills:[]}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
          {/* <div className={styles.bill}>
            <div style={{marginRight:20}}>
              <div>
                <span className={styles.labelBill} >Mã đơn hàng:</span> 
                <span className={styles.infoBill} >619f4152ff1891c047090e35</span>
              </div>
              <div>
                <span className={styles.labelBill} >Tổng tiền:</span> 
                <span className={styles.infoBill} style={{color:'blue'}} >
                  <NumberFormat value={2456981} displayType={'text'} thousandSeparator={true} suffix={' vnd'} />
                </span>
              </div>
            </div>
            <div style={{marginRight:20}}>
              <div>
                <span className={styles.labelBill} >Thời gian:</span> 
                <span className={styles.infoBill} >16:35 16/08/2000 </span>
              </div>
              <div>
                <span className={styles.labelBill} >NV thực hiện:</span> 
                <span className={styles.infoBill} >staff1 </span>
              </div>
            </div>
            <div className={styles.wrapBadge}>
              <div className={styles.badge}>
                Đang chờ xử lý
              </div>
            </div>
          </div> */}

          
        </div>
      </div>
    </div>
  );
}

export default Customer;
