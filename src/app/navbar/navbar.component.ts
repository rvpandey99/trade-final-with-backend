import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  user = localStorage.getItem("userName") || ""; //|| 'User'
  // userToken = localStorage.getItem('userToken');

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _activeroute: ActivatedRoute
  ) {}

  ngOnInit() {}
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    this._router.navigate(["login"]);
  }
}
