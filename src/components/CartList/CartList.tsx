import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, getData, postData } from "../../api";
import { Dispatch, RootState } from "../../state/store";
import { v4 as uuidv4 } from "uuid";
import {
  CartDisplay,
  CartInfo,
  OrderCheckout,
  OrderDetailInfo,
  OrderInfo,
  ProductInfo,
} from "../../types/task";
import { Cart } from "../Cart/Cart";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export const CartList = () => {
  const classes = useStyles();

  const cartList = useSelector((state: RootState) => state.cart) as CartInfo[];
  const productList = useSelector(
    (state: RootState) => state.product
  ) as ProductInfo[];

  const cartListAfter: CartDisplay[] = [];

  cartList.forEach((cart) => {
    productList.forEach((product) => {
      if (cart.product_id === product.id) {
        cartListAfter.push({ cartInfo: cart, product });
      }
    });
  });

  const dispatch = useDispatch<Dispatch>();

  const onDeleteCart = (event: React.MouseEvent<HTMLElement>) => {
    const {
      currentTarget: { id },
    } = event;

    const session = JSON.parse(sessionStorage.getItem("userName") as string);
    const { userId } = session;

    deleteData(`${process.env.REACT_APP_SERVER_PORT}/cart/delete/${id}`).then((result) => {
      const { affectedRows } = result;
      postData(`${process.env.REACT_APP_SERVER_PORT}/cart`, { idLogin: userId }).then(
        (result) => {
          dispatch.cart.fetchCartList(result);
        }
      );
      affectedRows > 0
        ? alert("Đã xóa sản phẩm khỏi giỏ hàng")
        : alert("Xóa không thành công");
    });
  };

  const element = document.getElementsByClassName(
    "price"
  ) as unknown as HTMLElement[];

  const elementCheckbox = document.getElementsByTagName(
    "input"
  ) as unknown as HTMLInputElement[];

  const elementQuantity = document.getElementsByClassName(
    "quantity"
  ) as unknown as HTMLElement[];

  const elementProductId = document.getElementsByClassName(
    "productId"
  ) as unknown as HTMLElement[];

  let total: number = 0;
  let cartOrderDetail: OrderDetailInfo[] = [];

  const orderId = uuidv4();

  if (element.length > 0) {
    for (let i = 0; i < element.length; i++) {
      if (elementCheckbox[i + 1].checked === true) {
        total += Number(element[i].innerHTML);
        const quantity = Number(elementQuantity[i].innerHTML);
        const productId = Number(elementProductId[i].innerHTML);
        const cartDetailTmp: OrderDetailInfo = {
          id: 0,
          product_id: productId,
          order_id: orderId,
          quantity: quantity,
        };
        console.log("2");
        cartOrderDetail.push(cartDetailTmp);
      }
    }
  }

  const tahnToan = () => {
    const { userId } = JSON.parse(sessionStorage.getItem("userName") as string);
    const order: OrderInfo = {
      id: orderId,
      date_payment: "null",
      total_price: total,
      user_id: userId,
    };

    const dataCheckout: OrderCheckout = {
      order,
      orderDetail: cartOrderDetail,
    };

    postData(`${process.env.REACT_APP_SERVER_PORT}/checkout`, dataCheckout);

    dispatch.order.setOrderCheckout(dataCheckout);
  };

  return (
    <List className={classes.root}>
      {cartListAfter.map((item) => (
        <Cart
          onDeleteCart={onDeleteCart}
          key={item.cartInfo.id}
          cartDisplay={item}
        />
      ))}
      <h1>total:{total}</h1>
      <Button style={{ background: "green" }} onClick={tahnToan}>
        Đặt hàng
      </Button>
    </List>
  );
};
