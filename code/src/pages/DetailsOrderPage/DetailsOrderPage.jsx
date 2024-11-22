import React from "react";
import {
  WrapperAllPrice,
  WrapperContentInfo,
  WrapperHeaderUser,
  WrapperInfoUser,
  WrapperItem,
  WrapperItemLabel,
  WrapperLabel,
  WrapperNameProduct,
  WrapperProduct,
  WrapperStyleContent,
} from "./style";
import { useLocation, useParams } from "react-router-dom";
import * as OrderService from "../../service/OrderService";
import { useQuery } from "@tanstack/react-query";
import { OrderContant } from "../../contant";
import { convertPrice } from "../../utils";
import { useMemo } from "react";
import Loading from "../../components/LoadingComponent/Loading";

const DetailsOrderPage = () => {
  const params = useParams();
  const { id } = params;
  const location = useLocation();
  const { state } = location;

  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, state?.token);
    return res.data;
  };

  const queryOrder = useQuery({
    queryKey: ["orders-details"],
    queryFn: fetchDetailsOrder,
    enabled: !!id,
  });
  const { data } = queryOrder;
  console.log("da", data);
  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [data]);

  return (
    <div style={{ width: "100%", height: "100vh", background: "#f5f5fa" }}>
      <div style={{ width: "80%", margin: "0 auto", height: "100%" }}>
        <h4 style={{ fontSize: "20px" }}>Chi tiết đơn hàng</h4>

        <WrapperHeaderUser>
          <WrapperInfoUser>
            <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
            <WrapperContentInfo>
              <div className="name-info">{data?.shippingAddress?.fullName}</div>
              <div className="address-info">
                <span>Địa chỉ: </span>{" "}
                {`${data?.shippingAddress?.address} ${data?.shippingAddress?.city}`}
              </div>
              <div className="phone-info">
                <span>Điện thoại: </span> {data?.shippingAddress?.phone}
              </div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLabel>Hình thức giao hàng</WrapperLabel>
            <WrapperContentInfo>
              <div className="delivery-info">
                <span className="name-delivery">
                  {OrderContant.delivery[data?.shippingMethod]}{" "}
                </span>
                Giao hàng tiết kiệm
              </div>
              <div className="delivery-fee">
                <span>Phí giao hàng: </span> {data?.shippingPrice}
              </div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLabel>Hình thức thanh toán</WrapperLabel>
            <WrapperContentInfo>
              <div className="payment-info">
                {OrderContant.payment[data?.paymentMethod]}
              </div>
              <div className="status-payment">
                {data?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
              </div>
            </WrapperContentInfo>
          </WrapperInfoUser>
        </WrapperHeaderUser>
        <WrapperStyleContent>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "20px",
            }}
          >
            <div
              style={{
                width: "50%",
                fontSize: "20px",
              }}
            >
              Sản phẩm
            </div>
            <WrapperItemLabel>Giá</WrapperItemLabel>
            <WrapperItemLabel>Số lượng</WrapperItemLabel>
            <WrapperItemLabel>Giảm giá</WrapperItemLabel>
            <WrapperItemLabel>Tạm tính</WrapperItemLabel>
            <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
            <WrapperItemLabel>Tổng cộng</WrapperItemLabel>


          </div>
          {data?.orderItems?.map((order) => {
            return (
              <WrapperProduct>
                <WrapperNameProduct>
                  <img
                    src={order?.image}
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                      border: "1px solid rgb(238, 238, 238)",
                      padding: "2px",
                    }}
                  />
                  <div
                    style={{
                      width: "50%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      marginLeft: "10px",
                      height: "70px",
                      fontSize: "13px",
                    }}
                  >
                    {order.name}
                  </div>
                </WrapperNameProduct>
                <WrapperItem>{convertPrice(order?.price)}</WrapperItem>
                <WrapperItem>{order?.amount}</WrapperItem>
                <WrapperItem>
                  {order?.discount
                    ? convertPrice((priceMemo * order?.discount) / 100)
                    : "0 VND"}
                </WrapperItem>
                <WrapperItem>{convertPrice(priceMemo)}</WrapperItem>
                <WrapperItem>{convertPrice(data?.shippingPrice)}</WrapperItem>
                <WrapperItem>{convertPrice(data?.totalPrice)}</WrapperItem>
              </WrapperProduct>
            );
          })}

        </WrapperStyleContent>
      </div>
    </div>
  );
};

export default DetailsOrderPage;
