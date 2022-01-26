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

function Product() {
  const dispatch = useDispatch()
  let navigate = useNavigate();

  const [bottomNavigation, setBottomNavigation] = useState(0);


  useEffect(()=>{
    dispatch(change('SẢN PHẨM'))
  },[])
  useEffect(()=>{
   
  },[bottomNavigation])

  // const handleNavigation=()=>{
  //   if(bottomNavigation==0){
  //     let token=localStorage.getItem("token");
  //     axios.get(`/brands`,{
  //       headers: {
  //         'x-access-token':token,
  //       }
  //     })
  //     .then(res=>{
  //       let {data,message,type}=res.data
  //       if(type==FAIL) showErrorMess(message[0])
  //       else{ 
  //         console.log(data)
  //         data.forEach(item=>item.id=item._id)
  //         setListBrand(data)
  //       }
  //     })
  //     .catch((error)=> {
  //       console.log({error})
  //       let{data,status}=error.response
  //       if(data=='Invalid Token'&&status==401) navigate("/login", { replace: true });
  //       showErrorMess('Xác thực token thất bại')
  //     });
  //   }
  // }




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
      </div>
    </div>
  );
}

export default Product;
