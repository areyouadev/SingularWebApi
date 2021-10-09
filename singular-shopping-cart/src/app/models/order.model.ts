export interface IOrder {
  id?: string;
  clientId: string;
  productId: string;
  quantity: number;
  cost?: number;
}
