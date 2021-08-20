import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SignupComponent } from './signup.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    SignupComponent
  ],
  exports: [
    SignupComponent,
  ],
  bootstrap: [
    SignupComponent,
  ]
})
export class SignupModule { }
