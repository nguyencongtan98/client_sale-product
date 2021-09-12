import React, { useEffect } from "react";
import { Grid, makeStyles, createStyles, Theme } from "@material-ui/core";
import { Product } from "../Product/Product";
import { useState } from "react";
import { ProductInfo } from "../../types/task";
import { isTemplateExpression } from "typescript";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../state/store";
import { postData, getData } from "../../api";
import { useHistory } from "react-router";

export const ProductList = (): JSX.Element => {
  const productList = useSelector((state: RootState) => state.product);
  const history = useHistory();
  const dispatch = useDispatch<Dispatch>();

  const onAddToCart = (event: React.MouseEvent<HTMLElement>) => {
    const { userId } = JSON.parse(sessionStorage.getItem("userName") as string);

    const {
      currentTarget: { id },
    } = event;

    const data = {
      productId: id,
      userId: userId,
    };

    postData(`${process.env.REACT_APP_SERVER_PORT}/cart/add`, data).then((result) => {
      if (userId) {
        const { affectedRows } = result;
        if (affectedRows > 0) {
          alert("Đã thêm sản phẩm vào giỏ hàng ");
        }
        postData(`${process.env.REACT_APP_SERVER_PORT}/cart`, { idLogin: userId }).then(
          (result) => {
            dispatch.cart.fetchCartList(result);
          }
        );
      } else {
        history.push("/login");
      }
    });
  };

  return (
    <Grid container>
      {productList &&
        productList.map((item) => {
          return (
            <Grid key={item.id} item sm={3} xs={12}> 
              <Product onAddToCart={onAddToCart} product={item} />
            </Grid>
          );
        })}
    </Grid>
  );
};
