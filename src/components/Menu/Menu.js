import styles from './index.module.scss'

import logo from '../../assets/image/logo.png'
// console.log(styles)
function Menu() {
  return (
    <div className={styles.wrap}>
      <div className={styles.wrapLogo}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
      
    </div>
  );
}

export default Menu;