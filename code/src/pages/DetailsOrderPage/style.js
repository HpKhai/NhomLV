import styled from "styled-components"

export const WrapperHeaderUser = styled.div`
  display: flex;
  align-items: center;
  gap:30px;
`

export const WrapperInfoUser = styled.div`
  .name-info {
    font-size: 13px;
    color: rgb(36, 36, 36);
    font-weight: bold;
    text-transform: uppercase;
  }
  .address,.phone-info,.delivery-info,.delivery-fee,.payment-info {
    color: rgba(0, 0, 0, 0.65);
    font-size: 13px;
    margin-top: 8px;
  }
  .name-delivery {
    color: rgb(234, 133, 0); 
    font-weight: bold;
    text-transform: uppercase;
  }
  .status-payment {
    margin-top: 8px;
    color: rgb(234, 133, 0); 
  }
`

export const WrapperLabel = styled.div`
  color: rgb(36, 36, 36);
  font-size: 13px;
  text-transform: uppercase;
  margin-bottom: 15px;
  
`
export const WrapperContentInfo = styled.div`
  height: 118px;
  width: 300px;
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
  font-size: 13px;
  & .address-info {
  margin-top: 10px;
  }
  & .name-info{
  margin-top: 7px;
  }
  `

export const WrapperStyleContent = styled.div`
  display:flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`

export const WrapperProduct = styled.div`
  display:flex;
  align-items:flex-start;
  margin-top: 10px;
`

export const WrapperNameProduct = styled.div`
  display:flex;
  align-items: flex-start;
  width: 25%;
`

export const WrapperItem = styled.div`
  width: 25%;
  font-size:20px;
  font-weight: bold;
  text-align: center;
  flex: 1;
  &:last-child {
    color: red
  }
`
export const WrapperItemLabel = styled.div`
  width: 25%;
  font-size:20px;
 font-weight: bold;
 text-align: center;
 
  &:last-child {
    font-weight: bold;
  }
`

