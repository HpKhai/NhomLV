import { Button } from 'antd'
import React from 'react'

const ButtonComponent = (props) => {
const {
   size, styleTextButton, styleButton,textButton,disabled,...rests
} = props

  return (
        <Button
            size ={size}
            style={{
              ...styleButton,
              background: disabled ? '#ccc' : styleButton.backgroundColor
            }} 
            disabled={disabled}
            {...rests}
            >
            <span style={styleTextButton}>{textButton}</span>
            </Button>

  )
}
export default ButtonComponent