import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';

import { Link,NavLink } from "react-router-dom";
import clsx from 'clsx';

import logo from '../../assets/image/logo.png'
import styles from './index.module.scss'

// console.log(styles)
function Menu() {
  return (
    <div className={styles.wrap}>
      <div className={styles.wrapLogo}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
      <div style={{height:30}}></div>
      {/* <NavLink className={({ isActive }) =>clsx(styles.item,isActive&&styles.active)} to="/">
        <DashboardOutlinedIcon sx={{ color: "#fff" }} />
        <div className={styles.text}>
          TỔNG QUAN
        </div>
      </NavLink> */}
      <NavLink className={({ isActive }) =>clsx(styles.item,isActive&&styles.active)} to="/customer">
        <PeopleOutlinedIcon sx={{ color: "#fff" }} />
        <div  className={styles.text} >
          KHÁCH HÀNG
        </div>
      </NavLink>
      <NavLink className={({ isActive }) =>clsx(styles.item,isActive&&styles.active)} to="/bill">
        <DescriptionOutlinedIcon sx={{ color: "#fff" }} />
        <div className={styles.text}>
          HÓA ĐƠN
        </div>
      </NavLink>
      <NavLink className={({ isActive }) =>clsx(styles.item,isActive&&styles.active)} to="/staff">
        <AdminPanelSettingsOutlinedIcon sx={{ color: "#fff" }} />
        <div className={styles.text}>
          NHÂN VIÊN
        </div>
      </NavLink>
      <NavLink className={({ isActive }) =>clsx(styles.item,isActive&&styles.active)} to="/product">
        <CategoryOutlinedIcon sx={{ color: "#fff" }} />
        <div className={styles.text}>
          SẢN PHẨM
        </div>
      </NavLink>
      <NavLink className={({ isActive }) =>clsx(styles.item,isActive&&styles.active)} to="/statistic">
        <EqualizerOutlinedIcon sx={{ color: "#fff" }} />
        <div className={styles.text}>
          THỐNG KÊ
        </div>
      </NavLink>
    </div>
  );
}

export default Menu;