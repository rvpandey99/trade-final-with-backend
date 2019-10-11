import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { BuyComponent } from './buy/buy.component';
import { SellComponent } from './sell/sell.component';
import { OrderComponent } from './order/order.component';
import { TradesComponent } from './trades/trades.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch: 'full'},
  { 
    path:'home',
    component: HomeComponent,
    data: {
      title: 'Online Trading'
    },
    canActivate: [AuthGuard]
  },
  {path:'login', component: LoginComponent},
  {path:'registration', component: RegistrationComponent},
  {path:'buy', component: BuyComponent,
    data: {
      title: 'Buy | Online Trading'
    },
    canActivate: [AuthGuard]},
  {path:'sell', component: SellComponent,
    data: {
      title: 'Sell | Online Trading'
    },
    canActivate: [AuthGuard]},
  {path:'order', component: OrderComponent,
    data: {
      title: 'Orders | Online Trading'
    },
    canActivate: [AuthGuard]},
  {path:'trades', component: TradesComponent,
    data: {
      title: 'Trades | Online Trading'
    },
    canActivate: [AuthGuard]},
  {path:'**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
