
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { SessionData } from './auth.model';

@Injectable()
export class AuthGuard implements CanActivate {


  private TOKEN = 'token';
  private jwtHelper;
  constructor(
    private router: Router,
    private cookieService: CookieService,
  ) {
    this.jwtHelper = new JwtHelperService();
  }

  setSessionData(sessionData: SessionData): void {
    this.setToken(sessionData.token);
  }


  /**
   * This method is responsible to check if user is active
   * @param route activate route
   * @param state route state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  /**
   * This method is responsible to check if token is valid
   * @param url url to redirect
   */
  checkLogin(url: string): boolean {
    if (this.validateToken()) {
      return true;
    }
    this.logout(url);
    return false;
  }

  /**
   * This method is responsible to validate token
   */
  validateToken(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  /**
   * This method is responsible to get token
   */
  public getToken(): string {
    if (!this.cookieService.check(this.TOKEN)) {
      return '';
    }
    return JSON.parse(this.cookieService.get(this.TOKEN));
  }

  /**
   * This method is responsible to set token
   * @param token token to validate
   */
  public setToken(token: string): void {
    return this.cookieService.set(this.TOKEN, JSON.stringify(token));
  }

  /**
   * This method is responsible to remove token from user
   */
  public removeToken(): void {
    localStorage.removeItem(this.TOKEN);
  }

  /**
   * This method is responsible to get values of token
   */
  getTokenData(): string {
    const token: string = this.getToken();
    const data = this.jwtHelper.decodeToken(token);
    return data;
  }

  /**
   * Method to save tokens on storage
   * @param {*} data data with user data to save on storage
   */
  private saveSessionData(data: any): void {
    this.setToken(data.token);
  }

  /**
   * Clear token the storage
   */
  private clearStorage(): void {
    this.cookieService.deleteAll();
  }

  /**
   * Method to logout user
   */
  public logout(url?: string): void {
    this.clearStorage();
    this.router.navigate(['/login'], { queryParams: { returnUrl: url } });
  }
}
