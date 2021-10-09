import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {IProduct} from "../models/product.model.";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {HelpersService} from "./helpers.service";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiBaseUrl}/Products`

  constructor(private _httpClient: HttpClient) {
  }

  getAllProducts(): Observable<IProduct[]> {
    return  this._httpClient
      .get<IProduct[]>(this.apiUrl)
      .pipe(catchError(HelpersService.handleError))

  }
}
