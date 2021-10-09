import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialComponentsModule } from "./material-components.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainHeaderComponent } from "./navigation/header/main-header.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {OrderComponent} from "./order/order.component";
import {RegisterComponent} from "./register/register.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import { FormsModule } from "@angular/forms";
import {CustomValidatorDirective} from "./validators/custom-validator.directive";
import { HttpClientModule } from '@angular/common/http';
import {WindowRef} from "./services/window-ref.service";
const components = [
  AppComponent,
  MainHeaderComponent,
  OrderComponent,
  RegisterComponent,
  ShoppingCartComponent,
  WelcomeComponent,
  PageNotFoundComponent,
  CustomValidatorDirective

]
// @ts-ignore
@NgModule({
  declarations: components,
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [WindowRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
