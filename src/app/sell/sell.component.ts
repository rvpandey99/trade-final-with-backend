import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../order.service';



@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  sellForm:FormGroup;
  loading = false;
  data_loading = false;
  errorMessage:String;
  successMessage: String;
  master = [];

  isValid(controlName){
    return this.sellForm.get(controlName).invalid && this.sellForm.get(controlName).touched;
  }
  constructor(private _order:OrderService) { }

  ngOnInit() {
    this.data_loading = true;

    this.sellForm = new FormGroup({
      ticker: new FormControl('', [ Validators.required ]),
      aprice: new FormControl('', [ Validators.required]),
      qty: new FormControl('', [ Validators.required]),
      limit: new FormControl('', [ Validators.required]),
    });

    this._order.getStocks().subscribe(
      (data: any) => {
        this.master = Object.keys(data).map(i => data[i]);
        this.data_loading = false;
      },
      error => {
        // this.errorMessage = error.error || 'Something went wrong.';
        this.data_loading = false;
        console.log(error.error);
      }
    );
  }

  
  onSubmit() {
    this.loading = true;
    const body = {
      ticker: this.sellForm.value.ticker.ticker,
      aprice: this.sellForm.value.aprice,
      qty: this.sellForm.value.qty,
      limit: this.sellForm.value.limit
    }

    if(this.sellForm.valid){
      this._order.sell(body).subscribe(
        (data: any) => {
          this.successMessage = 'Your order is placed successfully. Order ID is ' + data.orderId;
          this.loading = false;
          console.log(data);
        },
        error => {
          this.errorMessage = error.error || 'Something went wrong.';
          this.loading = false;
        // console.log(error.error);
        }
      );
    }
  }

}