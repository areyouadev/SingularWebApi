import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionStorageService} from "../../services/session-storage.service";
import {Subscription} from "rxjs";
import {filter} from "rxjs/operators";
import {IOrder} from "../../models/order.model";

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit, OnDestroy{


  cartBadgeValue = '';

  private subscriptions: Subscription[] = [];

  constructor(private sessionStorageService: SessionStorageService) {

  }

  ngOnInit(): void {
    this.subscriptions
      .push(
        this.sessionStorageService.select('cart')
          .pipe(
            filter(value => Boolean(value))
          ).subscribe( cartValue =>{
              const cart = JSON.parse(cartValue) as IOrder[]
              this.cartBadgeValue = `${cart.length}`
          })
      )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
