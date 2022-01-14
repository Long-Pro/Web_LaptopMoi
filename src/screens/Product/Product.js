import { useSelector, useDispatch } from 'react-redux'
import {useEffect } from 'react'

import {change } from '../../store/slice/title'

function Product() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(change('SẢN PHẨM'))
  },[])


  return (
    <>
      Product
    </>
  );
}

export default Product;
