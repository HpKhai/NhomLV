import { Menu } from "antd"
import React, { useState } from "react"
import { getItem } from "../../utils"
import {UserOutlined, AppstoreOutlined} from '@ant-design/icons'
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent"
import AdminUser from "../../components/AdminUser/AdminUser"
import AdminProduct from "../../components/AdminProduct/AdminProduct"

const AdminPage = () => {
    const items = [
        getItem('Người dùng', 'user', <UserOutlined />,),
        getItem('Sản phẩm', 'product', <AppstoreOutlined />,)
    ]
    const [keySelected, setkeySelected] = useState('')

    const renderPage = (key) =>{
      switch(key){
        case 'user':
          return(
            <AdminUser/>
          )
        case 'product':
          return(
            <AdminProduct/>
          )
        default:
          return<></>
      }
    }

    const handleOnclick = ({key}) => {
        setkeySelected(key)
    }
    return(
      <>
        <HeaderComponent isHiddenSearch isHiddenCart/>
        <div style={{display:'flex'}}>
            <Menu
            mode="inline"
            style={{
                width: '28%',
            }}
            items={items}
            onClick={handleOnclick}
            />
            <div style={{flex: 1 }}>
              {renderPage(keySelected)}
            </div>
        </div>
      </>
    )
}
export default AdminPage