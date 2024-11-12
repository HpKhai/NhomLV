import { Badge, Col, Popover } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from '../../redux/slides/userSlide';
import { searchProduct } from "../../redux/slides/productSlide";
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderSmall, WrapperContentPopup } from "./Style";
import ButtonSearch from '../ButtonSearch/ButtonSearch';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { FaMapLocationDot } from "react-icons/fa6";
import * as UserService from '../../service/UserService';

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
    const user = useSelector((state) => state.user);
    const order = useSelector((state) => state.order);
    const [userName, setUserName] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setUserName(user?.name);
        setUserAvatar(user?.avatar);
    }, [user?.name, user?.avatar]);

    const handleNavigateLogin = () => {
        navigate('/sign-in');
    };

    const handleNavigateHome = () => {
        navigate('/');
    };

    const handleNavigateMap = () => {
        navigate('/map');
    };

    const handleLogout = async () => {
        await UserService.logoutUser();
        dispatch(resetUser());
    };

    const onSearch = (e) => {
        const searchQuery = e.target.value;
        dispatch(searchProduct(searchQuery));
    };

    const content = (
        <div>
            <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
            <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => navigate('/system/admin')}>Quản lý hệ thống</WrapperContentPopup>
            )}
        </div>
    );

    return (
        <div>
            <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenCart ? 'space-between' : 'unset' }}>
                <Col span={5} style={{ display: 'flex', alignItems: 'center' }}>
                    <div onClick={handleNavigateHome} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <div style={styles.logoCircle}>
                            <span style={styles.logoSymbol}>N</span>
                        </div>
                        <WrapperTextHeader style={{ fontSize: '20px', textAlign: 'center', color: '#fff', marginLeft: '10px' }}>
                            Nông Nghiệp Xanh
                        </WrapperTextHeader>
                    </div>
                </Col>
                {!isHiddenSearch && (
                    <Col span={12}>
                        <ButtonSearch 
                        placeholder= 'Nhập Tên Sản Phẩm'
                            textButton="Tìm Kiếm"
                            bordered={false}
                            onChange={onSearch}
                        />
                    </Col>
                )}
                <Col span={5} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <WrapperHeaderAccount>
                        <div onClick={handleNavigateMap}>
                            <FaMapLocationDot style={{ fontSize: "28px", marginRight: '20px' }} />
                        </div>
                        {userAvatar ? (
                            <img src={userAvatar} alt="avatar" style={styles.avatar} />
                        ) : (
                            <UserOutlined style={{ fontSize: '30px' }} />
                        )}
                        {user?.name ? (
                            <Popover content={content} trigger="click">
                                <div style={{ color: 'black' }}>{userName}</div>
                            </Popover>
                        ) : (
                            <div onClick={handleNavigateLogin} style={{ cursor: "pointer" }}>
                                <WrapperTextHeaderSmall style={{ fontSize: '15px' }}>Đăng Nhập/Đăng Ký</WrapperTextHeaderSmall>
                                <div>
                                    <WrapperTextHeaderSmall>Tài Khoản</WrapperTextHeaderSmall>
                                    <CaretDownOutlined />
                                </div>
                            </div>
                        )}
                    </WrapperHeaderAccount>
                    {!isHiddenCart && (
                        <div onClick={() => navigate('/order')} style={{ cursor: 'pointer', display:"flex", alignItems:"center", gap:"8px"}} className="">
                            <Badge count={order?.orderItems?.length} size="small">
                                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                            </Badge>
                            <WrapperTextHeaderSmall style={{ fontSize: '15px', color: '#fff' }}>Giỏ Hàng</WrapperTextHeaderSmall>
                        </div>
                    )}
                </Col>
            </WrapperHeader>
        </div>
    );
};

const styles = {
    logoCircle: {
        backgroundColor: '#fff',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoSymbol: {
        color: '#2cba4b',
        fontSize: '20px',
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
    },
    avatar: {
        height: '30px',
        width: '30px',
        borderRadius: '50%',
        objectFit: 'cover',
    },
};

export default HeaderComponent;
