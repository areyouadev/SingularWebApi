import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {IProduct} from "../models/product.model.";
import {of, Subscription} from "rxjs";
import {SessionStorageService} from "../services/session-storage.service";
import {OrderService} from "../services/order.service";
import {IOrder} from "../models/order.model";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements  OnInit, OnDestroy {

  products: IProduct[] = [];
  private subscriptions: Subscription[] = [];
  private clientId = '';
  private cart: IOrder[] = [];

  constructor(
    private productService: ProductService,
    private sessionStorageService: SessionStorageService,
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {

    this.subscriptions
      .push(
          this.productService
            .getAllProducts()
            .subscribe(products =>{
              this.products = [];
              this.products = products
            })
      );

    this.subscriptions
      .push(
        this.sessionStorageService.select('clientId')
          .subscribe( clientId => {
              if (Boolean(clientId)) {
                this.clientId = clientId;
              }
          })
      );

    this.subscriptions
      .push(
        this.sessionStorageService
          .select('cart')
          .subscribe(cartValue => {
            if (Boolean(cartValue)){
              const currentCart = JSON.parse(cartValue) as IOrder[];
              if (Boolean(currentCart)){
                this.cart = currentCart
              }
            }
          })
      )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  isValidClientIdAvailable(): boolean {
    return this.clientId != null && this.clientId !== '';
  }

  createOrderItem(productId: string): void {
    if (this.isValidClientIdAvailable() && Boolean(productId) && !this.checkIfProductIsInCart(productId)) {
      this.subscriptions
        .push(
          this.orderService
            .addNewOrder({
              productId: productId,
              clientId: this.clientId,
              quantity: 1
            } as IOrder)
            .subscribe(order => {
                this.cart.push(order);
                this.saveCartIntoSessionStorage(order);
            })
        )
    }
  }

  private checkIfProductIsInCart(productId: string): boolean {
     return this.cart.findIndex(order => order.productId === productId) > -1
  }
  private saveCartIntoSessionStorage(order: IOrder): void {

    let serializedCart = '';
    serializedCart = JSON.stringify(this.cart);
    this.sessionStorageService.set('cart', serializedCart);

  }
}
