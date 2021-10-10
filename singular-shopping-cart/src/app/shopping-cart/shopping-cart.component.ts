import { Component, OnInit  } from '@angular/core';
import { Subscription } from 'rxjs';
import { IOrderDetail } from '../models/IOrderDetail.model';
import { IOrder } from '../models/order.model';
import { OrderService } from '../services/order.service';
import { SessionStorageService } from '../services/session-storage.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  carts : IOrder[] = [];
  orderDetailList : IOrderDetail[]= [];
  private subscriptions: Subscription[] = [];
  private orderDetail!: IOrderDetail;
  clientName: string = "";
  responseOk: boolean = false;
  iOrderObj!: IOrder;
 constructor ( private sessionStorageService : SessionStorageService,private orderService : OrderService){ 
 }
  ngOnInit(): void {

    this.sessionStorageService.select('cart').subscribe(cartValue => {  
        if (Boolean(cartValue)){
          const currentCart = JSON.parse(cartValue) as IOrder[];
          if (Boolean(currentCart)){
            this.carts = currentCart
          }
        }
      })

      for(var i=0; i < this.carts.length; i++)
      {
          this.subscriptions
          .push(
              this.orderService
                .getSingleOrder(this.carts[i])
                .subscribe(orderDetail =>{
                  this.clientName= orderDetail.client?.name+ " "+ orderDetail.client?.surname;
                 this.orderDetailList.push(orderDetail);
                })
          );
      }
  }

  deleteCartItem(orderDetail: IOrderDetail): void {
    if (  Boolean(orderDetail.id)) {
      this.subscriptions
        .push(
          this.orderService
            .deleteSingleOrder(orderDetail.id)
            .subscribe(res => {
              
              this.sessionStorageService.remove(orderDetail.id!);
              /* this.iOrderObj.id = orderDetail.id;
              this.iOrderObj.clientId = orderDetail.clientId;
              this.iOrderObj.cost = orderDetail.cost;
              this.iOrderObj.productId = orderDetail.productId;
              this.iOrderObj.quantity = orderDetail.quantity; */
            
              for (let cart of this.carts) {
                if (cart.id === orderDetail.id) {
                    this.carts.splice(this.carts.indexOf(cart), 1);
                    break;
                }
            }  

              this.responseOk = true;   
              console.log("Deleted for id "+ orderDetail.id)  
              console.log("Cart ength now " + this.carts.length);

              window.location.reload();
            })
        )
    }
  }
}

