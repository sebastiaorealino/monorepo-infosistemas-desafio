import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Credential } from 'src/app/auth/auth.model'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  credential: Credential = {} as Credential;

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  createUser() {
    this.auth.createUser(this.credential)
      .subscribe((user) => {
        this.toastr.success('Usuário foi criado com sucesso');
        this.router.navigate(['login']);
      }, (err) => {
        if (err.status && err.error.error_code) {
          this.toastr.error('Este e-mail já está em uso. Tente outro e-mail.', 'Erro');
        } else {

          this.toastr.error('Algum erro ocorreu ao criar um usuário', 'Erro');
        }
      })
  }

}
