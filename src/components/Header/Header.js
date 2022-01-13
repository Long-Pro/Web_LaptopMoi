import Avatar from '@mui/material/Avatar';
import styles from './index.module.scss'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
function Header({title,user}) {
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        {title}
      </div>
      <div  className={styles.user} >
        <div className={styles.account}>{user.account}</div>
        <Avatar alt="Cindy Baker" src="https://loremflickr.com/100/100" />
      </div>
      
      
    </div>
  );
}

export default Header;