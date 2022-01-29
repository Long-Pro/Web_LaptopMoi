import { useSelector, useDispatch } from 'react-redux'
import {useEffect ,useState} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';


import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { DataGrid } from '@mui/x-data-grid';


import {change } from '../../store/slice/title'


import styles from './index.module.scss'
import {SUCCESS,FAIL} from '../../config'
import {showErrorMess,showSuccessMess} from '../../lib/util'
import {YMDTHMtoDMY,YMDTHMtoHMDMY} from '../../lib/myLib'
import BrandDataGrid from '../../components/BrandDataGrid/BrandDataGrid';
import ProductDataGrid from '../../components/ProductDataGrid/ProductDataGrid';

function Product() {
  const dispatch = useDispatch()
  let navigate = useNavigate();

  const [bottomNavigation, setBottomNavigation] = useState(0);


  useEffect(()=>{
    dispatch(change('SẢN PHẨM'))
  },[])
  useEffect(()=>{
   
  },[bottomNavigation])
  return (
    <div className={styles.wrap}>
      <div className={styles.wrapFilter}>
        <BottomNavigation
          showLabels
          value={bottomNavigation}
          onChange={(event, newValue) => {
            console.log(newValue)
            setBottomNavigation(newValue);
          }}
          sx={{
            flex:'1'
          }}
        >
          <BottomNavigationAction label="Thương hiệu" icon={<ApartmentOutlinedIcon />} />
          <BottomNavigationAction label="Sản phẩm" icon={<CategoryOutlinedIcon />} />
        </BottomNavigation>
      </div>
      <div className={styles.row}>
        {bottomNavigation==0&&
          <div className={styles.wrapBrand}>
            <BrandDataGrid />
          </div>
        }
        {bottomNavigation==1&&
          <div className={styles.wrapBrand}>
            <ProductDataGrid />
          </div>
        }
      </div>
    </div>
  );
}

export default Product;
