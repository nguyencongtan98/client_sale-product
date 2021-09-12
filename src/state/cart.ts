import { createModel } from "@rematch/core";
import { RootModel } from "./models";
import { CartInfo } from "../types/task";

export const cart = createModel<RootModel>()({
  state: [] as CartInfo[],
  reducers: {
    fetchCartList(state, payload: CartInfo[]) {
      return payload;
    },
  },
  effects: (dispatch) => ({
    async setCartAsync(payload: CartInfo[]) {
      dispatch.cart.fetchCartList(payload);
    },
  }),
});
