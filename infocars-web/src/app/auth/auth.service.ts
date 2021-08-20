import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { AUTHENTICATE_URL, USER_URL } from '../config/settings';
import { AuthGuard } from './auth.guard';
import { Credential, Login, Session, SessionData, Test } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private authGuard: AuthGuard,
  ) { }

  authenticate(login: Login): Observable<SessionData> {
    this.spinner.show();
    return this.http.post<Session>(AUTHENTICATE_URL, login)
      .pipe(
        map((session: Session) => session.data),
        tap((sessionData: SessionData) => {
          this.authGuard.setSessionData(sessionData);
        }),
        finalize(() => this.spinner.hide())
      );
  }

  createUser(credential: Credential): Observable<Session> {
    this.spinner.show();
    return this.http.post<Session>(USER_URL, credential)
      .pipe(finalize(() => this.spinner.hide()));
  }
}
