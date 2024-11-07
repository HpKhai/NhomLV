import { Row } from "antd";
import styled from "styled-components";


export const WrapperHeader = styled(Row)`
padding: 10px 120px;
background-color: rgb(54, 170, 0);
align-items: center;
gap: 16px;
flex-wrap:nowrap;
`
export const WrapperTextHeader = styled.span`
font-size: 18px;
color: #fff;
font-weight: bold;
text-align: left;
&:hover{
    cursor: pointer;
}
`
export const WrapperHeaderAccount = styled.div`
display: flex;
align-items: center;
color: #fff;
gap: 10px;
&:hover{
    color:rgb(26, 148, 255);
    cursor: pointer;
}
`
export const WrapperTextHeaderSmall = styled.span`
font-size: 15px;
color: #fff;
white-space: nowrap;
`
export const WrapperContentPopup = styled.p`
&:hover{
    color:rgb(26, 148, 255);
    cursor: pointer;
}
`