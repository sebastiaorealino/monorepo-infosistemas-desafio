import { PageModule } from './../pages/page.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    PageModule
  ],
  providers: [
    CookieService
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
