
import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleText } from './Style'
import {StarFilled} from '@ant-design/icons'
import { useNavigate } from 'react-router'
import { convertPrice } from '../../utils'

const CardComponent = (props) => {
    const {countInStock, description, image, name, price, rating, type, selled, discount, id} = props
    const navigate = useNavigate()
    const handleGetDetailsProduct = (id) => {
        navigate(`/product-details/${id}`)
    }
  return (
    <WrapperCardStyle
        hoverable
        headStyle={{width:'200px', height:'200px'}}
        style={{ width: 200 }}
        bodyStyle={{padding:'10px'}}
        cover={<img alt="example" src={image} 
        onClick={() => handleGetDetailsProduct(id)}
        
        />}
  >
        <StyleNameProduct>{name}</StyleNameProduct> 
        <WrapperReportText>
            <span style={{ marginRight:'4px'}}>
                <span>{rating} </span><StarFilled style={{ fontSize: '10px', color:'yellow'}} />
            </span>
            <WrapperStyleText> | Đã bán {selled || 100}+</WrapperStyleText>
        </WrapperReportText>
        <WrapperPriceText>
           <span style={{ marginRight:'10px'}}> {convertPrice(price)} </span>
            <WrapperDiscountText>
                {discount || 5}%
            </WrapperDiscountText>
        </WrapperPriceText>
  </WrapperCardStyle>
  )
}

export default CardComponent