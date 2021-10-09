import {Component, OnDestroy} from '@angular/core';
import {NgForm, ValidatorFn} from '@angular/forms';
import {ClientService} from "../services/client.service";
import {Subscription} from "rxjs";
import {IClient} from "../models/client.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SessionStorageService} from "../services/session-storage.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements  OnDestroy {

  addressTypes: string[] = ['Residential', 'Business']
  isShowingSpinner = false;

  private subscriptions: Subscription[] = []

  constructor(
    private clientService: ClientService,
    private snackBar: MatSnackBar,
    private sessionStorageService: SessionStorageService) {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  postalCodeValidator: ValidatorFn = (c) => {
    const postalCodeValue = c.value as string;
    if(isNaN( Number(postalCodeValue))) {
       return { ['isPostalCodeInvalid']: true }
    }
    return null;
  };

  onSubmit(f: NgForm) {

    this.isShowingSpinner = true;
    const client = f.form.value as IClient;

    this.subscriptions
      .push(
          this.clientService
            .addNewClient(client)
            .subscribe(client => {
              this.isShowingSpinner = false;
              // @ts-ignore
              this.sessionStorageService.set('clientId', client.id) ;
              this.showSnackBar(true)
            },
            error => {
               this.isShowingSpinner = false;
              // @ts-ignore
              this.sessionStorageService.set('clientId', '') ;
              this.showSnackBar(false)
            })
      )
  }

  private showSnackBar(isSuccess: boolean) {
    if (isSuccess) {
      this.snackBar.open('Registration successful!', 'SUCCESS', {
        duration:3000,
        horizontalPosition:'center',
      })
    } else {
      this.snackBar.open('Oops. Something went wrong!', 'ERROR', {
        duration:3000,
        horizontalPosition:'center',
      })
    }

  }

}
