import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from '../auth/auth.guard';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { CarComponent } from './car/car.component';
import { CarModule } from './car/car.module';
import { LoginComponent } from './login/login.component';
import { PageComponent } from './page.component';
import { SignupComponent } from './signup/signup.component';
import { SignupModule } from './signup/signup.module';

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'cars',
        component: CarComponent
      },
      { path: '', redirectTo: 'cars', pathMatch: 'full' }
    ]
  },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    NavbarComponent,
    PageComponent,
  ],
  imports: [
    FormsModule,
    SignupModule,
    CommonModule,
    CarModule,
    RouterModule.forRoot(routes),
    NgbModule,
  ],
  providers: [
    AuthGuard,
  ]
})

export class PageModule { }
