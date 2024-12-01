import { Menu } from "antd";
import React, { useState } from "react";
import { getItem } from "../../utils";
import { HomeOutlined, AppstoreOutlined, FileDoneOutlined } from "@ant-design/icons";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import RetailerStore from "../RetailerStore/RetailerStore";
import RetailerProduct from "../RetailerlProduct/RetailerlProduct";
import RetailerOrder from "../RetailerOrder/RetailerOrder";


const ReteilerPages = () => {
  const items = [
    getItem("Sản phẩm", "product", <AppstoreOutlined />),
    getItem("Cửa hàng", "store", <HomeOutlined />),
    getItem("Đơn hàng", "order", <FileDoneOutlined />),
  ];
  const [keySelected, setkeySelected] = useState("");

  const renderPage = (key) => {
    switch (key) {
      case "product":
        return <RetailerProduct />;
      case "store":
        return <RetailerStore />;
      case "order":
        return <RetailerOrder />;
      default:
        return <></>;
    }
  };

  const handleOnclick = ({ key }) => {
    setkeySelected(key);
  };
  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart />
      <div style={{ display: "flex" }}>
        <Menu
          mode="inline"
          style={{
            width: "28%",
          }}
          items={items}
          onClick={handleOnclick}
        />
        <div style={{ flex: 1 }}>{renderPage(keySelected)}</div>
      </div>
    </>
  );
};
export default ReteilerPages;
