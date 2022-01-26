import { useSelector, useDispatch } from 'react-redux'
import {useEffect } from 'react'

import {change } from '../../store/slice/title'

function Product() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(change('THỐNG KÊ'))
  },[])


  return (
    <>
      THỐNG KÊ
    </>
  );
}

export default Product;
