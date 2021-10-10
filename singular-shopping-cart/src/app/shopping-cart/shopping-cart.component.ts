import { Component, OnInit  } from '@angular/core';
import { IOrder } from '../models/order.model';
import { SessionStorageService } from '../services/session-storage.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  carts : IOrder[] = [];
 constructor ( private sessionStorageService : SessionStorageService ){ 
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
  }
}

