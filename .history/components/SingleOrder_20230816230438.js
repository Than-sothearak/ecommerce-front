import React from "react";
import { styled } from "styled-components";

const StyledOrder = styled.div`
 
  padding: 20px 0;
  border-bottom: 1px solid #ddd;


`;
const Header = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
time {
    color: gray;
    font-size: 18px;
    width: 60%;
  
  }
  p {
    width: 100%;
    margin-left: 10px;
    color: gray;
    font-size: small;
   
  }
`
const ItemName = styled.div`
display: flex;
font-size: small;
justify-content: space-between;
@media screen and (min-width: 1024px) {
font-size: medium;
  }

`
const OrderInfo = styled.div`
display: flex;
align-items: center;
flex-wrap: wrap;
p {
  color: gray;
}
@media screen and (min-width: 748px) {
  flex-wrap: nowrap;
  }

`

const ProductInfo =styled.div`
font-size: small;
 width: 100%;
`
const ItemsWrap = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 10px;
margin-left: 10px;
p {
  color: black;
}
span {
  color: gray;
}
`
const AddressInfo = styled.div`
margin-top: 5px;
width: 60%;
font-size: small;

`
const SingleOrder = ({ orders }) => {
  return (
    <>
      {orders.map((order, index) => (
        <StyledOrder key={order._id}>
          <Header>
          <time>{(new Date(order.createdAt).toLocaleString('sv-SE'))}</time>
          <p>Desciption</p>
          </Header>
          <OrderInfo>
            
            <AddressInfo>
            <p>{order.name}</p>
            <p>{order.email}</p>
            <p>{order.city}</p>
            <p>{order.streetAddress}</p>
            <p>{order.country}</p>
            </AddressInfo>
           
           <ProductInfo>
           {order.line_items.map((item, index) => (
            <ItemsWrap key={index}>
             <ItemName><p> {item.price_data.product_data.name}</p></ItemName> 
             <ItemName> <p>X{item.quantity}</p></ItemName>
            </ItemsWrap>
          ))}
           </ProductInfo>
          
          </OrderInfo>

        </StyledOrder>
      ))}
    </>
  );
};

export default SingleOrder;
