import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarComponent } from './car.component';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    NgbModule,
  ],
  declarations: [
    CarComponent,
  ],
  exports: [
    CarComponent,
  ],
  bootstrap: [
    CarComponent,
  ]
})
export class CarModule { }
