import { useSelector, useDispatch } from 'react-redux'
import {useEffect } from 'react'
import {change } from '../../store/slice/title'

import chart1 from '../../assets/image/dashboard/chart1.svg'
import chart2 from '../../assets/image/dashboard/chart2.svg'
import chart3 from '../../assets/image/dashboard/chart3.svg'
import chart4 from '../../assets/image/dashboard/chart4.svg'
import chart5 from '../../assets/image/dashboard/chart5.svg'
import chart6 from '../../assets/image/dashboard/chart6.svg'
import cardview1 from '../../assets/image/dashboard/Cardview1.svg'
import cardview2 from '../../assets/image/dashboard/Cardview2.svg'
import cardview3 from '../../assets/image/dashboard/Cardview3.svg'
import cardview4 from '../../assets/image/dashboard/Cardview4.svg'
import dashboard from '../../assets/image/dashboard/dashboard.png'


import styles from './index.module.scss'



function Dashboard() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(change('TỔNG QUAN'))
  },[])
  
  return (
    <div className={styles.wrap}>
      <img src={dashboard} alt="dashboard" className={styles.image}  />
      {/* <div className={styles.wrapCard}>
        <img src={cardview1} alt="cardview1"  />
        <img src={cardview2} alt="cardview1"  />
        <img src={cardview3} alt="cardview1"  />
        <img src={cardview4} alt="cardview1"  />
      </div>
      <div className={styles.wrapChart}>
        <img src={chart1} alt="chart1"  />
        <img src={chart2} alt="chart2"  />
      </div>
      <div className={styles.wrapChart}>
        <img src={chart3} alt="chart3"  />
        <img src={chart4} alt="chart4"  />
        <img src={chart5} alt="chart5"  />
        <img src={chart6} alt="chart6"  />
      </div> */}
    </div>
  );
}

export default Dashboard;
