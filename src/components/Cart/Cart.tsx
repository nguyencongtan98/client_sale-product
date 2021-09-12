import React, { useState, useEffect, ChangeEvent } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import DeleteIcon from "@material-ui/icons/Delete";
import { Image } from "rebass";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../state/store";
import { CartDisplay, CartInfo } from "../../types/task";
import { getData, postData, updateData } from "../../api";

type CartProps = {
  cartDisplay: CartDisplay;
  onDeleteCart: (event: React.MouseEvent<HTMLElement>) => void;
  // onIncreamentQuantity: (event: React.MouseEvent<HTMLElement>) => void;
};

export const Cart = (props: CartProps) => {
  const {
    cartDisplay: {
      cartInfo: { id, product_id },
      product: { name, price, image_link },
    },
    onDeleteCart,
    // onIncreamentQuantity,
    // quantity,
  } = props;

  const cartList = useSelector((state: RootState) => state.cart) as CartInfo[];
  const dispatch = useDispatch<Dispatch>();

  const [priceCart, setPriceCart] = useState<number>(price);
  const [quantity, setQuantity] = useState<number>(1);

  // const onDegreamentQuantity = () => {
  //   if (quantity > 1) {
  //     setQuantity(quantity - 1);
  //   }
  // };

  useEffect(() => {
    setPriceCart(price * quantity);
  }, [price, quantity]);

  const updateQuantity = (event: React.MouseEvent<HTMLElement>) => {
    const session = JSON.parse(sessionStorage.getItem("userName") as string);
    const { userId } = session;
    if (event.currentTarget.id === "add") {
      setQuantity(quantity + 1);
      postData(`${process.env.REACT_APP_SERVER_PORT}/cart`, { idLogin: userId }).then(
        (result) => {
          dispatch.cart.fetchCartList(result);
        }
      );
    } else if (quantity > 1) {
      setQuantity(quantity - 1);
      postData(`${process.env.REACT_APP_SERVER_PORT}/cart`, { idLogin: userId }).then(
        (result) => {
          dispatch.cart.fetchCartList(result);
        }
      );
    }
  };

  const [check, setCheck] = useState(true);

  const onchage = (event: ChangeEvent<HTMLInputElement>) => {
    setCheck(!check);
    getData(`${process.env.REACT_APP_SERVER_PORT}/cart`).then((result) => {
      dispatch.cart.fetchCartList(result);
    });
  };

  return (
    <ListItem role={undefined} dense button>
      <ListItemIcon>
        <Checkbox
          onChange={onchage}
          edge="start"
          tabIndex={-1}
          disableRipple
          className="checkbox"
          checked={check}
        />
      </ListItemIcon>
      <Image height="150px" width="200px" src={image_link} />

      <ListItemText primary={name} />

      <span className="price" id={id as unknown as string}>
        {priceCart}
      </span>
      <div>
        <button
          id="add"
          onClick={updateQuantity}
          style={{
            background: "grey",
            width: "30px",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          +
        </button>
        <span style={{ margin: " 0 5px" }} className="quantity">
          {quantity}
        </span>
        <span hidden className="productId">
          {product_id}
        </span>
        <button
          id="mod"
          onClick={updateQuantity}
          style={{
            background: "grey",
            width: "30px",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          -
        </button>
      </div>
      <ListItemSecondaryAction>
        <IconButton
          id={id as unknown as string}
          onClick={onDeleteCart}
          edge="end"
          aria-label="comments"
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
