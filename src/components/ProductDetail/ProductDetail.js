import {useEffect } from 'react'
import clsx from 'clsx';

import { DataGrid } from '@mui/x-data-grid';
import NumberFormat from 'react-number-format';

import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import styles from './index.module.scss'
import {YMDTHMtoHMDMY,YMDTHMtoDMY} from '../../lib/myLib'
function ProductDetail({product}) {
  // console.log('staff',staff)
  let {_id,name,brand,battery,card,cpu,hardDrive,image,operatingSystem,price,ram,screen,description}=product
  return (
    <div className={styles.wrap}>  
      <div className={styles.title}>Chi tiết sản phẩm</div>
      <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-between'}}>
        <TextField sx={{ width:'300px'}} label="ID" variant="outlined" value={_id} margin="normal"  InputProps={{readOnly: true}}/>
        <TextField sx={{ width:'300px'}} label="Tên" variant="outlined" value={name} margin="normal"  InputProps={{readOnly: true}}/>
        <TextField sx={{ width:'300px'}} label="Thương hiệu" variant="outlined" value={brand.name} margin="normal"  InputProps={{readOnly: true}}/>
        <TextField sx={{ width:'300px'}} label="CPU" variant="outlined" value={cpu} margin="normal"  InputProps={{readOnly: true}}/>
        <TextField sx={{ width:'300px'}} label="RAM" variant="outlined" value={ram} margin="normal"  InputProps={{readOnly: true}}/>
        <TextField sx={{ width:'300px'}} label="Card" variant="outlined" value={card} margin="normal"  InputProps={{readOnly: true}}/>
        <TextField sx={{ width:'300px'}} label="Ổ cứng" variant="outlined" value={hardDrive}  margin="normal" InputProps={{readOnly: true}}/>
        <TextField sx={{ width:'300px'}} label="Hệ điều hành" variant="outlined" value={operatingSystem}  margin="normal" InputProps={{readOnly: true}}/>
        <TextField sx={{ width:'300px'}} label="Màn hình" variant="outlined" value={screen}  margin="normal" InputProps={{readOnly: true}}/>
        <TextField sx={{ width:'300px'}} label="Pin" variant="outlined" value={battery}  margin="normal" InputProps={{readOnly: true}}/>
        <TextField sx={{ width:'300px'}} label="Giá tiền" variant="outlined" value={price}  margin="normal" InputProps={{readOnly: true}}/>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',marginTop:10}}>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={3}
          placeholder="Minimum 3 rows"
          style={{ flex:1}}
          minRows={10}
          maxRows={10}
          value={description}
          InputProps={{readOnly: true}}
          className={styles.borderCustom}
        />
        {/* <textarea value={description} className={styles.borderCustom} /> */}
        <img src={image} height='156' width='156' className={styles.borderCustom} style={{marginLeft:20}}/>

      </div>
    </div>
  );
}

export default ProductDetail;
