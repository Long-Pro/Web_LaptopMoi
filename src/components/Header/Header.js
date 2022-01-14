import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Avatar from '@mui/material/Avatar';
import styles from './index.module.scss'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
function Header() {
  const title = useSelector(state =>state.title.value)
  const account = useSelector(state =>state.information.value.account)

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
    <div className={styles.wrap}>
      <div className={styles.title}>
        {title}
      </div>
      <div  className={styles.user}  onClick={handleClick}>
        <div className={styles.account}>
          {account}
        </div>
        <ArrowDropDownIcon/>
        <Avatar alt="Cindy Baker" src="https://loremflickr.com/100/100" />
      </div>
      
      
    </div>
         <Menu
         id="basic-menu"
         anchorEl={anchorEl}
         open={open}
         onClose={handleClose}
         MenuListProps={{
           'aria-labelledby': 'basic-button',
         }}
       >
         <MenuItem onClick={handleClose}>Thông tin cá nhân</MenuItem>
         <MenuItem onClick={handleClose}>Đăng xuất</MenuItem>
         
       </Menu>
    </>
  );
}

export default Header;