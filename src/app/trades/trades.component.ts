import { Component, OnInit } from "@angular/core";
import { OrderService } from "../order.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-trades",
  templateUrl: "./trades.component.html",
  styleUrls: ["./trades.component.css"]
})
export class TradesComponent implements OnInit {
  master = [];
  loading = false;
  title = "Online Trading System - Trade Details";
  constructor(private _order: OrderService, private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.loading = true;
    this._order.getTrades().subscribe(
      (data: any) => {
        this.master = Object.keys(data).map(i => data[i]);

        this.master.sort((a, b) => {
          let dateA: any = new Date(a.settleDate),
            dateB: any = new Date(b.settleDate);
          return dateB - dateA;
        });
        this.loading = false;
        // console.log(data);
      },
      error => {
        // this.errorMessage = error.error || 'Something went wrong.';
        this.loading = false;
        console.log(error.error);
      }
    );
  }
}
