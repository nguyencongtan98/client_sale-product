import { Models } from "@rematch/core";
import { count } from "./count";
import { task } from "./task";
import { taskDetail } from "./task-detail";
import { product } from "./product";
import { cart } from "./cart";
import { order } from "./order";

export interface RootModel extends Models<RootModel> {
  count: typeof count;
  task: typeof task;
  taskDetail: typeof taskDetail;
  product: typeof product;
  cart: typeof cart;
  order: typeof order;
}

export const models: RootModel = {
  count,
  task,
  taskDetail,
  product,
  cart,
  order,
};
