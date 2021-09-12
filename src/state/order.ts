import { createModel } from "@rematch/core";
import { RootModel } from "./models";
import { OrderCheckout } from "../types/task";

export const order = createModel<RootModel>()({
  state: {} as OrderCheckout,
  reducers: {
    setOrderCheckout(state, payload: OrderCheckout) {
      return payload;
    },
  },
  effects: (dispatch) => ({
    async setOrderCheckoutAsync(payload: OrderCheckout) {
      dispatch.or.setOrderCheckoutF(payload);
    },
  }),
});
