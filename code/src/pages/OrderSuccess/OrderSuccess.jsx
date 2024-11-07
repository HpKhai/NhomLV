import React from "react"
import { WrapperInfo, WrapperContainer, WrapperValue, WrapperItemOrder, WrapperItemOrderInfo } from "./style"
import { convertPrice } from "../../utils"
import { useLocation } from "react-router"
import { useSelector } from "react-redux"
import { OrderContant } from "../../contant"






const OrderSuccess = () => {
    const order = useSelector((state) => state.order)
    const location = useLocation()
    const { state } = location
    return (
        <div className="container" style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
            <div style={{ height: '100%', width: '60%', margin: '0 auto' }}>
                <h2>Đơn đặt hàng thành công</h2>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <WrapperContainer>
                        <WrapperInfo>
                            <div>
                                <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Phương thức giao hàng</label>
                                <WrapperValue style={{ fontSize: '14px' }}>
                                    <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{OrderContant.delivery[state?.delivery]}</span>Giao hàng nhanh
                                </WrapperValue>
                            </div>
                        </WrapperInfo>
                        <WrapperInfo>
                            <div>
                                <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Phương thức thanh toán</label>
                                <WrapperValue style={{ fontSize: '14px' }}>
                                    {OrderContant.payment[state?.payment]}
                                </WrapperValue>
                            </div>
                        </WrapperInfo>
                        <WrapperItemOrderInfo>
                            {state?.orders.map((order) => {
                                return (
                                    <WrapperItemOrder>
                                        <div style={{ width: '50%', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <img src={order?.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                                            <div style={{
                                                width: '50%',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                fontSize: '13px'
                                            }}>
                                                {order?.name}</div>
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span>
                                                <span style={{ fontSize: '13px', color: '#242424', }}>Giá tiền {convertPrice(order.price)}</span>
                                            </span>
                                            <span>
                                                <span style={{ fontSize: '13px', color: '#242424', }}>Số lượng {order.amount}</span>
                                            </span>
                                        </div>
                                    </WrapperItemOrder>
                                )
                            })}
                        </WrapperItemOrderInfo>
                        <span>
                            <span style={{ fontSize: '13px', color: 'red' }}>Tổng tiền {convertPrice(state?.totalPrice)}</span>
                        </span>
                    </WrapperContainer>
                </div>
            </div>
        </div>
    )
}

export default OrderSuccess