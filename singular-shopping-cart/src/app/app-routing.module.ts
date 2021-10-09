import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {RegisterComponent} from "./register/register.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {OrderComponent} from "./order/order.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";


const routes: Routes = [
  { path: '', redirectTo:'/welcome' , pathMatch: 'full'},
  { path: 'welcome', component: WelcomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'order', component: OrderComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
