import {useEffect } from 'react'
import clsx from 'clsx';

import { DataGrid } from '@mui/x-data-grid';
import NumberFormat from 'react-number-format';

import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import styles from './index.module.scss'
import {YMDTHMtoHMDMY} from '../../lib/myLib'
function BillDetail({bill}) {
  //console.log('bill',bill)
  let createTypeBill=()=>{
    if(bill.type==0) return (
      <div className={clsx(styles.badge,styles.danger)}>
        <CancelOutlinedIcon/>
        <div style={{marginLeft:6}} >Đã hủy</div>
      </div>
    )
    if(bill.type==1) return (
      <div className={clsx(styles.badge,styles.info)}>
        <InfoOutlinedIcon/>
        <div style={{marginLeft:6}} >Đang chờ xác nhận</div>
      </div>
    )
    if(bill.type==2) return (
      <div className={clsx(styles.badge,styles.primary)}>
        <LocalShippingOutlinedIcon/>
        <div style={{marginLeft:6}} >Đang giao</div>
      </div>
    )
    if(bill.type==3) return (
      <div className={clsx(styles.badge,styles.success)}>
        <CheckCircleOutlinedIcon/>
        <div style={{marginLeft:6}} >Đã giao</div>
      </div>
    )
  }
  return (
    <div className={styles.wrap}>  
      <div className={styles.row} style={{textAlign:'center',marginBottom:'20px'}}>
        <span className={styles.label} style={{minWidth:0,marginRight:10}}> Mã HĐ: </span>
        <span className={styles.content}>{bill._id}</span> 
      </div>
      {createTypeBill()}
      <div className={styles.row}>
        <span className={styles.label}> Khách hàng: </span>
        <span className={styles.content}> {bill.customer.name} </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}> Mã khách hàng: </span>
        <span className={styles.content}> {bill.customer._id} </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}> SDT: </span>
        <span className={styles.content}> {bill.customer.phone} </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}> Thời gian: </span>
        <span className={styles.content}> {YMDTHMtoHMDMY(bill.createdAt)} </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}> Địa chỉ: </span>
        <span className={styles.content}> {bill.address} </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}> NV nhận đơn: </span>
        <span className={styles.content}> {bill.staff?bill.staff.account:''} </span>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th >Tên sản phẩm</th>
            <th>Đơn giá (vnd/sp)</th>
            <th>Số Lượng</th>
            <th>Tổng tiền (vnd/sp)</th>
          </tr>
        </thead>
        <tbody>
          {bill.products.map((item,i)=>
            <tr key={i}>
              <td style={{display:'flex',alignItems:'center'}}>
                <img src={item.product.image} width='80' height='80'/>
                {item.product.name}
              </td>
              <td>
                <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} />
              </td>
              <td>{item.quantity}</td>
              <td>
                <NumberFormat value={item.quantity*item.price} displayType={'text'} thousandSeparator={true} />
              </td>
            </tr>
          )}
        </tbody>
      </table>   
      <div className={styles.row} style={{textAlign:'right',marginTop:'20px'}}>
        <span className={styles.label} style={{marginRight:10}}>Tổng hóa đơn: </span>
        <span className={styles.content} style={{color:'blue'}}>
          <NumberFormat value={bill.total} displayType={'text'} thousandSeparator={true} />
        </span> 
      </div>
    </div>
  );
}

export default BillDetail;
