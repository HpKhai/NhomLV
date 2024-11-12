import React, { useEffect, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {WrapperButtonMore, WrapperProducts, WrapperTypeProduct} from './style'
import SliderComponent from "../../components/SilederComponent/SliderComponent";
import Baner1 from "../../assets/images/Baner1.png"
import Baner2 from "../../assets/images/Baner2.png"
import Baner3 from "../../assets/images/Baner3.png"
import CardComponent from "../../components/CardComponent/CardComponent";
// import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
// import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
// import { Color } from "antd/es/color-picker";
import { useQuery } from '@tanstack/react-query'
import * as ProductService from '../../service/ProductService'
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import MapComponent from "../../components/MapComponent/MapComponent"

const HomePage  = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 800)
    const [limit, setLimit] = useState(6)
    const [typeProducts, setTypeProducts] = useState([])
    const fetchProductAll = async (context) => {

        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context?.queryKey[2]
        const res = await ProductService.getAllProduct(search, limit) 
        return res
    }
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if(res?.status === 'OK'){
            setTypeProducts(res?.data)
        }
        // console.log('res',res)
    }

    const { data:products } = useQuery({queryKey: ['products', limit, searchDebounce], queryFn: fetchProductAll, retry:3,keepPreviousData:true })

    useEffect(()=>{
        
        fetchAllTypeProduct()
    })

    return (    
        <>
        <div style ={{ padding: '0 120px'}}>
            <WrapperTypeProduct>
            {typeProducts.map((item)=> {
                return (
                   <TypeProduct name={item} key={item} />  
                )
            })}
         </WrapperTypeProduct>
         </div>

         <div className='body' style={{ width:'100%',backgroundColor:'#e7dee2'}}>
            <div id="container" style={{ height:'1000px',width:'100%',margin:'0 auto' }}>
       <SliderComponent arrImages={[Baner1,Baner2,Baner3]}/>
       <div style={{ marginLeft: "120px", marginRight: "120px", display: "flex", justifyContent: "center" }}>
    <WrapperProducts style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "space-between", width: "100%" }}>
        {products?.data?.map((product) => {
            return (
                <CardComponent
                    key={product._id}
                    countInStock={product.countInStock}
                    description={product.description}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    type={product.type}
                    selled={product.selled}
                    discount={product.discount}
                    id={product._id}
                />
            );
        })}
    </WrapperProducts>
</div>

       <div style={{width:'20%',display:'flex',justifyContent:'center',margin:'0 auto', paddingTop:"40px"}}>
        <WrapperButtonMore 
            textButton ="Xem Thêm" type="outline" styleButton= {{
            border: '1px solid rgb(11,116,229)',
            background:'#fff',
            Color:`${products?.total === products?.data?.length ? '#ccc' : 'rgb(11,116,229)'}`,
            width:'40%', height:'38px', borderRadius:'4px'}}
            styleTextButton = {{ fontWeight: 500}}
            onClick={() => setLimit((prev) => prev + 6)}
            disabled={products?.total === products?.data?.length || products?.totalPage === 1 }
        />
       </div>
       <div style={{display:'flex', justifyContent:'center',marginTop:'50px'}}>
       </div>
    </div>
    </div>
    </>
    )
}
export default HomePage