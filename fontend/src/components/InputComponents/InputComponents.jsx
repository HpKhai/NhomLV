import { Input } from 'antd';
import React from 'react';

const InputComponents = (props) => {
    const {
        size,
        placeholder,
        bordered,
        style,
        ...rests
    } = props;

    return (
        <Input
            size={size} 
            placeholder={placeholder} 
            bordered={bordered} 
            style={style}
            {...rests}
        />
    );
}

export default InputComponents;
