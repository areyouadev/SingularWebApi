import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {IProduct} from "../models/product.model.";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {HelpersService} from "./helpers.service";
import {IClient} from "../models/client.model";

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = `${environment.apiBaseUrl}/clients`

  constructor(private _httpClient: HttpClient) {
  }

  addNewClient(client: IClient): Observable<IClient> {
    return  this._httpClient
      .post<IClient>(this.apiUrl, client)
      .pipe(catchError(HelpersService.handleError))

  }
}
