import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  constructor(private _http: HttpClient) {}
  token = localStorage.getItem("token");
  buy(body: any) {
    return this._http.post("api/buy", body, {
      headers: { authToken: this.token }
    });
  }

  sell(body: any) {
    return this._http.post("api/sell", body, {
      headers: { authToken: this.token }
    });
  }

  getStocks() {
    return this._http.get("api/stocks", { headers: { authToken: this.token } });
  }

  getOrders() {
    return this._http.get("api/orders", { headers: { authToken: this.token } });
  }

  getTrades() {
    return this._http.get("api/trades", { headers: { authToken: this.token } });
  }
}
