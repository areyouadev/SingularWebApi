import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {HelpersService} from "./helpers.service";
import {IOrder} from "../models/order.model";

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.apiBaseUrl}/orders`

  constructor(private _httpClient: HttpClient) {
  }

  addNewOrder(order: IOrder): Observable<IOrder> {
    return  this._httpClient
      .post<IOrder>(this.apiUrl, order)
      .pipe(catchError(HelpersService.handleError))

  }
}
