import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  master = [];
  loading = false;
  constructor(private _order:OrderService) { }

  ngOnInit() {
    this.loading = true;
    this._order.getOrders().subscribe(
      (data: any) => {
        this.master = Object.keys(data).map(i => data[i]);
        
        this.master.sort((a,b)=>{
          let dateA: any = new Date(a.orderDate), dateB: any = new Date(b.orderDate);
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