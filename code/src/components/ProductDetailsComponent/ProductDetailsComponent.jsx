import { Col, Row ,Image, InputNumber} from 'antd'
import { Rate} from 'antd'

import React, { useState } from 'react'
// import imageProductSmall from '../../assets/images/2.webp'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleNameProduct, WrapperStyleText } from './style'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../service/ProductService'
import { useQuery } from "@tanstack/react-query"
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate} from 'react-router'
import { addOrder } from '../../redux/slides/orderSlide'
import { convertPrice } from '../../utils'


const ProductDetailsComponent = ({idProduct}) => {
  const [numProduct, setNumProduct] = useState(1)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const user = useSelector((state) => state.user)
  const onChange = (value) => {
    setNumProduct(Number(value))
  }



  const fetchGetDetailsProduct = async () => {
    // const id = context?.queryKey && context?.queryKey[0]
    // if(id){
      const res = await ProductService.getDetailsProduct(idProduct)
      return res.data
    // } 
  }

  const handleChangeCount = (type) =>{
    if(type === 'increase'){
      setNumProduct(numProduct + 1)
    }else {
      setNumProduct(numProduct - 1)
    }
  }
  
  const { data: productDetails } = useQuery({
      queryKey: ['product-details', idProduct],
      queryFn: () => fetchGetDetailsProduct(idProduct),
      enabled: !!idProduct,
  })
  const handleAddOrderProduct = () =>{
    if(!user?.id){
      navigate('/sign-in', {state: location?.pathname})
    }else{
      dispatch(addOrder({
        orderItem: {
          name: productDetails?.name,
          amount: numProduct,
          image: productDetails?.image,
          price: productDetails?.price,
          product: productDetails?._id,
          dicount: productDetails?.discount
        }
      }))
    }
  }
  return (
    <>
    <Row style={{background:'#fff',borderRadius:'8px',padding:'15px'}}>
        <Col span ={10} style={{borderRight:'1px solid #aaa',paddingRight:'8px'}}>
            <Image src= {productDetails?.image} alt="image product" preview ="false"/>
            {/* <div>
                <Image src= {imageProductSmall} alt="image small" preview ="false"/>
                <Image src= {imageProductSmall} alt="image small" preview ="false"/>
                <Image src= {imageProductSmall} alt="image small" preview ="false"/>
                <Image src= {imageProductSmall} alt="image small" preview ="false"/>
            </div> */}
        </Col>

        <Col span ={14} style={{ paddingLeft:'10px'}}> 
        <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
        <div>
        <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating}/>
        <WrapperStyleText> ||{productDetails?.countInStock}+</WrapperStyleText>
        </div>
              <WrapperPriceProduct>
                <WrapperPriceTextProduct>{convertPrice(productDetails?.price)}</WrapperPriceTextProduct>
              </WrapperPriceProduct>
              <WrapperAddressProduct>
                <span>Địa chỉ: </span>
                <span className='addres' >{user.address}</span>
                <span className='change-address'>Đổi Địa chỉ</span>
              </WrapperAddressProduct>
              <div style={{ margin:'5px 0 15px', borderTop:'1px solid #aaa',borderBottom:'1px solid #aaa',padding:'10px 0'}}>
                    <div style={{marginBottom:'10px'}}>Số Lượng: </div>
                  <WrapperQualityProduct>
                    <button style={{border:'none', background:'transparent', cursor:'pointer'}}>
                        <MinusOutlined style={{color:'#000', fontSize:'20px'}} onClick={() => handleChangeCount('decrease')}/>
                    </button>
                    <WrapperInputNumber value={numProduct} defaultValue={1} onChange={onChange}  ></WrapperInputNumber>
                    <button style={{border:'none', background:'transparent', cursor:'pointer'}}>
                        <PlusOutlined style={{color:'#000', fontSize:'20px'}}  onClick={() => handleChangeCount('increase')}/>
                    </button>
                  </WrapperQualityProduct>
              </div>
              
              <div style={{display:'flex',alignItems: 'center',gap:'30px'}}>
              <ButtonComponent
                  size ={20}
                  styleButton ={{
                    backgroundColor:'rgb(97 193 72)',
                    width:'29%'

                  }} 
                  styleTextButton ={{
                    color: '#fff',
                    fontWeight:'bold'
                  }} 
                  onClick={handleAddOrderProduct}
                  textButton={'Chọn mua'}
                >
                </ButtonComponent> 

                <ButtonComponent
                  size ={20}
                  styleButton ={{
                    backgroundColor:'rgb(97 193 72)',
                    width:'28%'
                  }} 
                  styleTextButton ={{
                    color: '#fff',
                    fontWeight:'bold'

                  }} 
                  textButton={'Trả Góp'}
                >
                </ButtonComponent> 

              </div>
        </Col>
    </Row>
    </>
  )
}

export default ProductDetailsComponent