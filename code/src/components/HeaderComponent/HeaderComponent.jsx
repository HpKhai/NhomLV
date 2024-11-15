import { Badge, Col, Popover } from "antd"
import React from "react"
import { useState } from 'react'
import { useEffect } from 'react'

import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderSmall, WrapperContentPopup } from "./Style"
// import Search from "antd/es/transfer/search"
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons'
import ButtonSearch from '../ButtonSearch/ButtonSearch'
import { useNavigate } from "react-router"
import * as UserService from '../../service/UserService'
import { useDispatch, useSelector } from "react-redux"
import { resetUser } from '../../redux/slides/userSlide'
import { searchProduct } from "../../redux/slides/productSlide"
import MapComponent from "../MapComponent/MapComponent"
import { FaMapLocationDot } from "react-icons/fa6";




const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
    const user = useSelector((state) => state.user)
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [search, setSearch] = useState('')
    const [isOpenPopup, setIsOpenPopup] = useState(false)
    const order = useSelector((state) => state.order)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }
    const handleNavigateHome = () => {
        navigate('/')
    }
    const handleNavigateMap = () => {
        navigate('/map')
    }



    useEffect(() => {
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
    }, [user?.name, user?.avatar])

    const handleLogout = async () => {
        await UserService.logoutUser
        dispatch(resetUser())
    }

    const content = (
        <div>
            <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</WrapperContentPopup>
            <WrapperContentPopup onClick={() => handleClickNavigate('order')}>Đơn hàng của tôi</WrapperContentPopup>

            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản lý hệ thống</WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={() => handleClickNavigate('logout')}>Đăng xuất</WrapperContentPopup>
        </div>
    )

    const handleClickNavigate = (type) => {
        switch (type) {
            case 'profile':
                navigate('/profile-user')
                break
            case 'admin':
                navigate('/system/admin')
                break
            case 'order':
                navigate('/my-order', {
                    state: {
                        id: user?.id,
                        token: user?.access_token
                    }
                })
                break
            case 'logout':
                handleLogout()
                break
            default:
                break
        }
        setIsOpenPopup(false)
    }


    const onSearch = (e) => {
        let setSearch = (e.target.value)
        dispatch(searchProduct(e.target.value))
    }

    return (
        <div >
            <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenCart ? 'space-between' : 'unset' }}>
                <Col span={5}>
                    <WrapperTextHeader onClick={handleNavigateHome} style={{ fontSize: '20px', textAlign: 'center' }}>
                        CỬA HÀNG THUỐC SÂU
                    </WrapperTextHeader>
                </Col>
                {!isHiddenSearch && (
                    <Col span={12} >
                        <ButtonSearch
                            // size ="large"
                            textButton="Tìm Kiếm"
                            bordered={false}
                            // placeholder="input search text"
                            onChange={onSearch}
                        />
                    </Col>
                )}
                <Col span={5} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <WrapperHeaderAccount >
                        <div onClick={handleNavigateMap}>
                            <FaMapLocationDot style={{ fontSize: "28px", marginRight: '20px' }} />
                        </div>
                        {userAvatar ? (
                            <img src={userAvatar} alt="avatar"
                                style={{
                                    height: '30px',
                                    width: '30x',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }} />
                        ) : (

                            <UserOutlined style={{ fontSize: '30px' }} />
                        )}

                        {user?.name ? (
                            <>
                                <Popover content={content} trigger="click" open={isOpenPopup}>
                                    <div style={{ color: 'black' }} onClick={() => setIsOpenPopup((prev) => !prev)}
                                    >{userName}</div>
                                </Popover>
                            </>
                        ) : (
                            <div onClick={handleNavigateLogin} style={{ cursor: "pointer" }}>
                                <WrapperTextHeaderSmall style={{ fontSize: '15px' }}> Đăng Nhập/Đăng Ký</WrapperTextHeaderSmall>
                                <div>
                                    <WrapperTextHeaderSmall>Tài Khoản</WrapperTextHeaderSmall>
                                    <CaretDownOutlined />
                                </div>
                            </div>
                        )}

                    </WrapperHeaderAccount>
                    {!isHiddenCart && (
                        <div onClick={() => { navigate('/order') }} style={{ cursor: 'pointer' }}>
                            <Badge count={order?.orderItems?.length} size="small">
                                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                            </Badge>
                            <WrapperTextHeaderSmall style={{ fontSize: '15px', color: '#fff' }}>Giỏ Hàng</WrapperTextHeaderSmall>
                        </div>
                    )}
                </Col>
            </WrapperHeader>
        </div>
    )
}
export default HeaderComponent