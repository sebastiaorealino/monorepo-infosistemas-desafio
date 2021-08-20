import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/auth/auth.guard';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthGuard) { }

  ngOnInit(): void {
  }

  doLogout(): void {
    this.auth.logout();
  }

}
