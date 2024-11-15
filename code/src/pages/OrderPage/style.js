import { InputNumber } from 'antd'
import styled from 'styled-components'

export const WrapperLeft = styled.div`
    flex: 1;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

export const WrapperRight = styled.div`
    width: 300px;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-left: 20px;
`

export const WrapperStyleHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
`

export const WrapperListOrder = styled.div`
    margin-top: 10px;
`

export const WrapperItemOrder = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding: 10px 0;
`

export const WrapperCountOrder = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const WrapperPriceDiscount = styled.span`
    font-weight: bold;
    color: #FF424E; /* Color for the discount price */
`

export const WrapperInfo = styled.div`
    margin-top: 20px;
    padding: 50px;
    border-top: 1px solid #eee;
`


export const WrapperInputNumber = styled(InputNumber)`
    .ant-input-number-input{
        text-align:center;
    };
    .ant-input-number-handler-wrap{
        
        display:none !important;
    }

`