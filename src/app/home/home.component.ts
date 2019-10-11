import { Component, OnInit } from "@angular/core";
import { OrderService } from "../order.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  master = [];
  loading = false;
  user = localStorage.getItem("userName") || "";
  constructor(private _order: OrderService) {}

  ngOnInit() {
    this.loading = true;
    this._order.getStocks().subscribe(
      data => {
        this.master = Object.keys(data).map(i => data[i]);
        this.loading = false;
      },
      error => {
        // this.errorMessage = error.error || 'Something went wrong.';
        this.loading = false;
        console.log(error.error);
      }
    );
  }
}
