import { Menu } from "antd";
import React, { useState } from "react";
import { getItem } from "../../utils";
import { UserOutlined, AppstoreOutlined } from "@ant-design/icons";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import RetailerStore from "../RetailerStore/RetailerStore";
import RetailerProduct from "../RetailerlProduct/RetailerlProduct";

const ReteilerPages = () => {
  const items = [
    getItem("Sản phẩm", "product", <AppstoreOutlined />),
    getItem("Cửa hàng", "store", <AppstoreOutlined />),
  ];
  const [keySelected, setkeySelected] = useState("");

  const renderPage = (key) => {
    switch (key) {
      case "product":
        return <RetailerProduct />;
      case "store":
        return <RetailerStore />;
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
