import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private _http: HttpClient) { }
  token = localStorage.getItem('token');
  api = environment.api;
  buy(body:any) {
    return this._http.post(this.api + '/buy',body,{headers:{"authToken":this.token}});
  }

  sell(body:any) {
    return this._http.post(this.api + '/sell',body,{headers:{"authToken":this.token}});
  }

  getStocks() {
    return this._http.get(this.api + '/stocks',{headers:{"authToken":this.token}});
  }

  getOrders() {
    return this._http.get(this.api + '/orders',{headers:{"authToken":this.token}});
  }

  getTrades() {
    return this._http.get(this.api + '/trades',{headers:{"authToken":this.token}});
  }
}
