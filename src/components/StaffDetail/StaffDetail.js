import {useEffect } from 'react'
import clsx from 'clsx';

import { DataGrid } from '@mui/x-data-grid';
import NumberFormat from 'react-number-format';

import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import TextField from '@mui/material/TextField';

import styles from './index.module.scss'
import {YMDTHMtoHMDMY,YMDTHMtoDMY} from '../../lib/myLib'
function StaffDetail({staff}) {
  // console.log('staff',staff)
  let {_id,name,phone,birthday,address,email,account,type,isWork,gender}=staff
  return (
    <div className={styles.wrap}>  
      <div className={styles.title}>Thông tin nhân viên</div>
      <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-between'}}>
        <TextField sx={{ width:'300px'}} label="ID" variant="outlined" value={_id} margin="normal"  InputProps={{readOnly: true}}/>
        <TextField sx={{ width:'300px'}} label="Tài khoản" variant="outlined" value={account} margin="normal"  InputProps={{readOnly: true}}/>
        <TextField sx={{ width:'300px'}} label="Họ tên" variant="outlined" value={name} margin="normal"  InputProps={{readOnly: true}}/>
        <TextField sx={{ width:'300px'}} label="Giới tính" variant="outlined" value={gender} margin="normal"  InputProps={{readOnly: true}}/>
        <TextField sx={{ width:'300px'}} label="SĐT" variant="outlined" value={phone} margin="normal"  InputProps={{readOnly: true}}/>
        <TextField sx={{ width:'300px'}} label="Ngày sinh" variant="outlined" value={YMDTHMtoDMY(birthday)} margin="normal"  InputProps={{readOnly: true}}/>
        <TextField sx={{ width:'300px'}} label="Địa chỉ" variant="outlined" value={address}  margin="normal" InputProps={{readOnly: true}}/>
        <TextField sx={{ width:'300px'}} label="Email" variant="outlined" value={email}  margin="normal" InputProps={{readOnly: true}}/>
        <TextField sx={{ width:'300px'}} label="Loại" variant="outlined" value={type==1?'Nhân viên':'Admin'}  margin="normal" InputProps={{readOnly: true}}/>
        <TextField sx={{ width:'300px'}} label="Trình trạng" variant="outlined" value={isWork?'Đang làm việc':'Đã nghĩ việc'}  margin="normal" InputProps={{readOnly: true}}/>
      </div>
    </div>
  );
}

export default StaffDetail;
