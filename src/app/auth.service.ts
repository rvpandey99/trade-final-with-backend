import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({ providedIn: "root" })
export class AuthService {
  public jwtHelper = new JwtHelperService();
  constructor(private _http: HttpClient) {}
  // ,
  // @Inject("BASE_URL") private baseUrl: string
  // api = environment.api;
  register(body: any) {
    return this._http.post("api/register", body, {
      observe: "body"
    });
  }

  login(body: any) {
    // console.log(this.base_Url);
    return this._http.post("api/login", body, {
      observe: "body"
    });
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }
}
