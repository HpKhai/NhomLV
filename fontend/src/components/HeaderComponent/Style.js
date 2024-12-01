import { Row } from "antd";
import styled from "styled-components";


export const WrapperHeader = styled(Row)`
padding: 20px 120px;
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
export const WrapperHeaderMap = styled.div`
display: flex;
align-items: center;
color: #fff;
gap: 10px;
&:hover{
  color:rgb(26, 148, 255);
  cursor: pointer;
}
`
export const WrapperHeaderAccount = styled.div`
display: flex;
align-items: center;
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

export const stylesHeader = styled.div`
    container: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#2cba4b', // Green background color
      padding: '10px 20px',
      borderRadius: '8px',
    },
    circle: {
      backgroundColor: '#fff',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '10px',
    },
    symbol: {
      color: '#2cba4b', // Matches the green background
      fontSize: '20px',
      fontWeight: 'bold',
      fontFamily: 'Arial, sans-serif',
    },
    text: {
      color: '#fff',
      fontSize: '18px',
      fontWeight: 'bold',
      fontFamily: 'Arial, sans-serif',
    },
  `