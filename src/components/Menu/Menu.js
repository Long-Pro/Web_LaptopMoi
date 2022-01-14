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
      <NavLink className={({ isActive }) =>clsx(styles.item,isActive&&styles.active)} to="/">
        <DashboardOutlinedIcon sx={{ color: "#fff" }} />
        <div className={styles.text}>
          TỔNG QUAN
        </div>
      </NavLink>
      <div className={styles.item}>
        <PeopleOutlinedIcon sx={{ color: "#fff" }} />
        <div className={styles.text}>
          KHÁCH HÀNG
        </div>
      </div>
      <div className={styles.item}>
        <DescriptionOutlinedIcon sx={{ color: "#fff" }} />
        <div>
          HÓA ĐƠN
        </div>
      </div>
      <div className={styles.item}>
        <AdminPanelSettingsOutlinedIcon sx={{ color: "#fff" }} />
        <div>
          NHÂN VIÊN
        </div>
      </div>
      <NavLink className={({ isActive }) =>clsx(styles.item,isActive&&styles.active)} to="/product">
        <CategoryOutlinedIcon sx={{ color: "#fff" }} />
        <div>
          SẢN PHẨM
        </div>
      </NavLink>
      <div className={styles.item}>
        <EqualizerOutlinedIcon sx={{ color: "#fff" }} />
        <div>
          THỐNG KÊ
        </div>
      </div>
    </div>
  );
}

export default Menu;