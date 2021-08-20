import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../auth/auth.model';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: Login = {} as Login;

  constructor(
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  authenticate(): void {
    this.service.authenticate(this.login)
      .subscribe(() => {
        this.toastr.success('Login efetuado com sucesso', 'Login');
        this.router.navigate(['']);
      }, (err) => {
        this.toastr.error('Login Invalido', 'Login');
      });
  }
}
