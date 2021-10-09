import { NgModule } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

import {MatButtonModule} from "@angular/material/button";

import { MatRadioModule} from "@angular/material/radio";
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatBadgeModule} from "@angular/material/badge";
const materialComponents = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatRadioModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatBadgeModule
]
@NgModule({
  imports: materialComponents,
  exports: materialComponents
})
export class MaterialComponentsModule {}
