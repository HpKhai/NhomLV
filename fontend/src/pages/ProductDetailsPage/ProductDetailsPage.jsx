import React from 'react'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'
import { useNavigate, useParams } from 'react-router'


const ProductDetailsPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  return (
    <div style={{width:'100%', height:'100%', background:'#efefef'}}>
      <div style={{width:'100%', height:  '100%', background:'#e7dee2', fontSize:'12px', margin:'0 auto' }}>
        <h2> <span style={{cursor:'pointer', textDecoration: 'underline'}} onClick={() => {navigate('/')}}>Trang chủ</span> - Chi tiết sản phẩm</h2>
        <ProductDetailsComponent idProduct={id} />
      </div>
    </div>
  
  )
}

export default ProductDetailsPage