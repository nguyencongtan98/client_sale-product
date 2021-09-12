import { number } from "yup/lib/locale";

export type TaskInfo = {
  id: string;
  name: string;
  status: string;
  description: string;
  createDate: string;
  dueDate: string;
  closingDate?: string;
};

export type Status = {
  value: "done" | "open" | "doing" | "closed";
  label: "Done" | "Open" | "Doing" | "Closed";
};

export type ProductInfo = {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  image_link: string;
  createDate: string;
  catalog_id: number;
};

export type CartInfo = {
  id: number;
  userId: number;
  product_id: number;
  quantity: number;
};

export type CartDisplay = {
  cartInfo: CartInfo;
  product: ProductInfo;
};

export type OrderDetailInfo = {
  id: number;
  product_id: number;
  order_id: string;
  quantity: number;
};

export type OrderInfo = {
  id: string;
  total_price: number;
  date_payment: string;
  user_id: number;
};

export type OrderCheckout = {
  order: OrderInfo;
  orderDetail: OrderDetailInfo[];
};
