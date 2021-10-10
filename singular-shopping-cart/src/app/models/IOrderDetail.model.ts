import { IClient } from "./client.model";
import { IProduct } from "./product.model.";

export interface IOrderDetail {
  id?: string;
  clientId: string;
  productId: string;
  quantity: number;
  cost?: number;
  client?: IClient;
  product?: IProduct;
}
