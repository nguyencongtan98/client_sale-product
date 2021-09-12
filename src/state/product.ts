import { createModel } from "@rematch/core";
import { RootModel } from "./models";
import { ProductInfo } from "../types/task";

export const product = createModel<RootModel>()({
  state: [] as ProductInfo[],
  reducers: {
    fetchProductList(state, payload: ProductInfo[]) {
      return payload;
    },
  },
  effects: (dispatch) => ({
    async setProductAsync(payload: ProductInfo[]) {
      dispatch.product.fetchProductList(payload);
    },
  }),
});
