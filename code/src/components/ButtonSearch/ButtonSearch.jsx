// import {Button } from "antd";
import React from "react";
import {SearchOutlined} from '@ant-design/icons';
import InputComponents from "../InputComponents/InputComponents";
import ButtonComponent  from "../ButtonComponent/ButtonComponent";

const ButtonSearch = (props) => {
    const {
        size,
        placeholder,
        textButton,bordered, 
        // backgroundColorInput='#fff' , 
        backgroundColorButton='rgb(54, 170, 0)', 
        colorButton='#aaa'

    } = props
    return (
        <div style={{display:'flex',gap:'10px'}}>
         <InputComponents style={{width: '100%', background:'#fff'}} 
        //  size ={size} 
         placeholder={placeholder} 
         bordered={bordered} 
        {...props}
        />

         <ButtonComponent
            size ={size}
            styleButton ={{background: backgroundColorButton, border: !bordered && 'none'}}
            styleTextButton ={{color: colorButton}} 
            icon ={<SearchOutlined color={colorButton} style={{color:'#aaa', }}/>}
            textButton={textButton}
            />
        </div>
    )
}
export default ButtonSearch