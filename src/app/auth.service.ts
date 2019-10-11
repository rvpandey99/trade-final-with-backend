import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public jwtHelper = new JwtHelperService();
  constructor(private _http: HttpClient) { }
  api = environment.api;
  register(body:any) {
    return this._http.post(this.api + '/register',body,{observe:'body'});
  }

  login(body:any) {
    return this._http.post(this.api + '/login',body,{observe:'body'});
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}